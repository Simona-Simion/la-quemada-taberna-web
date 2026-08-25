export const menuInfo = {
  eyebrow: 'Nuestra carta',
  title: 'Lo que se sirve en La Quemada.',
  description:
    'Cartas completas, producto de taberna y vinos pensados para acompañar.',

  suggestions: {
    eyebrow: 'Fuera de carta',
    title: 'Sugerencias de la semana',
    description:
      'Además de la carta, preparamos propuestas que cambian según producto y temporada.',
    note: 'Pregunta al personal por las sugerencias disponibles hoy.',
  },

  pdfs: [
    {
      badge: 'Comida',
      title: '',
      subtitle:
        'Aperitivos, curados, centros y platos de taberna.',
      url: '/pdf/CARTA%20LA%20QUEMADA.pdf',
      buttonText: 'Abrir carta de comida',

      image: {
        mobile:
          '/images/carta/carta-comida-mobile.webp',
        desktop:
          '/images/carta/carta-comida-desktop.webp',
      },

      featured: true,
    },
    {
      badge: 'Bodega',
      title: '',
      subtitle:
        'Copas, botellas y referencias para acompañar la visita.',
      url:
        '/pdf/CARTA%20VINOS%20LA%20QUEMADA.pdf',
      buttonText: 'Abrir carta de vinos',

      image: {
        mobile:
          '/images/carta/carta-bodega-mobile.webp',
        desktop:
          '/images/carta/carta-bodega-desktop.webp',
      },

      featured: false,
    },
  ],

  note:
    'La oferta puede variar según disponibilidad y producto del día. Consulta con nuestro personal si necesitas información sobre alérgenos.',
}