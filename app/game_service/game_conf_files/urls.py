# game_conf_files/urls.py

from django.contrib import admin
from django.urls import path, include

from django.urls import path
from .views import get_data

from django.shortcuts import redirect  # Import redirect here

urlpatterns = [
    path('admin/', admin.site.urls),
	path('api/data/', get_data, name='get_data'),
	path('', lambda request: redirect('/admin')),  # Redirect root URL to the login page
    path('accounts/', include('django.contrib.auth.urls')),  # This includes the login URL
    # Include URLs from other apps
    # path('app/', include('app.urls')),
]
