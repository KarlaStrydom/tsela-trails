'use client'

import Image from 'next/image'
import { CgProfile } from 'react-icons/cg'
import { LuCalendarX } from 'react-icons/lu'
import Link from 'next/link'
import { useBlog } from '@/context/blog'

export default function Blog() {
  const blog = useBlog()
  const posts = blog?.posts.docs ?? null

  return (
    <main className="flex-1 flex flex-col gap-5 items-center">
      {Array.isArray(posts) &&
        posts
          .filter((post) => post.visible && new Date(post.publishedDate) <= new Date())
          .map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="w-3/4 hover:bg-foreground/10"
            >
              <div className="flex gap-3 pb-3 border-b-1">
                {post.headerImage?.url && (
                  <Image
                    src={post.headerImage.url}
                    alt={post.headerImage.alt || post.title}
                    width={1080}
                    height={920}
                    className="w-2/5 h-64 object-cover rounded"
                  />
                )}
                <div className="w-3/5 flex flex-col justify-between">
                  <div>
                    <h2 className="text-4xl font-bold font-heading">{post.title}</h2>
                    <p className="text-md">{post.excerpt}</p>
                  </div>
                  <div>
                    <p className="text-md flex items-center gap-2">
                      <CgProfile /> Karla
                    </p>
                    <p className="text-md flex items-center gap-2">
                      <LuCalendarX />{' '}
                      {new Date(post.publishedDate)
                        .toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })
                        .replace(/ /g, ' ')}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      {Array.isArray(posts) &&
        posts.filter((post) => post.visible && new Date(post.publishedDate) <= new Date())
          .length === 0 && <p>No posts available.</p>}
    </main>
  )
}
