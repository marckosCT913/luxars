from django.contrib import admin

from .models import ServiciosProductos


@admin.register(ServiciosProductos)
class ServiciosProductosAdmin(admin.ModelAdmin):
    list_display = ('item_id', 'nombre_item', 'fotografo', 'precio', 'tipo_item', 'stock')
    search_fields = ('nombre_item',)
