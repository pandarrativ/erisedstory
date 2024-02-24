from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import redirect
from .service.gpt import GptAPI
from .service.dalle import DalleAPI
from .dao import ScriptPlayDAO, WidgetDAO, SurveyDAO
import openai



# start a new story play 
class NewScriptPlayApiView(APIView):
    def post(self, request, format=None):
        try:
            res = ScriptPlayDAO.create_new_script_play(request.data["user_id"] ,script=request.data["script"])
            return Response(res, status=status.HTTP_200_OK)
        except openai.error.RateLimitError:
                return Response("OpenAI rate limited", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# api for generate story/decision making/conversation
class GPTApiView(APIView):
    def post(self, request, format=None):
        try:
            resp = GptAPI.storyGPT(request.data)
            return Response(resp, status=status.HTTP_200_OK)
        except openai.error.RateLimitError:
                return Response("OpenAI rate limited", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            print(e)
            return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# to chat during the conversation
class ConversationGPTApiView(APIView):
    def post(self, request, format=None):
        try:
            resp = GptAPI.chatGPT_conversation(request.data)
            return Response(resp, status=status.HTTP_200_OK)
        except openai.error.RateLimitError:
                return Response("OpenAI rate limited", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            print(e)
            return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
               
# find all, find one of storyplay
class UserStoryPlayView(APIView):
     def post(self, request, format=None):
        task = request.data["task"]

        if task == "FIND_ALL_STORYPLAY":
            try:
                res = ScriptPlayDAO.find_all_scriptplay(request.data["user_id"])
                return Response(res, status=status.HTTP_200_OK)
            except Exception as e:
                return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        elif task == "FIND_STORYPLAY_INFO_BY_ID":
            try:
                res = ScriptPlayDAO.find_scriptplay_by_id(request.data["_id"])
                return Response(res, status=status.HTTP_200_OK)
            except Exception as e:
                return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# to summarize current story play inofo (incase it becomes too long and exceed the prompt length limit)
class SummarizePromptView(APIView):
     def post(self, request, format=None):
        try:
            resp = GptAPI.summarize_prompt(request.data)
            return Response(resp, status=status.HTTP_200_OK)
        except openai.error.RateLimitError:
                return Response("OpenAI rate limited", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            print(e)
            return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
