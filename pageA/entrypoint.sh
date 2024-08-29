#!/bin/sh
# Check if virtual environment directory exists
if [ ! -d "venv" ]; then
    # Create a virtual environment
    python3 -m venv venv
fi
# Activate the virtual environment
. venv/bin/activate
# Upgrade pip and install dependencies
pip install --upgrade pip
pip install -r requirements.txt
# Run migrations
python3 manage.py migrate
python3 manage.py collectstatic --noinput
# Start the server
exec python manage.py runserver 0.0.0.0:8000