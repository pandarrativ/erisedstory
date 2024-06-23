from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


from .services.storyplay_service import  get_paths, get_suggestion
from .services.personality_sage_service import sage_chatting

import os
from common_utils.authentication import JWTAuthentication

# Create your views here.

class StoryPlayApiView(APIView):

    def post(self, request):
        try:
            task = request.data["TASK"]
            if task == "PATH":
                resp = get_paths(request.data)
            elif task == "SUGGESTION":
                resp = get_suggestion(request.data)

            return Response(resp, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class SageConversationApiView(APIView):
    def post(self, request):
        try:
            resp = sage_chatting(request.data["messages"])
            return Response(resp, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
