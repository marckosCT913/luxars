from django.contrib import admin

from .models import PortafoliosGalerias


@admin.register(PortafoliosGalerias)
class PortafoliosGaleriasAdmin(admin.ModelAdmin):
    list_display = ('galeria_id', 'titulo_obra', 'fotografo', 'categoria', 'fecha_subida')
    search_fields = ('titulo_obra',)
