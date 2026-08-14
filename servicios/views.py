from django.shortcuts import render


def lista(request):
    return render(request, 'servicios/lista.html', {'items': _qs()})


def _qs():
    from .models import ServiciosProductos
    return ServiciosProductos.objects.select_related('fotografo').order_by('item_id')