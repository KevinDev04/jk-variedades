from django.contrib import admin
from .models import Categoria, Producto, ImagenAdicional, ConfiguracionTienda # Importamos los modelos que creamos

# Registramos la categoría para que aparezca en el panel
@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('nombre',) # Muestra la columna 'nombre' en la lista

class ImagenAdicionalInline(admin.TabularInline):
    model = ImagenAdicional
    extra = 2

# Registramos el producto con opciones visuales avanzadas para organizarlo mejor
@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'categoria', 'precio', 'destacado') # Las columnas que verás en una tabla ordenada
    list_filter = ('categoria', 'destacado') # Agrega filtros a la derecha para buscar rápido por categoría
    search_fields = ('nombre', 'descripcion') # Agrega una barra de búsqueda arriba para buscar productos por texto
    inlines = [ImagenAdicionalInline] # Esto te deja subir varias fotos desde el mismo producto en el admin

@admin.register(ConfiguracionTienda)
class ConfiguracionTiendaAdmin(admin.ModelAdmin):
    list_display = ('nombre_tienda', 'logo')
    
    # Opcional: Evitar que creen más de una configuración para mantenerlo ordenado
    def has_add_permission(self, request):
        if ConfiguracionTienda.objects.exists():
            return False
        return super().has_add_permission(request)    