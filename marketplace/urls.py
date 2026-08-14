from django.urls import path, re_path
from . import views

urlpatterns = [
    path('api/photographers', views.photographers_list),
    path('api/photographers/<int:perfil_id>', views.photographers_detail),
    path('api/auth/profile', views.auth_profile),
    path('api/auth/login', views.auth_login),
    path('api/auth/register', views.auth_register),
    path('api/bookings/mine', views.bookings_mine),
    path('api/bookings/<int:pedido_id>/cancel', views.bookings_cancel),
    # La SPA (History API): cualquier otra ruta sirve index.html o el estatico.
    re_path(r'^(?P<path>.*)$', views.spa),
]
