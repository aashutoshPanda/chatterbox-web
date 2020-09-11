from django.contrib.auth.models import BaseUserManager
from django.contrib.auth import get_user_model, password_validation, authenticate
from rest_framework.authtoken.models import Token
from rest_framework import serializers

User = get_user_model()


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=300, required=True)
    password = serializers.CharField(required=True, write_only=True)


class AuthUserSerializer(serializers.ModelSerializer):
    auth_token = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name',
                  'last_name', 'is_active', 'is_staff', 'auth_token')
        read_only_fields = (
            'id', 'is_active', 'is_staff')

    def get_auth_token(self, obj):
        token, created = Token.objects.get_or_create(user=obj)
        return token.key


class EmptySerializer(serializers.Serializer):
    pass


class UserRegisterSerializer(serializers.ModelSerializer):
    """
    A user serializer for registering the user
    """

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'first_name', 'last_name')

    # def validate_username(self, value):
    #     user = User.objects.filter(username=value)
    #     if user:
    #         raise serializers.ValidationError("Usename is already taken")
    #     return BaseUserManager.normalize_username(value)

    def validate_password(self, value):
        password_validation.validate_password(value)
        return value
