import cloudinary.uploader
from rest_framework.parsers import MultiPartParser, JSONParser
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from django.contrib.auth import get_user_model, logout
from django.core.exceptions import ImproperlyConfigured
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from rest_framework.views import APIView
from rest_framework.generics import ListAPIView

from .utils import get_and_authenticate_user, create_user_account
from . import serializers
from .serializers import ProfileSerializer, UserSerializer, RelationshipSerializer
from . models import Profile, Relationship
User = get_user_model()


class AuthViewSet(viewsets.GenericViewSet):
    permission_classes = [AllowAny, ]
    serializer_class = serializers.EmptySerializer
    serializer_classes = {
        'login': serializers.UserLoginSerializer,
        'register': serializers.UserRegisterSerializer
    }

    @action(methods=['POST', ], detail=False)
    def login(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = get_and_authenticate_user(**serializer.validated_data)
        data = serializers.AuthUserSerializer(user).data
        return Response(data=data, status=status.HTTP_200_OK)

    @action(methods=['POST', ], detail=False)
    def register(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = create_user_account(**serializer.validated_data)
        data = serializers.AuthUserSerializer(user).data
        return Response(data=data, status=status.HTTP_201_CREATED)

    @action(methods=['POST', ], detail=False)
    def logout(self, request):
        logout(request)
        data = {'success': 'Sucessfully logged out'}
        return Response(data=data, status=status.HTTP_200_OK)

    def get_serializer_class(self):
        if not isinstance(self.serializer_classes, dict):
            raise ImproperlyConfigured(
                "serializer_classes should be a dict mapping.")

        if self.action in self.serializer_classes.keys():
            return self.serializer_classes[self.action]
        return super().get_serializer_class()


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
@authentication_classes((TokenAuthentication,))
def current_user_from_token_view(request):
    profile = Profile.objects.get(user=request.user)
    serializer = ProfileSerializer(profile)
    return Response(data=serializer.data, status=status.HTTP_200_OK)


class RequestView(APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def get(self, request, format=None):
        try:
            profile = Profile.objects.get(user=request.user)
            data = {
                'send': [RelationshipSerializer(req).data for req in profile.requests_sent()],
                'received': [RelationshipSerializer(req).data for req in profile.requests_received()],
            }
            return Response(data=data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request, format=None):
        try:
            receiver = Profile.objects.get(
                user__username=request.data['receiver'])
            sender = Profile.objects.get(user=request.user)
            request = Relationship.objects.create(
                sender=sender, receiver=receiver)
            data = RelationshipSerializer(request).data
            return Response(data=data, status=status.HTTP_201_CREATED)
        except Exception as e:

            return Response(data=str(e), status=status.HTTP_400_BAD_REQUEST)


class RequestDetailView(APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def get(self, request, pk, format=None):
        try:
            relationship = get_object_or_404(Relationship, pk=pk)
            serializer = RelationshipSerializer(relationship)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        except:
            return Response(data={"message": "NOT FOUND"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk, format=None):
        try:
            request_obj = get_object_or_404(Relationship, pk=pk)
            request_obj.delete()
            profile = Profile.objects.get(user=request.user)
            data = {
                'send': [RelationshipSerializer(req).data for req in profile.requests_sent()],
                'received': [RelationshipSerializer(req).data for req in profile.requests_received()],
            }
            return Response(data=data, status=status.HTTP_200_OK)
        except:
            return Response(data={"message": "NOT FOUND"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
@authentication_classes((TokenAuthentication,))
def requestAcceptView(request, pk):
    try:
        request_obj = get_object_or_404(Relationship, pk=pk)
        print("sender", request_obj.sender.user)
        print("accepter", request.user)
        if (request_obj.status == 'accepted'):
            return Response(data={"message": "Request already Accepted"}, status=status.HTTP_200_OK)
        elif (request_obj.receiver.user != request.user):
            return Response(data={"message": "No right to accept"}, status=status.HTTP_403_FORBIDDEN)

        request_obj.status = 'accepted'
        request_obj.save()
        profile = Profile.objects.get(user=request.user)
        data = {
            'send': [RelationshipSerializer(req).data for req in profile.requests_sent()],
            'received': [RelationshipSerializer(req).data for req in profile.requests_received()],
        }
        return Response(data=data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(data=str(e), status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
@authentication_classes((TokenAuthentication,))
def friend_list(request):
    try:
        print(request.user)
        profile = Profile.objects.get(user=request.user)
        print(profile.friends.all())
        friend_list_objects = profile.friends.all()
        data = UserSerializer(friend_list_objects, many=True).data
        print(data)
        return Response(data=data, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
@authentication_classes((TokenAuthentication,))
def list_of_users_to_send_friend_request(request):
    try:
        user_profile = Profile.objects.get(user=request.user)
        already_request_sent_profile_list = Relationship.objects.get_pending_requests_profiles(
            user_profile)
        # return all profile objects except (self & the ones to whom you have sent request)
        profiles_except_self = Profile.objects.exclude(user=request.user)
        # difference is like set1 minus the intersction between set1 & set2
        list_of_users_to_send_friend_request = profiles_except_self.difference(
            already_request_sent_profile_list)

        data = ProfileSerializer(
            list_of_users_to_send_friend_request, many=True).data
        return Response(data=data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(data=str(e), status=status.HTTP_404_NOT_FOUND)


class UserList(APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def get(self, request):
        users = Profile.objects.exclude(user=request.user)
        data = ProfileSerializer(users, many=True).data
        return Response(data)


class UploadView(APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]
    parser_classes = (
        MultiPartParser,
        JSONParser,
    )

    def post(self, request, format=None):
        try:
            file = request.data.get('picture')
            user_profile = Profile.objects.get(user=request.user)
            cloudinary_response = cloudinary.uploader.upload(file)
            user_profile.profile_image_url = cloudinary_response["secure_url"]
            user_profile.save()
            data = ProfileSerializer(user_profile).data
            return Response(data=data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(data=str(e), status=status.HTTP_400_BAD_REQUEST)


class AddBioView(APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request, format=None):
        try:
            user_profile = Profile.objects.get(user=request.user)
            bio = request.data["bio"]
            user_profile.bio = bio
            user_profile.save()
            data = ProfileSerializer(user_profile).data
            return Response(data=data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(data=str(e), status=status.HTTP_400_BAD_REQUEST)
