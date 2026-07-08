# La Quemada Taberna Web

Web one page profesional para La Quemada Taberna, una taberna familiar de Zaragoza. Debe presentar el local, la carta, la historia del nombre, la ubicación y reforzar la confianza con reseñas reales de clientes.

## Stack

* Lenguaje: JavaScript
* Framework / runtime: React + Vite
* Estilos: Tailwind CSS
* Backend: no en la primera versión
* Deploy: hosting gratuito tipo Netlify, Vercel o Cloudflare Pages + dominio propio

## Comandos

* `npm run dev` — arranca el servidor en local
* `npm run build` — compila para producción
* `npm run preview` — previsualiza la build
* `npm run lint` — revisa errores de estilo si ESLint está configurado

## Datos clave del proyecto

* Nombre: La Quemada Taberna
* Lema: Somos de barrio y de barra
* Dirección: C. de Antonio Agustín, 24, Casco Antiguo, 50002 Zaragoza
* Instagram: @laquemadataberna
* Idiomas: español
* inglés y francés: traducciones futuras cuando el proyecto esta estructurado y finalizado
* Botón principal: Cómo llegar
* Botón secundario: Ver carta
* Horario: usar el horario confirmado de Google Maps; domingo cerrado por descanso
* Historia: conectar el nombre con la antigua Puerta Quemada y con la taberna actual llevada por Jorge y Fernando, sin especificar funciones separadas entre ellos

## Estructura del proyecto

* `public/images/brand/` — logo, hombrecillo, sellos e iconos de marca
* `public/images/hero/` — imagen principal de portada
* `public/images/carta/` — imágenes para categorías de carta
* `public/images/galeria/` — fotos del local, comida y ambiente
* `public/pdf/` — carta de comida y carta de vinos si existen en PDF
* `src/components/` — componentes React reutilizables
* `src/data/` — datos separados del diseño: negocio, carta, reseñas, galería,  traducciones futuras (`en`, `fr`) y posibles planes futuros 
* `src/styles/` — estilos globales

## Secciones principales

* Navbar
* Hero
* La Taberna
* De la Puerta Quemada a la barra
* Nuestra carta
* Galería
* Reseñas
* Horario y ubicación
* Contacto
* Footer

## Estilo

* Estética oscura, cálida y moderna
* Inspiración gastronómica elegante, pero con alma de taberna de barrio
* Colores: carbón oscuro, crema, madera, rojo quemado, bronce y blanco roto
* Priorizar fotos grandes, textos cortos, botones claros y navegación sencilla
* Usar el hombrecillo como recurso de identidad visual sin recargar el diseño

## Convenciones

* Componentes en PascalCase: `Hero.jsx`, `MenuSection.jsx`
* Datos en camelCase dentro de `src/data/`
* No mezclar textos fijos dentro de componentes si deben traducirse
* Mantener HTML semántico: `header`, `main`, `section`, `footer`
* Diseñar primero para móvil y luego adaptar a escritorio
* No inventar reseñas, precios, horarios ni datos del negocio

## No hagas

* No añadir backend, login, base de datos, pagos ni reservas automáticas en la primera versión
* No añadir IA hasta que la web base esté terminada
* No instalar dependencias nuevas sin pedir confirmación
* No subir `.env`, claves privadas ni datos sensibles
* No copiar diseño exacto de otras webs; solo usarlas como referencia visual

## Flujo de trabajo

* Antes de una tarea importante, proponer un plan y esperar OK
* Hacer una tarea a la vez
* Al terminar, explicar qué cambió y qué debe revisar la usuaria
* Si falta un dato real, dejarlo como pendiente y preguntar
* Si no hay al menos un 80% de seguridad, preguntar antes de decidir

## Documentación

* `PROJECT_CONTEXT.md` — contexto completo del proyecto
* `README.md` — explicación pública para portfolio
* PDFs de carta en `public/pdf/`
* Datos editables en `src/data/`
