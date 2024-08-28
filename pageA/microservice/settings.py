from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-1234567890'

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

ROOT_URLCONF = 'microservice_a.urls'

DATABASES = {
	'default': {
		'ENGINE': 'django.db.backends.postgresql',
		'NAME': 'comments_db',
		'USER': 'postgres',
		'PASSWORD': 'password',
		'HOST': 'db_a',
		'PORT': '5432',
	}
}

STATIC_URL = 'static/'
