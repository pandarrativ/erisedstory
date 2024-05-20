from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path("pdtalk/", include("pdtalk.urls")),
    path("erised/", include("erised.urls")),
]
