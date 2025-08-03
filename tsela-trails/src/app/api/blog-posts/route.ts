import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const GET = async (request: Request) => {
  const payload = await getPayload({
    config: configPromise,
  })

  const posts = await payload.find({
    collection: 'posts',
  })

  return Response.json({ posts })
}
