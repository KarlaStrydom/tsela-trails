// context/HomeContext.tsx
'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

const HomeContext = createContext<any>(null)

export const useHome = () => useContext(HomeContext)

const HomeProvider = ({ children }: any) => {
  const [home, setHome] = useState<any>(null)

  useEffect(() => {
    fetch('/api/home')
      .then((res) => res.json())
      .then((data) => setHome(data))
      .catch(() => setHome(null))
  }, [])

  return <HomeContext.Provider value={home}>{children}</HomeContext.Provider>
}

export default HomeProvider
