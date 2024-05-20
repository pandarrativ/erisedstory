from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .service.story_service import StoryPlayService
from .service.storydata_service import StoryDataService
from .service.sage import SageAgentService
from .dao import StoryPlayDAO

import os
from common_utils.authentication import JWTAuthentication




# Create your views here.
class StoryPlayApiView(APIView):
    if os.getenv('DJANGO_ENV') == "production":
        authentication_classes = [JWTAuthentication]
    else:
        authentication_classes = []

    def get(self, request):
        try:
            resp = StoryPlayService.get_all_stories()
            return Response(resp, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    def post(self, request):
        try:
            resp = StoryPlayService.solve_story_task(req=request.data)
            return Response(resp, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ConversationGPTApiView(APIView):
    if os.getenv('DJANGO_ENV') == "production":
        authentication_classes = [JWTAuthentication]
    else:
        authentication_classes = []

    def post(self, request):
        try:
            # need to first check if storyplay id in database. (might move this part to redis in future version)
            if StoryPlayDAO.find_storyplay_by_id(_id=request.data["storyplay_id"]) == None:
                return Response("Story play id invalid.", status=status.HTTP_404_NOT_FOUND)
            else:
                resp = StoryPlayService.solve_single_conversation(request.data)
                return Response(resp, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
 

class NewStoryDataApiView(APIView):
    if os.getenv('DJANGO_ENV') == "production":
        authentication_classes = [JWTAuthentication]
    else:
        authentication_classes = []

    # create one
    def post(self, request):
        try:
            resp = StoryDataService.new_storyplay(uid=request.data["uid"], story_name=request.data["story_name"])
            return Response(resp, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class FindAllStoryDataByUID(APIView):
    if os.getenv('DJANGO_ENV') == "production":
        authentication_classes = [JWTAuthentication]
    else:
        authentication_classes = []

    def post(self, request):
        try:
            return Response({"data":StoryDataService.get_all_storyplay_data_by_uid(request.data["uid"])}, status=status.HTTP_200_OK)
        except Exception as e:
            # return Response(e, status=status.HTTP_404_NOT_FOUND)
            return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class SageAgentView(APIView):
    if os.getenv('DJANGO_ENV') == "production":
        authentication_classes = [JWTAuthentication]
    else:
        authentication_classes = []

    def post(self, request):
        try:
            # need to first check if storyplay id in database. (might move this part to redis in future version)
            if StoryPlayDAO.find_storyplay_by_id(_id=request.data["storyplay_id"]) == None:
                return Response("Story play id invalid.", status=status.HTTP_404_NOT_FOUND)
            else:
                resp = SageAgentService.sage_chat_and_toast(request.data)
                return Response(resp, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
