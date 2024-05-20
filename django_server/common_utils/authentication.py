import jwt
import os
from django.contrib.auth.models import AnonymousUser
from rest_framework import authentication
from rest_framework import exceptions

class JWTAuthentication(authentication.BaseAuthentication):

    def authenticate(self, request):
        token = request.COOKIES.get('token')  # Get token from cookie

        if not token:
            raise exceptions.AuthenticationFailed('No authentication token provided')

        try:
            # Decode the token
            jwt.decode(token, os.getenv('SECRET_KEY'), algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('Token has expired')
        except jwt.DecodeError:
            raise exceptions.AuthenticationFailed('Error decoding token')
        except Exception as e:
            print(e)
        


        # No user retrieval; assume anonymous user if token is valid
        return (AnonymousUser(), None)
