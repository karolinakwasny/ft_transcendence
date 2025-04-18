#!/bin/sh

echo "
    Script for backend
"

python3 backend/manage.py makemigrations users
python3 backend/manage.py makemigrations
python3 backend/manage.py migrate --noinput --run-syncdb

# python3 backend/manage.py create_users

python3 backend/manage.py collectstatic --noinput


python3 backend/manage.py runserver 0.0.0.0:8000
