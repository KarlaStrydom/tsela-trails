'use client'

import React from 'react'
import './styles.css'
import { useHome } from '@/context/home'

export default function Home() {
  const home = useHome()
  const { layout } = home || {}

  if (!layout) return null

  return (
    <main className="home space-y-12 px-4 py-10 max-w-4xl mx-auto">
      {layout.map((block: any) => {
        switch (block.blockType) {
          case 'textBlock':
            return (
              <section key={block.id} className="textBlock space-y-4">
                <h2 className="text-2xl font-bold text-primary">{block.heading}</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {block.content}
                </p>
              </section>
            )

          case 'featureList':
            return (
              <section key={block.id} className="featureList space-y-6">
                <h2 className="text-2xl font-bold text-primary">{block.heading}</h2>
                <ul className="grid md:grid-cols-2 gap-6">
                  {block.features?.map((feature: any) => (
                    <li key={feature.id} className="bg-card p-4 rounded-lg shadow-sm">
                      <h3 className="font-semibold text-lg">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">
                        {feature.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            )

          default:
            return null
        }
      })}
    </main>
  )
}