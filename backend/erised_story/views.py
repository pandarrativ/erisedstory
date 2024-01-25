from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import redirect
from .dao import ScriptPlayDAO, WidgetDAO, SurveyDAO
import openai


# Create your views here.   
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

