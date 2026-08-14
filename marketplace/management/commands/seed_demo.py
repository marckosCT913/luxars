import json
from datetime import datetime

from django.core.management.base import BaseCommand
from django.utils import timezone

from marketplace.models import (
    Roles,
    Usuarios,
    PerfilesFotografos,
    Categorias,
    PortafoliosGalerias,
)


class Command(BaseCommand):
    help = 'Puebla la base SQLite con roles, categorias, usuarios demo y los 16 fotografos.'

    def handle(self, *args, **options):
        roles, _ = Roles.objects.get_or_create(
            rol_id=1, defaults={'nombre_rol': 'admin', 'descripcion': 'Administrador de la plataforma'}
        )
        role_foto, _ = Roles.objects.get_or_create(
            rol_id=2, defaults={'nombre_rol': 'photographer', 'descripcion': 'Fotografo con portafolio y servicios'}
        )
        role_cliente, _ = Roles.objects.get_or_create(
            rol_id=3, defaults={'nombre_rol': 'client', 'descripcion': 'Cliente que reserva sesiones'}
        )

        categorias = {
            'Retratos': 'Sesiones profesionales que capturan la esencia de la persona',
            'Eventos': 'Cobertura de celebraciones y reuniones especiales',
            'Moda': 'Fotografia editorial y de pasarela',
            'Bodas': 'El dia mas importante con imagenes unicas',
            'Producto': 'Imagenes comerciales para e-commerce y catalogos',
            'Arquitectura': 'Diseno y belleza de espacios y estructuras',
            'Naturaleza': 'Paisajes y vida silvestre en su estado mas puro',
            'Gastronomía': 'Fotografia culinaria que despierta el apetito',
        }
        for nombre, desc in categorias.items():
            Categorias.objects.get_or_create(nombre_categoria=nombre, defaults={'descripcion': desc})

        usuario_admin, _ = Usuarios.objects.get_or_create(
            email='admin@luxars.com',
            defaults={
                'nombre': 'Admin', 'apellido': 'LuxArs',
                'password_hash': '$2b$10$demoadmin', 'rol': roles,
            },
        )
        usuario_foto, _ = Usuarios.objects.get_or_create(
            email='foto@luxars.com',
            defaults={
                'nombre': 'Fotografo', 'apellido': 'Test',
                'password_hash': '$2b$10$demofoto', 'rol': role_foto,
            },
        )
        Usuarios.objects.get_or_create(
            email='cliente@luxars.com',
            defaults={
                'nombre': 'Cliente', 'apellido': 'Test',
                'password_hash': '$2b$10$democliente', 'rol': role_cliente,
            },
        )

        with open('C:/Users/marckos/AppData/Local/Temp/opencode/photographers.json', encoding='utf-8') as f:
            fotografos = json.load(f)

        for index, foto in enumerate(fotografos, start=1):
            nombre, *apellidos = foto['name'].split(' ')
            usuario, created = Usuarios.objects.get_or_create(
                email=f"foto{index}@luxars.com",
                defaults={
                    'nombre': nombre,
                    'apellido': ' '.join(apellidos),
                    'password_hash': '$2b$10$demofoto' + str(index),
                    'rol': role_foto,
                    'direccion': foto.get('location', 'Medellín'),
                },
            )
            perfil, _ = PerfilesFotografos.objects.get_or_create(
                usuario=usuario,
                defaults={
                    'biografia': foto.get('bio', ''),
                    'especialidad': foto['specialty'],
                    'tarifa_base': foto.get('price', 200),
                    'enlace_portafolio': '',
                },
            )
            categoria, _ = Categorias.objects.get_or_create(
                nombre_categoria=foto['specialty'],
                defaults={'descripcion': categorias.get(foto['specialty'], '')},
            )
            if not perfil.galerias.exists():
                for obra_url in foto.get('portfolio', [])[:8]:
                    PortafoliosGalerias.objects.create(
                        fotografo=perfil,
                        titulo_obra=f"Obra de {foto['name']}",
                        descripcion=foto.get('bio', ''),
                        imagen_url=obra_url,
                        categoria=categoria,
                    )

            self.stdout.write(f'  -> {foto["name"]} ({foto["specialty"]})')

        self.stdout.write(self.style.SUCCESS('Seed completado: roles, categorias, usuarios y fotografos listos.'))