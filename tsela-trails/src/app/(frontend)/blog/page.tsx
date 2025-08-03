'use client'

import Image from 'next/image'
import { CgProfile } from 'react-icons/cg'
import { LuCalendarX } from 'react-icons/lu'
import Link from 'next/link'
import { useBlog } from '@/context/blog'
import Masonry from '@/components/masonry';

export default function Blog() {
  const blog = useBlog()
  const posts = blog?.posts.docs ?? null

  const items = Array.isArray(posts) 
    ? posts
        .filter((post) => post.visible && new Date(post.publishedDate) <= new Date())
        .flatMap((post) => {
          // If post has gallery images, use those
          if (post.gallery && post.gallery.length > 0) {
            return post.gallery.map((image :any) => ({
              id: image.id.toString(),
              img: image.url,
              url: `/blog/${post.slug}`,
              height: (image.height / image.width) * 400, // Normalize height based on aspect ratio
              title: post.title
            }));
          }
          // If no gallery, use header image if it exists
          if (post.headerImage?.url) {
            return [{
              id: post.headerImage.id.toString(),
              img: post.headerImage.url,
              url: `/blog/${post.slug}`,
              height: (post.headerImage.height / post.headerImage.width) * 400,
              title: post.title
            }];
          }
          // If no images at all, skip this post
          return [];
        })
    : [];

  if (!Array.isArray(posts) || posts.length === 0) {
    return <div className="p-8">No posts available.</div>;
  }

  return (
    <main className="flex-1 flex flex-col items-center">
      <div className="w-full h-[800px]">
        <Masonry
          items={items}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.95}
          blurToFocus={true}
          colorShiftOnHover={true}
        />
      </div>
    </main>
  )
}
