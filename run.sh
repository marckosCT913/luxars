#!/usr/bin/env bash
# Arranca el servidor de LuxArs (Django instalado globalmente)
cd "$(dirname "$0")"
python manage.py runserver 127.0.0.1:8000
