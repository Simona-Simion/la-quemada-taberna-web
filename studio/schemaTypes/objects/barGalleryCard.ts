import {
  defineArrayMember,
  defineField,
  defineType,
} from 'sanity'

export const barGalleryCard = defineType({
  name: 'barGalleryCard',
  title: 'Bloque de la galería',
  type: 'object',

  fields: [
    defineField({
      name: 'cardId',
      title: 'Sección',
      description:
        'Indica a qué bloque de la web pertenecen estas fotografías.',
      type: 'string',

      options: {
        list: [
          {
            title: 'La barra',
            value: 'barra',
          },
          {
            title: 'Producto',
            value: 'producto',
          },
          {
            title: 'Bodega',
            value: 'bodega',
          },
        ],

        layout: 'radio',
      },

      validation: (Rule) =>
        Rule.required(),
    }),

    defineField({
      name: 'images',
      title: 'Fotografías',
      description:
        'El orden de las fotografías será el mismo que se utilizará en la rotación de la web.',
      type: 'array',

      of: [
        defineArrayMember({
          type: 'barGalleryImage',
        }),
      ],

      validation: (Rule) =>
        Rule.min(1).error(
          'Añade al menos una fotografía.'
        ),
    }),

    defineField({
      name: 'isVisible',
      title: 'Bloque visible',
      description:
        'Desactívalo para ocultar temporalmente este bloque.',
      type: 'boolean',
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      cardId: 'cardId',
      images: 'images',
      isVisible: 'isVisible',
      media: 'images.0.desktop',
    },

    prepare({
      cardId,
      images,
      isVisible,
      media,
    }) {
      const titles = {
        barra: 'La barra',
        producto: 'Producto',
        bodega: 'Bodega',
      }

      const imageCount =
        images?.length ?? 0

      return {
        title:
          titles[
            cardId as keyof typeof titles
          ] || 'Bloque sin seleccionar',

        subtitle:
          isVisible === false
            ? `Oculto · ${imageCount} fotografías`
            : `${imageCount} fotografías`,

        media,
      }
    },
  },
})