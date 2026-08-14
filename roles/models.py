from django.db import models


class Roles(models.Model):
    rol_id = models.AutoField(primary_key=True, db_column='rol_id')
    nombre_rol = models.CharField(max_length=50, db_column='nombre_rol')
    descripcion = models.TextField(default='', db_column='descripcion')

    def __str__(self):
        return self.nombre_rol

    class Meta:
        db_table = 'roles'
