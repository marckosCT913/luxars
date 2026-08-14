from django.contrib import admin

from .models import (
    Roles,
    Usuarios,
    PerfilesFotografos,
    Categorias,
    PortafoliosGalerias,
    ServiciosProductos,
    ReservasPedidos,
    Pagos,
    Reseñas,
)


@admin.register(Roles)
class RolesAdmin(admin.ModelAdmin):
    list_display = ('rol_id', 'nombre_rol')


@admin.register(Usuarios)
class UsuariosAdmin(admin.ModelAdmin):
    list_display = ('usuario_id', 'nombre', 'apellido', 'email', 'rol', 'fecha_registro')
    list_filter = ('rol',)
    search_fields = ('nombre', 'apellido', 'email')


@admin.register(PerfilesFotografos)
class PerfilesFotografosAdmin(admin.ModelAdmin):
    list_display = ('perfil_id', 'usuario', 'especialidad', 'tarifa_base')


@admin.register(Categorias)
class CategoriasAdmin(admin.ModelAdmin):
    list_display = ('categoria_id', 'nombre_categoria')


@admin.register(PortafoliosGalerias)
class PortafoliosGaleriasAdmin(admin.ModelAdmin):
    list_display = ('galeria_id', 'titulo_obra', 'fotografo', 'categoria', 'fecha_subida')


@admin.register(ServiciosProductos)
class ServiciosProductosAdmin(admin.ModelAdmin):
    list_display = ('item_id', 'nombre_item', 'fotografo', 'precio', 'tipo_item', 'stock')


@admin.register(ReservasPedidos)
class ReservasPedidosAdmin(admin.ModelAdmin):
    list_display = ('pedido_id', 'cliente', 'fotografo', 'estado_pedido', 'total_pedido', 'fecha_pedido')


@admin.register(Pagos)
class PagosAdmin(admin.ModelAdmin):
    list_display = ('pago_id', 'pedido', 'metodo_pago', 'monto_pagado', 'estado_pago', 'fecha_pago')


@admin.register(Reseñas)
class ReseñasAdmin(admin.ModelAdmin):
    list_display = ('reseña_id', 'fotografo', 'cliente', 'calificacion', 'fecha_reseña')
