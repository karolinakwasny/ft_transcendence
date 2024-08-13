# my_django_project/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # Include URLs from other apps
    # path('app/', include('app.urls')),
]
