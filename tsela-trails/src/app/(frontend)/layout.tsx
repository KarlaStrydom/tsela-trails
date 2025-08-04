import React from 'react'
import './styles.css'
import { NavBar } from '@/components/nav-bar'

import { getPayload } from 'payload'
import config from '@/payload.config'
import HomeProvider from '@/context/home'
import BlogProvider from '@/context/blog'
import Footer from '@/components/footer'
import ContactsProvider from '@/context/contacts'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  const payload = await getPayload({ config })
  const home = await payload.findGlobal({ slug: 'home-page' })
  const contacts = await payload.findGlobal({ slug: 'contacts' })
  const blog = await payload.find({ collection: 'posts' })

  return (
    <html lang="en">
      <body className='!px-40'>
        <HomeProvider initialSettings={home}>
          <ContactsProvider initialSettings={contacts}>
            <BlogProvider initialSettings={blog}>
              <NavBar />
              <main>{children}</main>
              <Footer />
            </BlogProvider>
          </ContactsProvider>
        </HomeProvider>
      </body>
    </html>
  )
}
