#!/bin/sh

echo "
    Script for backend
"

# Load environment variables from .env file
if [ -f .env ]; then
    export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
fi

# Add this to your Render deploy script
python3 backend/manage.py makemigrations users --empty --name add_qr_code_generated_at

# Then inside the generated migration file (e.g. `000X_add_qr_code_generated_at.py`) in users/migrations/
# manually add this:
migrations.AddField(
    model_name='user',
    name='qr_code_generated_at',
    field=models.DateTimeField(blank=True, null=True),
)


python3 backend/manage.py makemigrations users
python3 backend/manage.py makemigrations
python3 backend/manage.py migrate --noinput --run-syncdb

python3 backend/manage.py create_users

python3 backend/manage.py collectstatic --noinput
python3 backend/manage.py delete_expired_qrcodes


python3 backend/manage.py runserver 0.0.0.0:8000
