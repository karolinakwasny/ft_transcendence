#!/bin/sh

echo "
    Script for backend
"

# Load environment variables from .env file
if [ -f .env ]; then
    export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
fi

find users/migrations -type f -name "*.py" ! -name "__init__.py" -delete
find notifications/migrations -type f -name "*.py" ! -name "__init__.py" -delete
find friends/migrations -type f -name "*.py" ! -name "__init__.py" -delete

python3 backend/manage.py makemigrations users
python3 backend/manage.py makemigrations
python3 backend/manage.py migrate --noinput --run-syncdb

python3 backend/manage.py create_users

python3 backend/manage.py collectstatic --noinput
python3 backend/manage.py delete_expired_qrcodes


python3 backend/manage.py runserver 0.0.0.0:8000
