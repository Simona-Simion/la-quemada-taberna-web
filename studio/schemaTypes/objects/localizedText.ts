import {defineField, defineType} from 'sanity'

export const localizedText = defineType({
  name: 'localizedText',
  title: 'Texto largo multidioma',
  type: 'object',

  fields: [
    defineField({
      name: 'es',
      title: 'Español',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'en',
      title: 'Inglés',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'fr',
      title: 'Francés',
      type: 'text',
      rows: 3,
    }),
  ],
})