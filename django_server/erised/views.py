from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .services.ai_mentor_persona import create_persona
# from ai_models.openai_api import send_messages
from ai_models.openai_api import OpenAIAPI

from .services.personality_sage_service import *
from .services.storyplay_service import *


from .services.storyplay_service import  create_story, create_branch_options, continue_option
from .services.personality_sage_service import sage_narrative_development_suggestion, sage_reframe_reflection_feedback

import os
from common_utils.authentication import JWTAuthentication

# Create your views here.

class StoryPlayApiView(APIView):

    def post(self, request):
        try:
            task = request.data["TASK"]
            print(task)
            if task == "NEW_STORY":
                story = create_story(
                    learning_goal=request.data["learning_goal"],
                    send_prompt=OpenAIAPI.send_messages
                )
                personality_description, life_story = create_persona(
                    selected_trait=request.data["personality_trait"],
                    send_prompt=OpenAIAPI.send_messages
                )
                resp = {"story":story, "personality_description":personality_description, "life_story":life_story}

            if task == "OPTIONS":
                resp = create_branch_options(
                    learning_goal=request.data["learning_goal"], 
                    story=request.data["story"], 
                    send_prompt=OpenAIAPI.send_messages
                )
            elif task == "NARRATIVE":
                print(request.data["story"])
                print(request.data["branch_option"])
                print(request.data["user_story"])
                print(request.data["learning_goal"])
                resp = continue_option(
                    story=request.data["story"],  
                    branch_option=request.data["branch_option"],  
                    user_story=request.data["user_story"],  
                    learning_goal=request.data["learning_goal"],  
                    send_prompt=OpenAIAPI.send_messages
                )

            return Response(resp, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

        
class SageTaskApiView(APIView):
    def post(self, request):
        try:
            task = request.data["TASK"]
            print(task)
            if task == "SUGGESTION":
                print(request.data)
                print(request.data["life_story"])
                print(request.data["personality_description"])
                print(request.data["personality_trait"])
                print(request.data["learning_goal"])
                print(request.data["story"])
                print(request.data["option1"])
                print(request.data["option2"])
                print(request.data["option3"])
                resp = sage_narrative_development_suggestion(
                    life_story = request.data["life_story"], 
                    personality_description = request.data["personality_description"], 
                    personality_trait = request.data["personality_trait"],  
                    learning_goal = request.data["learning_goal"],  
                    story = request.data["story"],  
                    option1 = request.data["option1"],  
                    option2 = request.data["option2"],  
                    option3 = request.data["option3"],  
                    # selected_option = request.data["selected_option"], 
                )
            elif task == "FEEDBACK":
                print( request.data["life_story"])
                print( request.data["personality_description"])
                print( request.data["personality_trait"])
                print( request.data["learning_goal"])
                print( request.data["story"])
                print( request.data["user_writing"])
                resp = sage_reframe_reflection_feedback(
                    life_story = request.data["life_story"], 
                    personality_description = request.data["personality_description"],  
                    personality_trait = request.data["personality_trait"],  
                    learning_goal = request.data["learning_goal"],  
                    story = request.data["story"],  
                    user_writing = request.data["user_writing"],  
                    # AI_reframed = request.data["AI_reframed"], 
                )
            return Response(resp, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
