from django.urls import path
from .views import *


urlpatterns = [
    path("story", GPTApiView.as_view()),
    path("conversation", ConversationGPTApiView.as_view()),
    path("img", ImageGPTApiView.as_view()),
    path("new-scriptplay", NewScriptPlayApiView.as_view()),
    path("user-scriptplay", FindUserAllScriptPlay.as_view()),
    path("detail-scriptplay",  FindScriptPlayById.as_view()),
    path("script-info",  ScriptInfoView.as_view()),
    path("widget-chat", WidgetChatView.as_view()),
    path("widget-toast-chat", WidgetToastChatView.as_view()),
    path("widget-helper", WidgetHelperView.as_view()),
    path("summarize-prompt", SummarizePromptView.as_view()),
    path("groupchat", GroupChatGPTApiView.as_view()),
    path("survey", SurveyApiView.as_view()),
]