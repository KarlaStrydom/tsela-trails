'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useBlog } from '@/context/blog'
import Masonry from '@/components/masonry'

function renderContentNode(node: any) {
  switch (node.type) {
    case 'heading':
      if (node.tag === 'h1')
        return (
          <h1 key={Math.random()} className="text-3xl font-bold mb-2">
            {node.children?.[0]?.text}
          </h1>
        )
      if (node.tag === 'h2')
        return (
          <h2 key={Math.random()} className="text-2xl font-bold mb-2">
            {node.children?.[0]?.text}
          </h2>
        )
      return <div key={Math.random()}>{node.children?.[0]?.text}</div>
    case 'paragraph':
      return (
        <p key={Math.random()} className="mb-4">
          {node.children?.map((c: any, i: number) => c.text).join(' ')}
        </p>
      )
    case 'list':
      if (node.listType === 'bullet') {
        return (
          <ul key={Math.random()} className="list-disc ml-6 mb-4">
            {node.children?.map((item: any, i: number) => (
              <li key={i}>{item.children?.map((c: any) => c.text).join(' ')}</li>
            ))}
          </ul>
        )
      }
      return null
    case 'horizontalrule':
      return <hr key={Math.random()} className="my-6" />
    case 'upload':
      return (
        <div key={Math.random()} className="my-4">
          <Image
            src={node.value.url}
            alt={node.value.alt || ''}
            width={node.value.width || 800}
            height={node.value.height || 600}
            className="rounded"
          />
        </div>
      )
    case 'quote':
      return (
        <blockquote key={Math.random()} className="border-l-4 border-gray-400 pl-4 italic my-4">
          {node.children?.map((c: any) => c.text).join(' ')}
        </blockquote>
      )
    default:
      return null
  }
}

export default function PostPage() {
  const { slug } = useParams()
  const blog = useBlog()
  
  const post = blog?.posts?.docs?.find((p: any) => p.slug === slug)
  
  if (!blog) return <div className="p-8">Loading...</div>
  if (!post) return <div className="p-8">Post not found.</div>

  return (
    <main className="flex-1 flex flex-col items-center mx-auto px-4 gap-5">
      <h1 className="text-4xl font-heading font-bold mt-8 mb-2">{post.title}</h1>
      <p className="text-gray-500 mb-4">
        {new Date(post.publishedDate).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })}
      </p>
      {post.headerImage?.url && (
        <Image
          src={post.headerImage.url}
          alt={post.headerImage.alt || post.title}
          width={post.headerImage.width || 1080}
          height={post.headerImage.height || 920}
          className="w-full h-auto rounded mb-8"
        />
      )}
      <section className="w-full">
        {post.content?.root?.children?.map((node: any, i: number) => renderContentNode(node))}
      </section>

      {post.gallery && post.gallery.length > 0 && (
        <section className="w-full mt-8">
          <h2 className="text-3xl font-heading font-bold mb-6">Gallery</h2>
          <div className="h-[800px]">
            <Masonry
              items={post.gallery.map((image: any) => ({
                id: image.id.toString(),
                img: image.url,
                url: image.url,
                height: (image.height / image.width) * 400, // Normalize height based on aspect ratio
              }))}
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
        </section>
      )}
    </main>
  )
}
