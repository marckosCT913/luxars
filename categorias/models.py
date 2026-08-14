from django.db import models


class Categorias(models.Model):
    categoria_id = models.AutoField(primary_key=True, db_column='categoria_id')
    nombre_categoria = models.CharField(max_length=100, db_column='nombre_categoria')
    descripcion = models.TextField(default='', db_column='descripcion')

    def __str__(self):
        return self.nombre_categoria

    class Meta:
        db_table = 'categorias'
