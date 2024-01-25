from django.urls import path
from .views import *


urlpatterns = [
    path("widget-chat", WidgetChatView.as_view()),
]