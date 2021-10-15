from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/', include('foods.urls')),
    path('admin/', admin.site.urls),
    path('', include('frontend.urls')),
    path('', include('users.urls')),
]