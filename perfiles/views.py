from django.shortcuts import render, get_object_or_404

from .models import PerfilesFotografos


def lista(request):
    perfiles = PerfilesFotografos.objects.select_related('usuario').prefetch_related('galerias').order_by('perfil_id')
    especialidad = request.GET.get('especialidad', '')
    if especialidad:
        perfiles = perfiles.filter(especialidad__iexact=especialidad)
    context = {
        'perfiles': perfiles,
        'especialidades': PerfilesFotografos.objects.values_list('especialidad', flat=True).distinct().order_by(),
        'especialidad': especialidad,
    }
    return render(request, 'perfiles/lista.html', context)


def detalle(request, perfil_id):
    perfil = get_object_or_404(
        PerfilesFotografos.objects.select_related('usuario'),
        perfil_id=perfil_id,
    )
    obras = perfil.galerias.select_related('categoria').order_by('fecha_subida')
    resenas = perfil.usuario.reseñas_recibidas.select_related('cliente').order_by('-fecha_reseña')
    context = {
        'perfil': perfil,
        'obras': obras,
        'reseñas': resenas,
    }
    return render(request, 'perfiles/detalle.html', context)