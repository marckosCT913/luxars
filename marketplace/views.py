import os
import unicodedata
from pathlib import Path

from django.http import JsonResponse, HttpResponse, Http404
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST, require_http_methods

from .models import Usuarios, PerfilesFotografos, Categorias, PortafoliosGalerias

BASE_DIR = Path(__file__).resolve().parent.parent
PUBLIC_DIR = BASE_DIR / 'public'

# La SPA reemplaza estos placeholders; sin .env se deja vacio (modo demo).
_SUPABASE_PLACEHOLDERS = {
    '__SUPABASE_URL__': os.environ.get('SUPABASE_URL', ''),
    '__SUPABASE_ANON_KEY__': os.environ.get('SUPABASE_ANON_KEY', ''),
}


def _normalize(value):
    return unicodedata.normalize('NFD', str(value)).encode('ascii', 'ignore').decode('ascii').strip().lower()


# ---------------------------------------------------------------
# SPA (History API): sirve los estaticos de public/ y hace fallback
# a index.html para cualquier ruta que no sea de la API.
# ---------------------------------------------------------------
def spa(request, path=''):
    requested = (PUBLIC_DIR / path).resolve()
    if path and requested.is_relative_to(PUBLIC_DIR.resolve()) and requested.is_file():
        content_type = {
            '.html': 'text/html; charset=utf-8',
            '.css': 'text/css; charset=utf-8',
            '.js': 'application/javascript; charset=utf-8',
            '.json': 'application/json',
            '.svg': 'image/svg+xml',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif',
            '.ico': 'image/x-icon',
            '.woff': 'font/woff',
            '.woff2': 'font/woff2',
        }.get(requested.suffix.lower(), 'application/octet-stream')
        return HttpResponse(requested.read_bytes(), content_type=content_type)

    index = (PUBLIC_DIR / 'index.html').read_text(encoding='utf-8')
    for key, value in _SUPABASE_PLACEHOLDERS.items():
        index = index.replace(key, value)
    return HttpResponse(index, content_type='text/html; charset=utf-8')


# ---------------------------------------------------------------
# API /api/photographers (replica controllers/photographersController.js)
# ---------------------------------------------------------------
def _photographer_to_dict(perfil):
    usuario = perfil.usuario
    obras = list(perfil.galerias.order_by('fecha_subida')[:8])
    promedio = _average_rating(perfil)
    return {
        'id': perfil.perfil_id,
        'name': f"{usuario.nombre} {usuario.apellido}".strip(),
        'specialty': perfil.especialidad,
        'rating': promedio,
        'price': float(perfil.tarifa_base),
        'avatar': f"https://i.pravatar.cc/300?img={perfil.perfil_id}",
        'portfolio': [o.imagen_url for o in obras],
        'bio': perfil.biografia,
        'location': usuario.direccion or 'Valle de Aburrá',
        'experience': _experience_label(perfil),
        'deliveries': '3-7 días hábiles',
    }


def _average_rating(perfil):
    try:
        reseñas = perfil.usuario.reseñas_recibidas.all()
    except Exception:
        reseñas = []
    if not reseñas:
        return 4.7
    total = sum(r.calificacion for r in reseñas)
    return round(total / len(reseñas), 1)


def _experience_label(perfil):
    anos = (perfil.perfil_id % 9) + 4
    return f"{anos} años"


@require_GET
def photographers_list(request):
    qs = PerfilesFotografos.objects.select_related('usuario').prefetch_related('galerias').all()
    specialty = request.GET.get('specialty')
    max_price = request.GET.get('maxPrice', '')

    if specialty:
        wanted = _normalize(specialty)
        qs = [p for p in qs if _normalize(p.especialidad) == wanted]
    else:
        qs = list(qs)

    if max_price not in (None, ''):
        try:
            price = float(max_price)
            qs = [p for p in qs if float(p.tarifa_base) <= price]
        except ValueError:
            pass

    return JsonResponse([_photographer_to_dict(p) for p in qs], safe=False)


@require_GET
def photographers_detail(request, perfil_id):
    try:
        perfil = PerfilesFotografos.objects.select_related('usuario').prefetch_related('galerias').get(perfil_id=perfil_id)
    except PerfilesFotografos.DoesNotExist:
        return JsonResponse({'error': 'Fotografo no encontrado.'}, status=404)
    return JsonResponse(_photographer_to_dict(perfil))


