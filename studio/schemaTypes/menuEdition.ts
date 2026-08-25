import {
  defineField,
  defineType,
} from 'sanity'

export const menuEdition = defineType({
  name: 'menuEdition',
  title: 'Ediciones de carta',
  type: 'document',

  fields: [
    defineField({
      name: 'internalName',
      title: 'Nombre interno',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'menuType',
      title: 'Tipo de carta',
      type: 'string',
      options: {
        list: [
          {title: 'Carta de comida', value: 'food'},
          {title: 'Carta de bodega', value: 'wine'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'edition',
      title: 'Temporada o edición',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'year',
      title: 'Año',
      type: 'number',
      validation: (Rule) =>
        Rule.required().integer().min(2026).max(2100),
    }),

    defineField({
      name: 'isActive',
      title: 'Carta activa',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'pdfEs',
      title: 'PDF español',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
    }),

    defineField({
      name: 'pdfEn',
      title: 'PDF inglés',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
    }),

    defineField({
      name: 'pdfFr',
      title: 'PDF francés',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
    }),
  ],

  preview: {
    select: {
      title: 'internalName',
      menuType: 'menuType',
      active: 'isActive',
    },
    prepare({title, menuType, active}) {
      const typeLabel =
        menuType === 'food' ? 'Comida' : 'Bodega'

      return {
        title,
        subtitle: `${typeLabel}${active ? ' · Activa' : ''}`,
      }
    },
  },
})