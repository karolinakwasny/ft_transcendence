FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .

RUN python3 -m venv venv

RUN . venv/bin/activate && pip install --upgrade pip && pip install -r requirements.txt

COPY . .

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /app/entrypoint.sh

CMD ["sh", "/app/entrypoint.sh"]