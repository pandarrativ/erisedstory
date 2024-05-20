from django.urls import path
from .views import *


urlpatterns = [
    path("story", StoryPlayApiView.as_view()),
    path("conversation", ConversationGPTApiView.as_view()),
    path("story-playdata", NewStoryDataApiView.as_view()),
    path("all-playdata", FindAllStoryDataByUID.as_view()),
    path("sage-conversation", SageAgentView.as_view()),
]