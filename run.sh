#!/usr/bin/env bash
# Arranca el servidor de LuxArs con el Python global.
# PYTHONPATH explicito para que Django funcione aunque el shell desactive el user-site.
cd "$(dirname "$0")"
export PYTHONPATH="$PYTHONPATH:/home/jesusserpa/.local/lib/python3.14/site-packages"
python manage.py runserver 127.0.0.1:8000