import { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'layout',
      label: 'Page Sections',
      type: 'blocks',
      blocks: [
        {
          slug: 'textBlock',
          labels: { singular: 'Text Block', plural: 'Text Blocks' },
          fields: [
            { name: 'heading', type: 'text', required: true },
            { name: 'content', type: 'textarea', required: true },
          ],
        },
        {
          slug: 'featureList',
          labels: { singular: 'Feature List', plural: 'Feature Lists' },
          fields: [
            { name: 'heading', type: 'text', required: true },
            {
              name: 'features',
              type: 'array',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
                {
                  name: 'visible',
                  type: 'checkbox',
                  defaultValue: false,
                  label: 'Show this feature',
                },
                {
                  name: 'url',
                  type: 'text',
                  label: 'Link URL',
                  admin: {
                    description: 'Optional link for this feature',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}