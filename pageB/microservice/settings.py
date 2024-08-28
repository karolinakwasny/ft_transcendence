from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-0987654321'

DEBUG = True

ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
	'django.contrib.contenttypes',
	'django.contrib.staticfiles',
	'rest_framework',
]

MIDDLEWARE = [
	'django.middleware.common.CommonMiddleware',
]

ROOT_URLCONF = 'microservice_b.urls'

DATABASES = {
	'default': {
		'ENGINE': 'django.db.backends.postgresql',
		'NAME': 'comments_db',
		'USER': 'postgres',
		'PASSWORD': 'password',
		'HOST': 'db_b',
		'PORT': '5432',
	}
}

STATIC_URL = 'static/'
