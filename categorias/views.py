from django.shortcuts import render


def lista(request):
    return render(request, 'categorias/lista.html', {'categorias': _qs()})


def _qs():
    from .models import Categorias
    return Categorias.objects.order_by('categoria_id')