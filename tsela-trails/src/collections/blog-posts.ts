import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import slugify from 'slugify'

export const BlogPosts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Post', plural: 'Posts' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedDate'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true },
    { name: 'publishedDate', type: 'date', defaultValue: new Date() },
    {
      name: 'visible',
      type: 'checkbox',
      defaultValue: false,
    },
    { name: 'headerImage', type: 'upload', relationTo: 'media' },
    { name: 'excerpt', type: 'textarea', label: 'Summary' },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({}), // or 'quill'
      required: true,
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.title && !data.slug) {
          data.slug = slugify(data.title, { lower: true, strict: true })
        } else if (data) {
          data.slug = slugify(data.slug, { lower: true, strict: true })
        }
        return data
      },
    ],
  },
}
