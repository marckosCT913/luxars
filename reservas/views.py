from django.shortcuts import render


def lista(request):
    return render(request, 'reservas/lista.html', {'pedidos': _qs()})


def _qs():
    from .models import ReservasPedidos
    return ReservasPedidos.objects.select_related('cliente', 'fotografo', 'item').order_by('-fecha_pedido')