from django.urls import path
from . import views

app_name = 'resenas'

urlpatterns = [
    path('', views.lista, name='lista'),
]