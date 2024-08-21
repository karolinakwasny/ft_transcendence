#!/bin/sh

echo "

Script for django

"

python manage.py makemigrations
python manage.py migrate --noinput
python manage.py startapp myapp


if [ -n "$DJANGO_SUPERUSER_USERNAME" ] && [ -n "$DJANGO_SUPERUSER_PASSWORD" ] && [ -n "$DJANGO_SUPERUSER_EMAIL" ]; then
    python manage.py createsuperuser \
        --noinput \
        --username "$DJANGO_SUPERUSER_USERNAME" \
        --email "$DJANGO_SUPERUSER_EMAIL" \
    || true
fi

python manage.py runserver 0.0.0.0:5000