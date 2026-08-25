import {
  defineField,
  defineType,
} from 'sanity'

export const barSelectionItem = defineType({
  name: 'barSelectionItem',
  title: 'Elemento de selección',
  type: 'object',

  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      description:
        'Nombre del producto en español, inglés y francés.',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'isVisible',
      title: 'Visible en la web',
      description:
        'Desactívalo para ocultarlo temporalmente sin borrarlo.',
      type: 'boolean',
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      es: 'name.es',
      en: 'name.en',
      fr: 'name.fr',
      isVisible: 'isVisible',
    },

    prepare({es, en, fr, isVisible}) {
      return {
        title:
          es ||
          en ||
          fr ||
          'Elemento sin nombre',
        subtitle:
          isVisible === false
            ? 'Oculto'
            : 'Visible',
      }
    },
  },
})