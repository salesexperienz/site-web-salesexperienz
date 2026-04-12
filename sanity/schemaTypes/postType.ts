import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Article de blog',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({ name: 'title', title: 'Titre', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug URL', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'author', title: 'Auteur', type: 'reference', to: {type: 'author'} }),
    defineField({ name: 'mainImage', title: 'Image principale', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', type: 'string', title: 'Texte alternatif' })] }),
    defineField({ name: 'categories', title: 'Catégories', type: 'array', of: [defineArrayMember({type: 'reference', to: {type: 'category'}})] }),
    defineField({ name: 'publishedAt', title: 'Date de publication', type: 'datetime' }),
    defineField({ name: 'excerpt', title: 'Résumé', type: 'text', rows: 3 }),
    defineField({ name: 'body', title: 'Contenu', type: 'blockContent' }),
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
      },
      description: 'Optionnel — affiche un badge sur la carte dans la page Blog.',
    }),
    defineField({ name: 'seoTitle', title: 'Titre SEO', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'Description SEO', type: 'text', rows: 2 }),
  ],
  preview: {
    select: { title: 'title', author: 'author.name', media: 'mainImage' },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `par ${author}`}
    },
  },
})
