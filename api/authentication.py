from django.contrib.auth.models import User
from rest_framework import authentication
from rest_framework import exceptions
from rest_framework.authtoken.models import Token

class TokenAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        try:
            #token_str = request.META.get('HTTP_AUTHORIZATION')
            token_str = request.COOKIES.get('token')

            if not token_str: 
                return None
            token = Token.objects.get(key=token_str)
            user = token.user # get the user
        except:
            raise exceptions.AuthenticationFailed('No such user')

        return (user, None)