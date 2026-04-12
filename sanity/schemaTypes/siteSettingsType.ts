import {defineField, defineType, defineArrayMember} from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Contenu du site',
  type: 'document',
  fields: [
    // ── Hero ──────────────────────────────────────────────
    defineField({ name: 'heroPreTitle', title: 'Hero — Pré-titre (en haut en teal)', type: 'string' }),
    defineField({ name: 'heroTitleMain', title: 'Hero — Titre (partie normale)', type: 'string' }),
    defineField({ name: 'heroTitleAccent', title: 'Hero — Titre (partie orange)', type: 'string' }),
    defineField({ name: 'heroBadge', title: 'Hero — Badge sous le titre', type: 'string' }),
    defineField({ name: 'heroSubtitle1', title: 'Hero — Sous-titre 1', type: 'text', rows: 2 }),
    defineField({ name: 'heroSubtitle2', title: 'Hero — Sous-titre 2', type: 'text', rows: 2 }),
    defineField({ name: 'heroCTA', title: 'Hero — Bouton CTA', type: 'string' }),
    defineField({ name: 'heroCTASub', title: 'Hero — Texte sous le bouton', type: 'string' }),

    // ── Services ──────────────────────────────────────────
    defineField({ name: 'servicesSectionTitle', title: 'Services — Titre de section', type: 'string' }),
    defineField({ name: 'servicesSectionSubtitle', title: 'Services — Sous-titre de section', type: 'text', rows: 2 }),
    defineField({
      name: 'services',
      title: 'Services — Cartes',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'icon', title: 'Icône (symbole)', type: 'string' }),
          defineField({ name: 'badge', title: 'Badge (ex: Populaire)', type: 'string' }),
          defineField({ name: 'title', title: 'Titre', type: 'string' }),
          defineField({ name: 'subtitle', title: 'Sous-titre', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
          defineField({
            name: 'points',
            title: 'Points (liste)',
            type: 'array',
            of: [defineArrayMember({ type: 'string' })],
          }),
          defineField({ name: 'featured', title: 'Mis en avant (bordure orange)', type: 'boolean' }),
          defineField({ name: 'link', title: 'Lien (URL relative)', type: 'string' }),
        ],
        preview: {
          select: { title: 'title', subtitle: 'subtitle' },
        },
      })],
    }),

    // ── FAQ ───────────────────────────────────────────────
    defineField({ name: 'faqSectionTitle', title: 'FAQ — Titre de section', type: 'string' }),
    defineField({
      name: 'faq',
      title: 'FAQ — Questions / Réponses',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'question', title: 'Question', type: 'string' }),
          defineField({ name: 'answer', title: 'Réponse', type: 'text', rows: 4 }),
        ],
        preview: {
          select: { title: 'question' },
        },
      })],
    }),
  ],
  preview: {
    prepare() { return { title: 'Contenu du site' } }
  },
})
