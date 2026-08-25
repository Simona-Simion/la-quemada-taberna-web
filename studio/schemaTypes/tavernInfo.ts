import {defineField, defineType} from 'sanity'

export const tavernInfo = defineType({
  name: 'tavernInfo',
  title: 'Información de la taberna',
  type: 'document',

  fields: [
    defineField({
      name: 'internalName',
      title: 'Nombre interno',
      type: 'string',
      description:
        'Sirve para identificar este documento dentro de Sanity.',
      initialValue: 'Información principal',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'hours',
      title: 'Horario habitual',
      type: 'object',

      fields: [
        defineField({
          name: 'weekday',
          title: 'Martes a jueves',
          type: 'localizedString',
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: 'saturday',
          title: ' Viernes y sábado',
          type: 'localizedString',
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: 'sunday',
          title: 'Domingo y lunes',
          type: 'localizedString',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    defineField({
      name: 'temporaryNotice',
      title: 'Aviso especial',
      type: 'object',
      description:
        'Para vacaciones, cierres excepcionales, cambios de horario u otros avisos temporales.',

      fields: [
        defineField({
          name: 'isVisible',
          title: 'Activar aviso',
          type: 'boolean',
          initialValue: false,
        }),

        defineField({
          name: 'noticeType',
          title: 'Tipo de aviso',
          type: 'string',
          initialValue: 'info',

          hidden: ({parent}) =>
            !parent?.isVisible,

          options: {
            list: [
              {
                title: 'Información',
                value: 'info',
              },
              {
                title: 'Cierre excepcional',
                value: 'closure',
              },
              {
                title: 'Cambio de horario',
                value: 'hours',
              },
            ],

            layout: 'radio',
          },
        }),

        defineField({
          name: 'startAt',
          title: 'Mostrar desde',
          description:
            'Opcional. Si se deja vacío, el aviso podrá mostrarse inmediatamente.',
          type: 'datetime',

          hidden: ({parent}) =>
            !parent?.isVisible,
        }),

        defineField({
          name: 'endAt',
          title: 'Mostrar hasta',
          description:
            'Opcional. Si se deja vacío, el aviso seguirá visible hasta que se desactive manualmente.',
          type: 'datetime',

          hidden: ({parent}) =>
            !parent?.isVisible,

          validation: (Rule) =>
            Rule.custom(
              (endAt, context) => {
                const parent =
                  context.parent as
                    | {
                        startAt?: unknown
                      }
                    | undefined

                const endDate =
                  typeof endAt === 'string'
                    ? endAt
                    : ''

                const startDate =
                  typeof parent?.startAt ===
                  'string'
                    ? parent.startAt
                    : ''

                if (
                  !endDate ||
                  !startDate
                ) {
                  return true
                }

                return (
                  new Date(
                    endDate
                  ).getTime() >
                    new Date(
                      startDate
                    ).getTime() ||
                  'La fecha final debe ser posterior a la fecha de inicio.'
                )
              }
            ),
        }),

        defineField({
          name: 'message',
          title: 'Mensaje del aviso',
          type: 'localizedText',

          hidden: ({parent}) =>
            !parent?.isVisible,

          validation: (Rule) =>
            Rule.custom(
              (value, context) => {
                const parent =
                  context.parent as
                    | {
                        isVisible?: boolean
                      }
                    | undefined

                if (
                  !parent?.isVisible
                ) {
                  return true
                }

                const localized =
                  value as
                    | {
                        es?: unknown
                        en?: unknown
                        fr?: unknown
                      }
                    | undefined

                const spanishMessage =
                  typeof localized?.es ===
                  'string'
                    ? localized.es.trim()
                    : ''

                return (
                  Boolean(
                    spanishMessage
                  ) ||
                  'Escribe al menos el mensaje en español.'
                )
              }
            ),
        }),

        defineField({
          name: 'actionLabel',
          title: 'Texto del botón',
          description:
            'Opcional. Por ejemplo: Ver carta, Más información o Cómo llegar.',
          type: 'localizedString',

          hidden: ({parent}) =>
            !parent?.isVisible,
        }),

        defineField({
          name: 'actionUrl',
          title: 'Enlace del botón',
          description:
            'Opcional. El botón solo aparecerá si hay un enlace y un texto.',
          type: 'url',

          hidden: ({parent}) =>
            !parent?.isVisible,

          validation: (Rule) =>
            Rule.uri({
              scheme: [
                'http',
                'https',
              ],
            }),
        }),
      ],
    }),

    defineField({
      name: 'contact',
      title: 'Contacto y enlaces',
      type: 'object',

      fields: [
        defineField({
          name: 'email',
          title: 'Correo electrónico',
          type: 'string',

          validation: (Rule) =>
            Rule.required().email(),
        }),

        defineField({
          name: 'phone',
          title: 'Teléfono visible',
          type: 'string',
          description:
            'Déjalo vacío mientras no se quiera mostrar un teléfono.',
        }),

        defineField({
          name: 'whatsapp',
          title: 'Número de WhatsApp',
          type: 'string',
          description:
            'Incluye el prefijo del país, sin +, espacios ni guiones. Ejemplo: 34600111222.',

          validation: (Rule) =>
            Rule.regex(
              /^[0-9]{8,15}$/,
              {
                name: 'número de WhatsApp',
                invert: false,
              }
            ).warning(
              'Usa solo números, incluyendo el prefijo del país.'
            ),
        }),

        defineField({
          name: 'instagramUrl',
          title: 'Enlace de Instagram',
          type: 'url',

          validation: (Rule) =>
            Rule.required().uri({
              scheme: [
                'http',
                'https',
              ],
            }),
        }),

        defineField({
          name: 'googleMapsUrl',
          title: 'Enlace de Google Maps',
          type: 'url',

          validation: (Rule) =>
            Rule.required().uri({
              scheme: [
                'http',
                'https',
              ],
            }),
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'internalName',
      email: 'contact.email',
    },

    prepare({title, email}) {
      return {
        title:
          title ||
          'Información de la taberna',

        subtitle:
          email ||
          'Horario y contacto',
      }
    },
  },
})