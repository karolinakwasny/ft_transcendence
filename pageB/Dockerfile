FROM python:3.10-slim

WORKDIR /app

# Copy requirements.txt first to leverage Docker cache
COPY requirements.txt .

# Install virtualenv
RUN python -m venv venv

# Activate the virtual environment and install requirements
RUN . venv/bin/activate && pip install --upgrade pip && pip install -r requirements.txt

# Copy the rest of the application code
COPY . .

# Command to run migrations and start the server
CMD . venv/bin/activate && python manage.py migrate && python manage.py runserver 0.0.0.0:8000
