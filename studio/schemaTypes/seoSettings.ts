
import {defineField, defineType} from 'sanity'

export const seoSettings = defineType({
  name: 'seoSettings',
  title: 'SEO de la web',
  type: 'document',

  fields: [
    defineField({
      name: 'internalName',
      title: 'Nombre interno',
      type: 'string',
      initialValue: 'SEO principal',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'siteName',
      title: 'Nombre del negocio',
      type: 'string',
      initialValue: 'La Quemada Taberna',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'title',
      title: 'Título SEO',
      description:
        'Título que aparecerá en Google y en la pestaña del navegador.',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Descripción SEO',
      description:
        'Descripción que podrá utilizar Google en los resultados de búsqueda.',
      type: 'localizedText',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'canonicalUrl',
      title: 'URL principal de la web',
      description:
        'Ejemplo: https://laquemadataberna.es',
      type: 'url',

      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),

    defineField({
      name: 'socialImage',
      title: 'Imagen para compartir',
      description:
        'Imagen utilizada al compartir la web en WhatsApp, redes sociales, etc.',
      type: 'image',

      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'socialImageAlt',
      title: 'Texto alternativo de la imagen',
      type: 'localizedString',
    }),
  ],

  preview: {
    select: {
      title: 'siteName',
      subtitle: 'title.es',
      media: 'socialImage',
    },

    prepare({
      title,
      subtitle,
      media,
    }) {
      return {
        title:
          title ||
          'SEO de la web',

        subtitle:
          subtitle ||
          'Configuración SEO',

        media,
      }
    },
  },
})