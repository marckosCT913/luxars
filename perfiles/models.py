from django.db import models

from usuarios.models import Usuarios


class PerfilesFotografos(models.Model):
    perfil_id = models.AutoField(primary_key=True, db_column='perfil_id')
    usuario = models.ForeignKey(Usuarios, on_delete=models.CASCADE, db_column='usuario_id', related_name='perfil')
    biografia = models.TextField(blank=True, default='', db_column='biografia')
    especialidad = models.CharField(max_length=100, db_column='especialidad')
    tarifa_base = models.DecimalField(max_digits=10, decimal_places=2, db_column='tarifa_base')
    enlace_portafolio = models.CharField(max_length=255, blank=True, default='', db_column='enlace_portafolio')

    def nombre_completo(self):
        return self.usuario.nombre_completo()

    def __str__(self):
        return f"{self.nombre_completo()} ({self.especialidad})"

    class Meta:
        db_table = 'perfiles_fotografos'