# ---------------------------------------------------------------
# API /api/auth/profile (replica controllers/authController.js)
# ---------------------------------------------------------------
@require_http_methods(['GET', 'PUT'])
@csrf_exempt
def auth_profile(request):
    email = request.headers.get('X-Demo-User') or ''
    usuario = Usuarios.objects.filter(email__iexact=email).first()
    if not usuario:
        return JsonResponse({'user': None, 'supabase': False})

    role_name = usuario.rol.nombre_rol if usuario.rol else 'client'
    payload = {
        'id': str(usuario.usuario_id),
        'email': usuario.email,
        'name': f"{usuario.nombre} {usuario.apellido}".strip(),
        'role': role_name,
        'avatar': None,
        'created_at': usuario.fecha_registro.isoformat() if usuario.fecha_registro else None,
    }
    if request.method == 'PUT':
        import json
        try:
            body = json.loads(request.body or b'{}')
        except json.JSONDecodeError:
            body = {}
        if 'name' in body and str(body['name']).strip():
            partes = str(body['name']).strip().split(' ', 1)
            usuario.nombre = partes[0]
            usuario.apellido = partes[1] if len(partes) > 1 else ''
            usuario.save()
            payload['name'] = f"{usuario.nombre} {usuario.apellido}".strip()
    return JsonResponse({'user': payload})


# ---------------------------------------------------------------
# API /api/bookings (replica controllers/bookingsController.js en modo
# simple: se persisten como ReservasPedidos cuando hay sesion demo).
# ---------------------------------------------------------------
@require_http_methods(['GET', 'POST'])
@csrf_exempt
def bookings_mine(request):
    from .models import ReservasPedidos
    email = request.headers.get('X-Demo-User') or ''
    usuario = Usuarios.objects.filter(email__iexact=email).first()
    if not usuario:
        return JsonResponse({'error': 'Debes iniciar sesion para acceder a este recurso.'}, status=401)

    if request.method == 'POST':
        import json
        try:
            body = json.loads(request.body or b'{}')
        except json.JSONDecodeError:
            body = {}
        fotografo = Usuarios.objects.filter(perfil__perfil_id=body.get('photographerId')).first()
        if not fotografo:
            return JsonResponse({'error': 'Fotografo no encontrado.'}, status=400)
        perfil = fotografo.perfil.first()
        from datetime import datetime, timedelta
        try:
            fecha = datetime.fromisoformat(f"{body.get('date')}T{body.get('time')}")
        except (ValueError, TypeError):
            return JsonResponse({'error': 'Fecha invalida. Usa el formato AAAA-MM-DD.'}, status=400)
        item = Usuarios.objects.get(perfil__perfil_id=perfil.perfil_id).servicios.first() or None
        from .models import ServiciosProductos
        item = item or ServiciosProductos.objects.create(
            fotografo=fotografo,
            nombre_item='Sesion ' + (perfil.especialidad or ''),
            descripcion='Sesion creada desde la SPA',
            precio=perfil.tarifa_base,
            tipo_item='Sesión',
            stock=1,
        )
        pedido = ReservasPedidos.objects.create(
            cliente=usuario,
            fotografo=fotografo,
            item=item,
            fecha_sesion_reservada=fecha,
            estado_pedido='Confirmada',
            total_pedido=perfil.tarifa_base,
        )
        return JsonResponse({'booking': {
            'id': 'RES-' + str(pedido.pedido_id),
            'photographerId': perfil.perfil_id,
            'photographerName': f"{fotografo.nombre} {fotografo.apellido}".strip(),
            'date': body.get('date'),
            'time': body.get('time'),
            'eventType': body.get('eventType', ''),
            'location': body.get('location', ''),
            'notes': body.get('notes', ''),
            'price': float(perfil.tarifa_base),
            'status': 'Confirmada',
        }}, status=201)

    pedidos = ReservasPedidos.objects.filter(cliente=usuario)
    return JsonResponse({'bookings': [
        {
            'id': 'RES-' + str(p.pedido_id),
            'photographerId': p.fotografo.perfil.first().perfil_id if p.fotografo.perfil.exists() else None,
            'photographerName': f"{p.fotografo.nombre} {p.fotografo.apellido}".strip(),
            'date': p.fecha_sesion_reservada.strftime('%Y-%m-%d'),
            'time': p.fecha_sesion_reservada.strftime('%H:%M'),
            'price': float(p.total_pedido),
            'status': p.estado_pedido,
        }
        for p in pedidos
    ]}, safe=False)


@csrf_exempt
@require_POST
def bookings_cancel(request, pedido_id):
    from .models import ReservasPedidos
    email = request.headers.get('X-Demo-User') or ''
    usuario = Usuarios.objects.filter(email__iexact=email).first()
    if not usuario:
        return JsonResponse({'error': 'Debes iniciar sesion para acceder a este recurso.'}, status=401)
    try:
        pedido = ReservasPedidos.objects.get(pedido_id=pedido_id, cliente=usuario)
    except ReservasPedidos.DoesNotExist:
        return JsonResponse({'error': 'Reserva no encontrada.'}, status=404)
    pedido.estado_pedido = 'Cancelada'
    pedido.save()
    return JsonResponse({'booking': {'id': 'RES-' + str(pedido.pedido_id), 'status': 'Cancelada'}})
