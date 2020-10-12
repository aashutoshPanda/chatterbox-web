import stream
from django.contrib.auth.models import BaseUserManager
from django.contrib.auth import get_user_model, password_validation, authenticate
from rest_framework.authtoken.models import Token
from rest_framework import serializers
from django.conf import settings
from .models import Profile, Relationship
User = get_user_model()
client = stream.connect(
    settings.STREAM_API_KEY, settings.STREAM_API_SECRET, location='us-east')


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=300, required=True)
    password = serializers.CharField(required=True, write_only=True)


class AuthUserSerializer(serializers.ModelSerializer):
    auth_token = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name',
                  'last_name', 'auth_token')
        read_only_fields = (
            'id', 'is_active', 'is_staff')

    def get_auth_token(self, obj):
        token, _ = Token.objects.get_or_create(user=obj)
        # return str(token)
        user_token_get_stream = client.create_user_token(obj.username)
        Token.objects.filter(user=obj).update(key=user_token_get_stream)
        return user_token_get_stream


class EmptySerializer(serializers.Serializer):
    pass


class UserRegisterSerializer(serializers.ModelSerializer):
    """
    A user serializer for registering the user
    """

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'first_name', 'last_name')


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    first_name = serializers.CharField(
        source="user.first_name", read_only=True)
    last_name = serializers.CharField(source="user.last_name", read_only=True)

    class Meta:
        model = Profile
        fields = ['bio', 'username', 'first_name',
                  'last_name', 'id', 'profile_image_url']


class UserSerializer(serializers.ModelSerializer):

    bio = serializers.CharField(source="profile.bio")
    profile_image_url = serializers.CharField(
        source="profile.profile_image_url")

    class Meta:
        model = User
        fields = ['id', 'bio', 'username', 'first_name',
                  'last_name', 'profile_image_url']


class RelationshipSerializer(serializers.ModelSerializer):
    sender = ProfileSerializer(read_only=True)
    receiver = ProfileSerializer(read_only=True)

    class Meta:
        model = Relationship
        fields = ['id', 'status', 'updated', 'created', 'sender', 'receiver']
