from django.db import models

from perfiles.models import PerfilesFotografos
from categorias.models import Categorias


class PortafoliosGalerias(models.Model):
    galeria_id = models.AutoField(primary_key=True, db_column='galeria_id')
    fotografo = models.ForeignKey(PerfilesFotografos, on_delete=models.CASCADE, db_column='fotografo_id', related_name='galerias')
    titulo_obra = models.CharField(max_length=150, db_column='titulo_obra')
    descripcion = models.TextField(default='', db_column='descripcion')
    imagen_url = models.CharField(max_length=255, db_column='imagen_url')
    categoria = models.ForeignKey(Categorias, on_delete=models.PROTECT, db_column='categoria_id', related_name='galerias')
    fecha_subida = models.DateTimeField(auto_now_add=True, db_column='fecha_subida')

    def __str__(self):
        return self.titulo_obra

    class Meta:
        db_table = 'portafolios_galerias'
