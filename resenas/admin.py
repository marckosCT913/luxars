from django.contrib import admin

from .models import Reseñas


@admin.register(Reseñas)
class ReseñasAdmin(admin.ModelAdmin):
    list_display = ('reseña_id', 'fotografo', 'cliente', 'calificacion', 'fecha_reseña')
