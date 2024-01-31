from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import redirect


import openai
from .ai_models.openai_api import OpenAIAPI
from .ai_models.prompts import *

from .utils.utils import *


# Create your views here.   
class WidgetChatView(APIView):
     def post(self, request, format=None):
        try:
            messages = clean_messages(request.data["messages"])
            resp = OpenAIAPI.send_messages(messages)
            return Response(resp, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ScriptToolView(APIView):
    def post(self, request, format=None):
        # print(request.data)
        task = request.data["task"]
        print(task)


        if task == "CREATE_LOGLINE":
            try:
                messages = add_prompt_settings(create_logline(when=request.data["when"], 
                                                              who = request.data["who"], 
                                                              what=request.data["what"],
                                                              why=request.data["why"],
                                                              how=request.data["how"],
                                                              where=request.data["where"],
                                                              but=request.data["but"],
                                                              ))
                resp = OpenAIAPI.send_messages(messages=messages)
                print(resp)
                resp = parse_to_json(resp=resp)
                return Response(resp, status=status.HTTP_200_OK)
            except Exception as e:
                    return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


        elif task == "CREATE_BEAT_SHEET":
            try:
                togline = request.data["togline"]
                messages = add_prompt_settings(create_beat_sheet(togline=togline))
                # print("-------------------")
                # print(messages)
                resp = OpenAIAPI.send_messages(messages=messages)
                # print(resp)
                resp = parse_to_json(resp=resp)
                return Response(resp, status=status.HTTP_200_OK)
            except Exception as e:
                    return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            

        elif task == "CREATE_TREATMENT":
            try:
                togline, beat_sheet = request.data["togline"], request.data["beat_sheet"]
                messages = add_prompt_settings(create_treatment(togline=togline, beat_sheet=beat_sheet))
                resp = OpenAIAPI.send_messages(messages=messages)
                resp = parse_to_json(resp=resp)
                return Response(resp, status=status.HTTP_200_OK)
            except Exception as e:
                    return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


        
                

