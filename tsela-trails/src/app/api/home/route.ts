import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const GET = async (request: Request) => {
  const payload = await getPayload({
    config: configPromise,
  })

  const homePage = await payload.findGlobal({ slug: 'home-page' })

  const { layout } = homePage

  return Response.json({
    layout,
  })
}