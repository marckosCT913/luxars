from django.db import models

from roles.models import Roles


class Usuarios(models.Model):
    usuario_id = models.AutoField(primary_key=True, db_column='usuario_id')
    nombre = models.CharField(max_length=100, db_column='nombre')
    apellido = models.CharField(max_length=100, db_column='apellido')
    email = models.CharField(max_length=150, unique=True, db_column='email')
    password_hash = models.CharField(max_length=255, db_column='password_hash')
    telefono = models.CharField(max_length=20, blank=True, default='', db_column='telefono')
    direccion = models.TextField(blank=True, default='', db_column='direccion')
    rol = models.ForeignKey(Roles, on_delete=models.PROTECT, db_column='rol_id', related_name='usuarios')
    fecha_registro = models.DateTimeField(auto_now_add=True, db_column='fecha_registro')

    def nombre_completo(self):
        return f"{self.nombre} {self.apellido}".strip()

    def __str__(self):
        return self.nombre_completo()

    class Meta:
        db_table = 'usuarios'
