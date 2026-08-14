from django.contrib import admin

from .models import Categorias


@admin.register(Categorias)
class CategoriasAdmin(admin.ModelAdmin):
    list_display = ('categoria_id', 'nombre_categoria')
