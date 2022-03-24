from django.urls import path
from . import views

app_name = "api"

urlpatterns = [
    path('recommend1/<uid>', views.recommend1),
    path('test/', views.test),
]
