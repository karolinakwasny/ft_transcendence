# my_django_project/urls.py

from django.contrib import admin
from django.urls import path, include

from django.urls import path
from .views import get_data

urlpatterns = [
    path('admin/', admin.site.urls),
	path('api/data/', get_data, name='get_data'),
    # Include URLs from other apps
    # path('app/', include('app.urls')),
]
