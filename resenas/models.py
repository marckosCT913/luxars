from django.db import models

from usuarios.models import Usuarios


class Reseñas(models.Model):
    reseña_id = models.AutoField(primary_key=True, db_column='reseña_id')
    fotografo = models.ForeignKey(Usuarios, on_delete=models.CASCADE, db_column='fotografo_id', related_name='reseñas_recibidas')
    cliente = models.ForeignKey(Usuarios, on_delete=models.CASCADE, db_column='cliente_id', related_name='reseñas_emitidas')
    calificacion = models.IntegerField(db_column='calificacion')
    comentario = models.TextField(default='', db_column='comentario')
    fecha_reseña = models.DateTimeField(auto_now_add=True, db_column='fecha_reseña')

    def __str__(self):
        return f"Reseña {self.reseña_id} - {self.calificacion}/5"

    class Meta:
        db_table = 'reseñas'
