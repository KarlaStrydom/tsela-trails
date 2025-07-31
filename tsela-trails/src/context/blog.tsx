// context/BlogContext.tsx
'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

const BlogContext = createContext<any>(null)

export const useBlog = () => useContext(BlogContext)

const BlogProvider = ({ children }: any) => {
  const [blog, setBlog] = useState<any>(null)

  useEffect(() => {
    fetch('/api/blog-posts')
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .catch(() => setBlog(null))
  }, [])

  return <BlogContext.Provider value={blog}>{children}</BlogContext.Provider>
}

export default BlogProvider
