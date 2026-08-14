from django.urls import path
from . import views

app_name = 'perfiles'

urlpatterns = [
    path('', views.lista, name='lista'),
    path('<int:perfil_id>/', views.detalle, name='detalle'),
]