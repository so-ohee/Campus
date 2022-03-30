from django.urls import path
from . import views

app_name = "api"

urlpatterns = [
    path('recommend1/<uid>', views.recommend1),
    path('recommend2/<uid>', views.recommend2),
    path('similar/<campingId>', views.similar),
    path('filter/', views.filter),
    path('test/', views.test),
]
