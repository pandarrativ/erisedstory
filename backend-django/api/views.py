from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import redirect
from .service.gpt import GptAPI
from .service.dalle import DalleAPI
from .dao import ScriptPlayDAO, WidgetDAO, SurveyDAO
import openai


# Create your views here.

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
        
##############################################################
#####################temporaly disable it ####################
##############################################################
class ImageGPTApiView(APIView):
    def post(self, request, format=None):
        try:
            # res = DalleAPI.parse_req_generateImg(request.data)

            # store data
            # ScriptPlayDAO.add_thoughts(request.data["scriptplay_id"], request.data["prompt"] ,res)

            ScriptPlayDAO.add_thoughts_no_imgs(request.data["scriptplay_id"], request.data["prompt"])
            return Response("Saved!", status=status.HTTP_200_OK)
        except openai.error.RateLimitError:
            return Response("OpenAI rate limited", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            print(e)
            return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class NewScriptPlayApiView(APIView):
    def post(self, request, format=None):
        try:
            res = ScriptPlayDAO.create_new_script_play(request.data["user_id"],mode=request.data["mode"] ,script=request.data["script"])
            scriptplay_agent_id = WidgetDAO.create_new_script_play_agent(
                 user_id=request.data["user_id"],
                 scriptplay_id=res["scriptplay_id"],
                 agent=request.data["agent"],
            )
            res["scriptplay_agent_id"] = scriptplay_agent_id
            return Response(res, status=status.HTTP_200_OK)
        except openai.error.RateLimitError:
                return Response("OpenAI rate limited", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class FindUserAllScriptPlay(APIView):
     def post(self, request, format=None):
          try:
               res = ScriptPlayDAO.find_all_scriptplay(request.data["user_id"])
               return Response(res, status=status.HTTP_200_OK)
          except Exception as e:
               return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class FindScriptPlayById(APIView):
     def post(self, request , format = None):
        try:
            res = ScriptPlayDAO.find_scriptplay_by_id(request.data["_id"])
            return Response(res, status=status.HTTP_200_OK)
        except Exception as e:
             return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ScriptInfoView(APIView):
     def post(self, request, format=None):
        try:
            res = ScriptPlayDAO.get_script_info(script=request.data["script"])
            return Response(res, status=status.HTTP_200_OK)
        except openai.error.RateLimitError:
                return Response("OpenAI rate limited", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class WidgetChatView(APIView):
     def post(self, request, format=None):
        try:
            resp = GptAPI.widgetGPT(request.data)
            return Response(resp, status=status.HTTP_200_OK)
        except openai.error.RateLimitError:
                return Response("OpenAI rate limited", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            print(e)
            return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class WidgetToastChatView(APIView):
     def post(self, request, format=None):
        try:
            resp = GptAPI.widgetToastGPT(request.data)
            return Response(resp, status=status.HTTP_200_OK)
        except openai.error.RateLimitError:
                return Response("OpenAI rate limited", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            print(e)
            return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class WidgetHelperView(APIView):
     def post(self, request, format=None):
        try:
            resp = GptAPI.widget_helper(request.data)
            return Response(resp, status=status.HTTP_200_OK)
        except openai.error.RateLimitError:
                return Response("OpenAI rate limited", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            print(e)
            return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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

class GroupChatGPTApiView(APIView):
    def post(self, request, format=None):
        try:
            resp = GptAPI.chatGPT_groupchat(request.data)
            return Response(resp, status=status.HTTP_200_OK)
        except openai.error.RateLimitError:
                return Response("OpenAI rate limited", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            print(e)
            return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class SurveyApiView(APIView):
    def post(self, request, format=None):
        try:
            # print(request.data)
            SurveyDAO.save_survey_data(dict(request.data))
            return redirect("/")
        except Exception as e:
            print(e)
            return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
  