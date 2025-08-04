import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const GET = async (request: Request) => {
  const payload = await getPayload({
    config: configPromise,
  })

  const contacts = await payload.findGlobal({ slug: 'contacts' })

  // Destructure the fields you want to return
  const {
    phone,
    email,
    whatsapp,
    facebook,
    instagram,
    tiktok,
    twitter,
    linkedin,
  } = contacts

  return Response.json({
    phone,
    email,
    whatsapp,
    facebook,
    instagram,
    tiktok,
    twitter,
    linkedin,
  })
}