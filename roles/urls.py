from django.urls import path
from . import views

app_name = 'roles'

urlpatterns = [
    path('', views.lista, name='lista'),
]