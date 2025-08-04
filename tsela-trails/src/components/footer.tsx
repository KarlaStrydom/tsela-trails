'use client'

import Link from 'next/link'
import {
  FaFacebook,
  FaWhatsapp,
  FaXTwitter,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
} from 'react-icons/fa6'
import { Mail } from 'lucide-react'
import { useContacts } from '@/context/contacts'

export default function Footer() {
  const contacts = useContacts()

  return (
    <footer className="text-muted-foreground py-8 px-4 border-t flex flex-col items-center gap-6">
      {/* Socials */}
      <div className="flex justify-center space-x-4 mb-2">
      {contacts &&
        Object.entries(contacts).map(([key, value]) => {
        if (!value) return null

        const icons: Record<string, React.ReactNode> = {
          facebook: <FaFacebook size={24} />,
          whatsapp: <FaWhatsapp size={24} />,
          twitter: <FaXTwitter size={24} />,
          instagram: <FaInstagram size={24} />,
          linkedin: <FaLinkedin size={24} />,
          tiktok: <FaTiktok size={24} />,
          email: <Mail size={24} />,
        }

        let href = value as string
        if (key === 'email') {
          href = `mailto:${value}`
        } else if (key === 'whatsapp') {
          href = `https://wa.me/${value}`
        }

        return (
          <Link key={key} target="_blank" href={href} className="flex gap-2" aria-label={key}>
          {icons[key]}
          </Link>
        )
        })}
      </div>
      {/* Copyright */}
      <div className="text-center text-sm mt-2">
      © 2025 Tsela Trails. All rights reserved.
      </div>
    </footer>
  )
}
