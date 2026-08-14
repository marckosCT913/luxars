"""
URL configuration for luxars project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from django.views.generic import RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),

    # Modulos del dominio (navegacion entre apps)
    path('roles/', include('roles.urls')),
    path('usuarios/', include('usuarios.urls')),
    path('perfiles/', include('perfiles.urls')),
    path('categorias/', include('categorias.urls')),
    path('portafolios/', include('portafolios.urls')),
    path('servicios/', include('servicios.urls')),
    path('reservas/', include('reservas.urls')),
    path('pagos/', include('pagos.urls')),
    path('resenas/', include('resenas.urls')),
    path('modulos/', RedirectView.as_view(pattern_name='roles:lista', permanent=False), name='modulos-home'),

    # API de la SPA (debe ir despues de los modulos para no taparlos)
    path('', include('marketplace.urls')),
]
