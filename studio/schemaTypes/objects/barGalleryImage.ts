import {
  defineField,
  defineType,
} from 'sanity'

export const barGalleryImage = defineType({
  name: 'barGalleryImage',
  title: 'Fotografía de la galería',
  type: 'object',

  fields: [
    defineField({
      name: 'desktop',
      title: 'Imagen para escritorio',
      description:
        'Imagen principal utilizada en pantallas grandes.',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) =>
        Rule.required(),
    }),

    defineField({
      name: 'mobile',
      title: 'Imagen para móvil',
      description:
        'Imagen adaptada a móvil. Si no se añade, se utilizará la imagen de escritorio.',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'alt',
      title: 'Texto alternativo',
      description:
        'Descripción de la fotografía para accesibilidad en español, inglés y francés.',
      type: 'localizedString',
      validation: (Rule) =>
        Rule.required(),
    }),

    defineField({
      name: 'isVisible',
      title: 'Visible en la web',
      description:
        'Desactívalo para ocultar la fotografía sin eliminarla.',
      type: 'boolean',
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: 'alt.es',
      media: 'desktop',
      isVisible: 'isVisible',
    },

    prepare({
      title,
      media,
      isVisible,
    }) {
      return {
        title:
          title ||
          'Fotografía sin descripción',
        subtitle:
          isVisible === false
            ? 'Oculta'
            : 'Visible',
        media,
      }
    },
  },
})