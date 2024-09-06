# user_conf_files/asgi.py

import os
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'user_conf_files.settings')

application = get_asgi_application()
