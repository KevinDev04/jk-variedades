from django.urls import path
from .views import catalogo_view, productos_json

urlpatterns = [
    path('', catalogo_view, name='catalogo'),
    path('api/productos/', productos_json, name='productos_json')
]