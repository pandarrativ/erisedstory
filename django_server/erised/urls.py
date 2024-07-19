from django.urls import path
from .views import *


urlpatterns = [
    path("story", StoryPlayApiView.as_view()),
    path("ai-mentor", SageTaskApiView.as_view()),
]