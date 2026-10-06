from django.urls import path
from .views import catalogo_view, productos_json, health_check

urlpatterns = [
    path('', catalogo_view, name='catalogo'),
    path('api/productos/', productos_json, name='productos_json'),
    # Endpoint ligero para que UptimeRobot mantenga Render despierto
    path('api/health/', health_check, name='health_check'),
]