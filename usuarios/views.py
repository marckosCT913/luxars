from django.shortcuts import render


def lista(request):
    return render(request, 'usuarios/lista.html', {'usuarios': _qs()})


def _qs():
    from .models import Usuarios
    return Usuarios.objects.select_related('rol').order_by('usuario_id')