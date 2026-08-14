from django.contrib import admin

from .models import Pagos


@admin.register(Pagos)
class PagosAdmin(admin.ModelAdmin):
    list_display = ('pago_id', 'pedido', 'metodo_pago', 'monto_pagado', 'estado_pago', 'fecha_pago')
