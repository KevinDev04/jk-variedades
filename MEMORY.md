# MEMORY.md — JK Variedades

Memoria del proyecto entre sesiones. Mantener breve y actualizada.

## Estado actual

- Backend: Python + Django 6.1.1.
- Base de datos: PostgreSQL mediante Supabase en producción; SQLite en local.
- Imágenes: Supabase Storage en producción; disco local (`media/`) en desarrollo.
- Backend desplegado en Render (objetivo).
- Django Admin gestiona los productos.
- API con Django REST Framework: `GET /api/productos/` devuelve JSON.
- Frontend separado: React + TypeScript + Vite + Tailwind.
- React consume la API en local y muestra productos, buscador y filtros por categoría.
- Imágenes locales funcionando en React (URLs relativas completadas con `VITE_API_URL`).
- Producción del frontend: Cloudflare Pages (pendiente de desplegar).
- `frontend/.env.production` ya apunta a https://jk-variedades.onrender.com (no versionado; definir VITE_API_URL también en Cloudflare Pages).

## Arquitectura

```text
PostgreSQL/Supabase
        ↓
Django + DRF
        ↓
JSON API
        ↓
React + TypeScript
        ↓
Cloudflare Pages
```

Imágenes:

```text
Django → Supabase Storage → URL pública → API → React
```

## Aprendizajes y reglas

- React construye el frontend; TypeScript tipa ese código.
- Django continúa siendo el backend y administrador de los datos.
- React no accede directamente a PostgreSQL ni a los modelos Django.
- DRF conecta backend y frontend mediante JSON.
- PostgreSQL almacena datos; Supabase Storage almacena imágenes.
- Explicar conceptos nuevos: el proyecto también es de aprendizaje.
- Priorizar cambios pequeños y comprobables.
- `VITE_API_URL` diferencia local (`.env`) de producción (`.env.production`).

## Decisiones

- Mantener Django, Render, PostgreSQL y Supabase.
- Mantener Supabase Storage para imágenes en producción.
- No modificar modelos innecesariamente.
- No implementar inventario ni ecommerce completo todavía.
- El catálogo permite contacto/compra mediante WhatsApp.
- Código sencillo y comprensible para un junior.
- El agente actúa también como profesor.
- API con DRF (serializers en `tienda/serializers.py`).
- `STORAGES` cambia automáticamente a S3 solo si existe `AWS_STORAGE_BUCKET_NAME`.
- `settings_local.py` (no versionado) sobreescribe BD/STORAGES/MEDIA en local.

## Próximos pasos

- Editar `frontend/.env.production` con la URL real del backend en Render.
- Desplegar backend en Render y frontend en Cloudflare Pages.
- Continuar migrando el catálogo Django a React (modal de producto, carrusel, lightbox).
- Mantener Django como backend y panel administrativo.
