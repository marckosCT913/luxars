from django.shortcuts import render


def lista(request):
    return render(request, 'resenas/lista.html', {'reseñas': _qs()})


def _qs():
    from .models import Reseñas
    return Reseñas.objects.select_related('fotografo', 'cliente').order_by('-fecha_reseña')