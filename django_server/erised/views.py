from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


import os
from common_utils.authentication import JWTAuthentication

# Create your views here.

class StoryPlayApiView(APIView):

    def post(self, request):
        try:
            resp = StoryPlayService.solve_story_task(req=request.data)
            return Response(resp, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)