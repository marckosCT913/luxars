from django.db import models

from usuarios.models import Usuarios


class ServiciosProductos(models.Model):
    TIPO_ITEM_CHOICES = [
        ('Digital', 'Digital'),
        ('Impresión', 'Impresión'),
        ('Sesión', 'Sesión'),
    ]

    item_id = models.AutoField(primary_key=True, db_column='item_id')
    fotografo = models.ForeignKey(Usuarios, on_delete=models.CASCADE, db_column='fotografo_id', related_name='servicios')
    nombre_item = models.CharField(max_length=150, db_column='nombre_item')
    descripcion = models.TextField(default='', db_column='descripcion')
    precio = models.DecimalField(max_digits=10, decimal_places=2, db_column='precio')
    tipo_item = models.CharField(max_length=20, choices=TIPO_ITEM_CHOICES, db_column='tipo_item')
    stock = models.IntegerField(default=0, db_column='stock')

    def __str__(self):
        return self.nombre_item

    class Meta:
        db_table = 'servicios_productos'
