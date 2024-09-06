#!/bin/sh

echo "Script for user..."
  
python manage.py makemigrations
python manage.py migrate auth
python manage.py migrate --noinput

if [ -n "$DJANGO_USER_SUPERUSER_USERNAME" ] && [ -n "$DJANGO_USER_SUPERUSER_PASSWORD" ] && [ -n "$DJANGO_USER_SUPERUSER_EMAIL" ]; then
    python manage.py createsuperuser \
        --noinput \
        --username "$DJANGO_USER_SUPERUSER_USERNAME" \
        --email "$DJANGO_USER_SUPERUSER_EMAIL" \
    || true
fi

python manage.py runserver 0.0.0.0:7000