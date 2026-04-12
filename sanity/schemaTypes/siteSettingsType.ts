import {defineField, defineType, defineArrayMember} from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Contenu du site',
  type: 'document',
  fields: [
    defineField({ name: 'heroTitle', title: 'Titre Hero', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Sous-titre Hero', type: 'text', rows: 3 }),
    defineField({ name: 'heroCTA', title: 'Bouton CTA', type: 'string' }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Titre', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
          defineField({ name: 'icon', title: 'Icône (emoji)', type: 'string' }),
        ]
      })]
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'question', title: 'Question', type: 'string' }),
          defineField({ name: 'answer', title: 'Réponse', type: 'text', rows: 4 }),
        ]
      })]
    }),
  ],
  preview: {
    prepare() { return { title: 'Contenu du site' } }
  },
})
