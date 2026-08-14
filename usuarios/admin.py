from django.contrib import admin

from .models import Usuarios


@admin.register(Usuarios)
class UsuariosAdmin(admin.ModelAdmin):
    list_display = ('usuario_id', 'nombre', 'apellido', 'email', 'rol', 'fecha_registro')
    list_filter = ('rol',)
    search_fields = ('nombre', 'apellido', 'email')
