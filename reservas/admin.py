from django.contrib import admin

from .models import ReservasPedidos


@admin.register(ReservasPedidos)
class ReservasPedidosAdmin(admin.ModelAdmin):
    list_display = ('pedido_id', 'cliente', 'fotografo', 'estado_pedido', 'total_pedido', 'fecha_pedido')
    list_filter = ('estado_pedido',)
