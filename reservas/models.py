from django.db import models

from usuarios.models import Usuarios
from servicios.models import ServiciosProductos


class ReservasPedidos(models.Model):
    pedido_id = models.AutoField(primary_key=True, db_column='pedido_id')
    cliente = models.ForeignKey(Usuarios, on_delete=models.CASCADE, db_column='cliente_id', related_name='pedidos_cliente')
    fotografo = models.ForeignKey(Usuarios, on_delete=models.CASCADE, db_column='fotografo_id', related_name='pedidos_fotografo')
    item = models.ForeignKey(ServiciosProductos, on_delete=models.CASCADE, db_column='item_id', related_name='pedidos')
    fecha_pedido = models.DateTimeField(auto_now_add=True, db_column='fecha_pedido')
    fecha_sesion_reservada = models.DateTimeField(db_column='fecha_sesion_reservada')
    estado_pedido = models.CharField(max_length=50, db_column='estado_pedido')
    total_pedido = models.DecimalField(max_digits=10, decimal_places=2, db_column='total_pedido')

    def __str__(self):
        return f"Pedido {self.pedido_id} - {self.estado_pedido}"

    class Meta:
        db_table = 'reservas_pedidos'
