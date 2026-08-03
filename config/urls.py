from django.contrib import admin
from django.urls import path, re_path

from luxars.views import index

urlpatterns = [
    path('admin/', admin.site.urls),
]

# SPA: serve the app for every route so pushState navigation works
urlpatterns += [re_path(r'^.*$', index)]