import {defineField, defineType} from 'sanity'

export const localizedString = defineType({
  name: 'localizedString',
  title: 'Texto corto multidioma',
  type: 'object',

  fields: [
    defineField({
      name: 'es',
      title: 'Español',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'en',
      title: 'Inglés',
      type: 'string',
    }),

    defineField({
      name: 'fr',
      title: 'Francés',
      type: 'string',
    }),
  ],
})