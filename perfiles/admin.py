from django.contrib import admin

from .models import PerfilesFotografos


@admin.register(PerfilesFotografos)
class PerfilesFotografosAdmin(admin.ModelAdmin):
    list_display = ('perfil_id', 'usuario', 'especialidad', 'tarifa_base')
    search_fields = ('usuario__nombre', 'usuario__apellido', 'especialidad')
