import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Article de blog',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      options: {
        canvasApp: { purpose: 'Titre principal de l\'article — accrocheur, entre 6 et 12 mots' },
      },
    }),
    defineField({
      name: 'slug',
      title: 'Slug URL',
      type: 'slug',
      options: { source: 'title', canvasApp: { exclude: true } },
    }),
    defineField({
      name: 'author',
      title: 'Auteur',
      type: 'reference',
      to: {type: 'author'},
      options: { canvasApp: { exclude: true } },
    }),
    defineField({
      name: 'mainImage',
      title: 'Image principale',
      type: 'image',
      options: { hotspot: true, canvasApp: { exclude: true } },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Texte alternatif' })],
    }),
    defineField({
      name: 'categories',
      title: 'Catégories',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
      options: { canvasApp: { exclude: true } },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      options: { canvasApp: { exclude: true } },
    }),
    defineField({
      name: 'excerpt',
      title: 'Résumé',
      type: 'text',
      rows: 3,
      options: {
        canvasApp: { purpose: 'Résumé accrocheur de 2-3 phrases affiché sur la carte article et dans les métas. Doit donner envie de lire.' },
      },
    }),
    defineField({
      name: 'tags',
      title: 'Mots-clés / Tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        layout: 'tags',
        canvasApp: { purpose: 'Tags thématiques courts (1-2 mots). Exemples : n8n, LinkedIn, cold email, IA générative. Affichés visuellement en couleur dans le hero de l\'article.' },
      },
      description: 'Tags affichés dans le hero de l\'article. Ex : n8n, LinkedIn, IA, prospection',
    }),
    defineField({
      name: 'capsule',
      title: 'Capsule — Réponse directe (GEO)',
      type: 'text',
      rows: 5,
      description: 'Réponse directe à la question du titre (2-3 phrases). Affiché en encadré avant le contenu. Optimisé pour que les IA (ChatGPT, Perplexity, Google SGE) citent cet article.',
      options: {
        canvasApp: { purpose: 'Réponse directe et synthétique à la question centrale du titre. 2 à 3 phrases maximum. Ton factuel et affirmatif. Ex : "Pour réussir ton développement commercial, tu dois d\'abord définir ta cible et ton positionnement avant d\'embaucher. Les erreurs les plus coûteuses surviennent quand on recrute un commercial sans avoir validé son marché. Cette méthode en 4 étapes te permet d\'éviter ces pièges."' },
      },
    }),
    defineField({
      name: 'faq',
      title: 'FAQ — Questions fréquentes',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faqItem',
          title: 'Question / Réponse',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string' }),
            defineField({ name: 'answer', title: 'Réponse', type: 'text', rows: 3 }),
          ],
          preview: { select: { title: 'question' } },
        }),
      ],
      description: '3 à 5 questions/réponses affichées en accordéon avant la conclusion. Optimisé GEO pour ChatGPT, Perplexity, Google SGE.',
      options: {
        canvasApp: { exclude: true },
      },
    }),
    defineField({
      name: 'body',
      title: 'Contenu',
      type: 'blockContent',
      options: {
        canvasApp: { purpose: 'Corps complet de l\'article : introduction, sections H2/H3, listes, citations, conclusion. Ton direct, concret, basé sur l\'expérience terrain.' },
      },
    }),
    defineField({
      name: 'badge',
      title: 'Badge mis en avant',
      type: 'string',
      options: {
        list: [
          { title: '⭐ Le plus lu',      value: 'popular' },
          { title: '🔁 Le plus partagé', value: 'shared'  },
        ],
        layout: 'radio',
        canvasApp: { exclude: true },
      },
      description: 'Optionnel — affiche un badge sur la carte dans la page Blog.',
    }),
    defineField({
      name: 'featured',
      title: 'Article à la une',
      type: 'boolean',
      description: 'Cochez pour afficher cet article en position "À la une" sur la page Blog. Un seul article à la fois recommandé.',
      initialValue: false,
      readOnly: false,
    }),
    defineField({
      name: 'seoTitle',
      title: 'Titre SEO',
      type: 'string',
      options: {
        canvasApp: { purpose: 'Titre SEO optimisé pour Google, différent du titre principal, max 60 caractères avec mot-clé principal.' },
      },
    }),
    defineField({
      name: 'seoDescription',
      title: 'Description SEO',
      type: 'text',
      rows: 2,
      options: {
        canvasApp: { purpose: 'Meta description Google : 150-160 caractères, incitative, avec mot-clé principal et call-to-action.' },
      },
    }),
  ],
  preview: {
    select: { title: 'title', author: 'author.name', media: 'mainImage' },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `par ${author}`}
    },
  },
})
