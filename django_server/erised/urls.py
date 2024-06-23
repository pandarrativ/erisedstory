from django.urls import path
from .views import *


urlpatterns = [
    path("story", StoryPlayApiView.as_view()),
    path("sage-conversation", SageConversationApiView.as_view()),
]