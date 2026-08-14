from django.shortcuts import render


def lista(request):
    return render(request, 'pagos/lista.html', {'pagos': _qs()})


def _qs():
    from .models import Pagos
    return Pagos.objects.select_related('pedido').order_by('-fecha_pago')