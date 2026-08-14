from django.contrib import admin

from .models import Roles


@admin.register(Roles)
class RolesAdmin(admin.ModelAdmin):
    list_display = ('rol_id', 'nombre_rol')
