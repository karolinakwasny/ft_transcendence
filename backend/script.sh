#!/bin/sh

echo "
    Script for backend
"

echo "Clearing Django cache..."
python3 backend/manage.py clear_cache  # Add this only if you're using cache backend

# Optionally, you could delete `.pyc` files if you're encountering issues with old Python files
echo "Removing Python bytecode (.pyc) files..."
find . -name "*.pyc" -exec rm -f {} \;

# Optionally, you can also try deleting the entire migrations folder (if data isn't crucial)
# echo "Deleting old migration files..."
# rm -rf backend/users/migrations/*
# rm -rf backend/notifications/migrations/*
# rm -rf backend/friends/migrations/*

# Make sure there are no old migrations interfering
echo "Removing old migration files (if necessary)..."
python3 backend/manage.py makemigrations --empty users --name reset_user_migrations

# python3 backend/manage.py makemigrations users
# python3 backend/manage.py makemigrations
# python3 backend/manage.py migrate --noinput --run-syncdb

# python3 backend/manage.py create_users

# python3 backend/manage.py collectstatic --noinput
# python3 backend/manage.py delete_expired_qrcodes


# python3 backend/manage.py runserver 0.0.0.0:8000
