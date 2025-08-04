// context/ContactsContext.tsx
'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

const ContactsContext = createContext<any>(null)

export const useContacts = () => useContext(ContactsContext)

const ContactsProvider = ({ children }: any) => {
  const [contacts, setContacts] = useState<any>(null)

  useEffect(() => {
    fetch('/api/contacts')
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .catch(() => setContacts(null))
  }, [])

  return <ContactsContext.Provider value={contacts}>{children}</ContactsContext.Provider>
}

export default ContactsProvider
