import { GlobalConfig } from 'payload'

export const Contacts: GlobalConfig = {
  slug: 'contacts',
  label: 'Contacts',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user), // Only admins
  },
  fields: [
    { name: 'phone', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'whatsapp', type: 'text' },
    { name: 'facebook', type: 'text' },
    { name: 'instagram', type: 'text' },
    { name: 'tiktok', type: 'text' },
    { name: 'twitter', type: 'text' },
    { name: 'linkedin', type: 'text' },
  ],
}
