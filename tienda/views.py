from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Producto, Categoria, ConfiguracionTienda
from .serializers import ProductoSerializer
from django.http import JsonResponse

def catalogo_view(request):
    categorias = Categoria.objects.all()
    productos = Producto.objects.all().order_by('-creado')
    
    # Obtenemos la configuración de la tienda (el logo y datos globales)
    configuracion = ConfiguracionTienda.objects.first()

    categoria_id = request.GET.get('categoria')
    if categoria_id:
        productos = productos.filter(categoria_id=categoria_id)

    busqueda = request.GET.get('q')
    if busqueda:
        productos = productos.filter(nombre__icontains=busqueda) | productos.filter(descripcion__icontains=busqueda)

    context = {
        'categorias': categorias,
        'productos': productos,
        'categoria_activa': categoria_id,
        'configuracion': configuracion, # <- Lo pasamos aquí
    }
    return render(request, 'tienda/catalogo.html', context)

@api_view(['GET'])
def productos_json(request):
    # prefetch_related evita hacer una consulta extra por cada producto
    # al pedir sus imágenes adicionales (problema N+1)
    productos = Producto.objects.all().order_by('-creado').prefetch_related('imagenes_adicionales')

    serializer = ProductoSerializer(productos, many=True, context={'request': request})

    return Response({'productos': serializer.data})


def health_check(request):
    return JsonResponse({
        'status': 'ok'
    })