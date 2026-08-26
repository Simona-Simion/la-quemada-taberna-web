# La Quemada Taberna Web

Sitio web oficial de **La Quemada Taberna**, una taberna familiar situada en el Casco Antiguo de Zaragoza.

El objetivo del proyecto es presentar el local, su identidad, su carta y su propuesta gastronómica mediante una web visual, rápida, responsive y sencilla de mantener.

## Estado del proyecto

**Versión funcional desplegada en producción.**

La web está publicada en Netlify y conectada a Sanity para gestionar contenido.

### Demo

https://la-quemada-taberna.netlify.app

El dominio definitivo se conectará posteriormente al despliegue de Netlify.

---

## Stack

### Frontend

* React
* Vite
* JavaScript
* Tailwind CSS
* React Router
* react-i18next

### CMS

* Sanity
* Sanity Studio
* Sanity Content Lake

### Despliegue

* Netlify
* GitHub
* Sanity Studio Hosting

---

## Funcionalidades

* Web **one page responsive**
* Diseño adaptado a móvil, tablet y escritorio
* Hero con fotografías e identidad visual de La Quemada
* Sección sobre la historia y esencia de la taberna
* Sección **En la barra** con contenido gestionado desde Sanity
* Galería de fotografías
* Cartas de comida y bodega en PDF
* Gestión de diferentes ediciones de carta
* Cartas disponibles en:

  * Español
  * Inglés
  * Francés
* Activación de la edición vigente desde Sanity
* Sección de encuentros y celebraciones
* Contacto directo por correo y WhatsApp
* Enlace externo a las reseñas de Google
* Enlace para abrir la ubicación en Google Maps
* Selector de idioma ES / EN / FR
* Páginas legales integradas
* Configuración SEO
* Favicon y Apple Touch Icon
* Rutas SPA configuradas para Netlify

---

## Gestión de contenido con Sanity

Sanity permite actualizar contenido de la web sin necesidad de modificar React ni realizar un nuevo despliegue manual.

Actualmente se gestionan desde el CMS:

* Ediciones de carta
* PDF de comida
* PDF de bodega
* Versiones ES / EN / FR
* Activación de la edición vigente
* Selección de productos de la barra
* Fotografías de la sección En la barra
* Información de la taberna
* Información SEO

El sistema de cartas utiliza **6 PDF por edición**:

```text
Comida
├── Español
├── Inglés
└── Francés

Bodega
├── Español
├── Inglés
└── Francés
```

Sanity Studio también está desplegado online, permitiendo gestionar el contenido sin tener el proyecto ejecutándose en local.

```text
https://la-quemada-taberna.sanity.studio
```

---

## Internacionalización

La web está preparada en tres idiomas:

```text
/es
/en
/fr
```

La interfaz utiliza `react-i18next` para gestionar las traducciones.

Las cartas PDF también disponen de versiones independientes en español, inglés y francés.

---

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Simona-Simion/la-quemada-taberna-web.git
```

Entrar en el proyecto:

```bash
cd la-quemada-taberna-web
```

Instalar las dependencias:

```bash
npm install
```

Ejecutar el proyecto en desarrollo:

```bash
npm run dev
```

La aplicación estará disponible normalmente en:

```text
http://localhost:5173
```

---

## Build de producción

Para generar la versión optimizada:

```bash
npm run build
```

Los archivos de producción se generan en:

```text
dist/
```

---

## Sanity Studio

El Studio se encuentra dentro del propio repositorio:

```text
studio/
```

Para ejecutarlo localmente:

```bash
cd studio
npx sanity dev
```

Para desplegar una nueva versión del Studio:

```bash
npx sanity deploy
```

Studio publicado:

```text
https://la-quemada-taberna.sanity.studio
```

---

## Despliegue

El repositorio está conectado directamente con Netlify.

Cada vez que se realiza un `push` a la rama `main`, Netlify vuelve a construir y publicar automáticamente la aplicación.

```bash
git add .
git commit -m "Descripción del cambio"
git push
```

Configuración del despliegue:

```text
Branch: main
Build command: npm run build
Publish directory: dist
```

Para permitir el funcionamiento correcto de las rutas internas de React Router se utiliza:

```text
public/_redirects
```

con la regla:

```text
/* /index.html 200
```

---

## Estructura general

```text
la-quemada-taberna-web/
├── public/
├── src/
│   ├── components/
│   ├── sections/
│   ├── pages/
│   ├── data/
│   └── ...
│
├── studio/
│   ├── schemaTypes/
│   ├── sanity.config.ts
│   └── sanity.cli.ts
│
├── package.json
├── vite.config.js
└── README.md
```

---

## Flujo de mantenimiento

### Cambios en el código

```text
Modificar React
      ↓
git commit
      ↓
git push
      ↓
GitHub
      ↓
Netlify
      ↓
Nueva versión publicada
```

### Cambios de contenido

```text
Sanity Studio
      ↓
Editar contenido
      ↓
Publish
      ↓
Sanity Content Lake
      ↓
La web obtiene el contenido actualizado
```

---

## Objetivo del proyecto

Además de desarrollar una web real para un negocio local, este proyecto me ha permitido trabajar de forma práctica con:

* Desarrollo frontend con React
* Diseño responsive
* Arquitectura basada en componentes
* Internacionalización
* Integración con un CMS Headless
* Gestión dinámica de contenido
* React Router
* SEO
* Gestión de Git y GitHub
* Integración continua
* Despliegue en producción con Netlify
* Gestión de contenido mediante Sanity

---

## Autora
 **Simona Simion**.
