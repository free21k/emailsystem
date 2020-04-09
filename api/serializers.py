from rest_framework import serializers
from django.contrib.auth import authenticate

from django.contrib.auth.models import User
from .models import EmailAddress, Email
from time import strftime


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "is_superuser")


class LoginUserSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = (
            "username", 
            "password"
        )
        
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(username=data['username'], password=data['password'])
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")


def datetime_to_string(date_time_obj):
    return date_time_obj.strftime("%Y-%m-%d %H:%M:%S") if date_time_obj is not None else ""


class EmailSerializer(serializers.ModelSerializer):
    write_date = serializers.SerializerMethodField()
    complete_date = serializers.SerializerMethodField()
    class Meta:
        model = Email
        fields = '__all__'

    def get_write_date(self, obj):
        return datetime_to_string(obj.write_date)
    def get_complete_date(self, obj):
        return datetime_to_string(obj.complete_date)


class EmailAddressSerializer(serializers.Serializer):
    email_address = serializers.SerializerMethodField()
    is_deny = serializers.SerializerMethodField()
    class Meta:
        model = EmailAddress
        fields = '__all__'
    def get_email_address(self, obj):
        return obj.email_address
    def get_is_deny(self, obj):
        return '사용' if obj.is_deny is not True else '거절'

    def validate(self, data):
        address = EmailAddress(email_address=data['email_address'])
        if address:
            return address
        raise serializers.ValidationError("Unable to create email address.")


