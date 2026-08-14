from django.shortcuts import render


def lista(request):
    return render(request, 'portafolios/lista.html', {'obras': _qs()})


def _qs():
    from .models import PortafoliosGalerias
    return PortafoliosGalerias.objects.select_related('fotografo__usuario', 'categoria').order_by('-fecha_subida')