from rest_framework import serializers
from .models import Producto


class ProductoSerializer(serializers.ModelSerializer):
    """
    Convierte un objeto Producto de Django en un diccionario JSON
    que el frontend (React) puede consumir.
    """

    # categoria es una llave foránea, mostramos el nombre directamente
    categoria = serializers.SerializerMethodField()

    # imagenes_adicionales: lista de URLs de las imágenes extra
    imagenes_adicionales = serializers.SerializerMethodField()

    # whatsapp: enlace generado por el método del modelo
    whatsapp = serializers.SerializerMethodField()

    # descripcion: texto por defecto si está vacía
    descripcion = serializers.SerializerMethodField()

    class Meta:
        model = Producto
        fields = [
            'id',
            'nombre',
            'categoria',
            'descripcion',
            'precio',
            'imagen',
            'imagenes_adicionales',
            'destacado',
            'whatsapp',
        ]

    def get_categoria(self, producto):
        if producto.categoria:
            return producto.categoria.nombre
        return 'General'

    def get_descripcion(self, producto):
        return producto.descripcion or 'Sin descripción disponible por el momento.'

    def get_imagenes_adicionales(self, producto):
        # Incluimos la imagen principal al inicio de la lista,
        # igual que hacía la API anterior
        imagenes = []
        if producto.imagen:
            imagenes.append(producto.imagen.url)
        for imagen in producto.imagenes_adicionales.all():
            imagenes.append(imagen.imagen.url)
        return imagenes

    def get_whatsapp(self, producto):
        return producto.get_whatsapp_link()
