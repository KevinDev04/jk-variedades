from django.db import models

class Categoria(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class Producto(models.Model):
    nombre = models.CharField(max_length=200)
    categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True, blank=True)
    descripcion = models.TextField(blank=True, null=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    imagen = models.ImageField(upload_to='productos/') # Imagen principal
    destacado = models.BooleanField(default=False)
    creado = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre

    def get_whatsapp_link(self):
        telefono = "573042739402" # Cambia por tu número real
        texto = f"Hola, JK Variedades, estoy interesado/a en comprar el producto: *{self.nombre}* con un precio de ${self.precio:,.0f}. ¿Está disponible?"
        import urllib.parse
        texto_codificado = urllib.parse.quote(texto)
        return f"https://wa.me/{telefono}?text={texto_codificado}"

# Nuevo modelo para permitir múltiples fotos por producto
class ImagenAdicional(models.Model):
    producto = models.ForeignKey(Producto, related_name='imagenes_adicionales', on_delete=models.CASCADE)
    imagen = models.ImageField(upload_to='productos/galeria/')

    def __str__(self):
        return f"Foto extra de {self.producto.nombre}"

class ConfiguracionTienda(models.Model):
    nombre_tienda = models.CharField(max_length=100, default="JK Variedades")
    logo = models.ImageField(upload_to='logo/', blank=True, null=True, help_text="Sube aquí tu logo (puedes cambiarlo en Navidad, amor y amistad, etc.)")

    def __str__(self):
        return "Configuración General de la Tienda"        