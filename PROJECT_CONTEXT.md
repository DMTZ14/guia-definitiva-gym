# PROJECT_CONTEXT.md — Esencial Gym (Landing Page)

## 1. Propósito del Proyecto
Landing page de conversión (mobile-first) para **Kit Esencial Gym: La Guía Definitiva para Empezar en el Gimnasio**, un producto digital descargable orientado a principiantes en México y Latinoamérica.

- **URL publicada (Lovable)**: `https://guia-definitiva-gym.lovable.app/`
- **Repositorio GitHub**: `https://github.com/DMTZ14/guia-definitiva-gym`
- **Precio vigente**: `$279 MXN` (precio ancla `$499 MXN`, ahorro `$220 MXN`, pago único vía Mercado Pago: `https://mpago.la/1B6G1mC`).

## 2. Arquitectura y Archivos Clave
- `src/routes/__root.tsx`: Configuración raíz HTML (`lang="es"`), metadatos SEO y contenedor base.
- `src/routes/index.tsx`: Landing completa con estilos responsive mobile-first (WCAG AA), barra superior con temporizador, navegación compacta, hero con render 3D, oferta unificada de rutinas, visor interactivo de muestras reales, resumen de compra, preguntas frecuentes, sección `#condiciones` y pie de página (`© 2025`).
- `public/images/guia-3d-render-sm.png` (`420x525`, 208 KB) y `public/images/guia-3d-render.png` (`600x750`, 409 KB): Render 3D optimizado de la guía con relación de aspecto `4:5` reservada para evitar saltos de layout (`CLS = 0`).
- `public/samples/`: Capturas auténticas de páginas individuales extraídas directamente de los PDFs finales del kit (`muestra-primera-visita`, `muestra-rutina-3-dias`, `muestra-registro-8-semanas` en versión miniatura y alta resolución para lectura con zoom en móvil). **Importante**: nunca publicar los PDFs o archivos `.zip` completos dentro de `public/`.

## 3. Oferta Oficial de Rutinas Alineada
- **Ruta principal**: 3 días por semana, esquema **Push–Pull–Legs** (Empuje, Tracción y Pierna), 5 ejercicios por sesión.
- **Ruta opcional incluida**: 4 días por semana, esquema **Torso–Pierna**, 5 ejercicios por sesión.
- **Mensaje rector**: *"Empieza con tres días por semana. Incluye una alternativa de cuatro días."*

## 4. Pendientes que Requieren Confirmación del Propietario (Niwi)
1. **Correo de soporte activo**: Actualmente se muestra `hola@esencialgym.com`, pero el dominio `esencialgym.com` no tiene registros MX ni está registrado (`NXDOMAIN`). Se requiere confirmar un correo operativo real o configurar el dominio antes de escalar tráfico.
2. **Datos comerciales / titularidad en `#condiciones`**: Confirmar nombre comercial o titular legal del vendedor y plazo máximo de respuesta de soporte por correo.
3. **Analítica (Etapa 2)**: Configuración de GA4 y Meta Pixel pospuesta por decisión confirmada para una segunda etapa.
