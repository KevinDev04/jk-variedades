from django.shortcuts import render
from .models import Producto, Categoria, ConfiguracionTienda

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