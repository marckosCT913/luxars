from django.shortcuts import render


def lista(request):
    return render(request, 'roles/lista.html', {'roles': _qs()})


def _qs():
    from .models import Roles
    return Roles.objects.order_by('rol_id').prefetch_related('usuarios')