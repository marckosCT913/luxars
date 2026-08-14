from django.db import models

from reservas.models import ReservasPedidos


class Pagos(models.Model):
    pago_id = models.AutoField(primary_key=True, db_column='pago_id')
    pedido = models.ForeignKey(ReservasPedidos, on_delete=models.CASCADE, db_column='pedido_id', related_name='pagos')
    metodo_pago = models.CharField(max_length=50, db_column='metodo_pago')
    monto_pagado = models.DecimalField(max_digits=10, decimal_places=2, db_column='monto_pagado')
    comision_plataforma = models.DecimalField(max_digits=10, decimal_places=2, db_column='comision_plataforma')
    estado_pago = models.CharField(max_length=50, db_column='estado_pago')
    fecha_pago = models.DateTimeField(auto_now_add=True, db_column='fecha_pago')

    def __str__(self):
        return f"Pago {self.pago_id} - {self.estado_pago}"

    class Meta:
        db_table = 'pagos'
