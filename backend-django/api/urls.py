from django.urls import path
from .views import *


urlpatterns = [
    path("new-scriptplay", NewScriptPlayApiView.as_view()),
    path("storyplay", GPTApiView.as_view()),
    path("conversation", ConversationGPTApiView.as_view()),
    path("storyplay-info", UserStoryPlayView.as_view()),
    path("summarize-prompt", SummarizePromptView.as_view()),
]