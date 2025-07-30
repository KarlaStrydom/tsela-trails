// context/SettingsContext.tsx
'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

const HomeContext = createContext<any>(null)

export const useSettings = () => useContext(HomeContext)

const SettingsProvider = ({ children }: any) => {
  const [settings, setSettings] = useState<any>(null)

  useEffect(() => {
    fetch('/api/home')
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch(() => setSettings(null))
  }, [])

  return <HomeContext.Provider value={settings}>{children}</HomeContext.Provider>
}

export default SettingsProvider
