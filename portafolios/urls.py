from django.urls import path
from . import views

app_name = 'portafolios'

urlpatterns = [
    path('', views.lista, name='lista'),
]