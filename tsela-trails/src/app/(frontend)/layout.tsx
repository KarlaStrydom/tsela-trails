import React from 'react'
import './styles.css'
import { NavBar } from '@/components/nav-bar'

import { getPayload } from 'payload'
import config from '@/payload.config'
import HomeProvider from '@/context/home'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  const payload = await getPayload({ config })
  const home = await payload.findGlobal({ slug: 'home-page' })

  return (
    <html lang="en">
      <body className='px-40'>
        <HomeProvider initialSettings={home}>
          <NavBar />
          <main>{children}</main>
        </HomeProvider>
      </body>
    </html>
  )
}
