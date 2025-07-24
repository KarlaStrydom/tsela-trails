import React from 'react'
import './styles.css'

export default async function Home() {

  return (
    <div className="home">
      <div className="content">
        <div className="text-2xl font-bold font-heading underline">
          Home page
        </div>

        {/* Muted Text Example */}
        <div className="text-sm font-body">
          This is some muted text to demonstrate contrast and readability.
        </div>

        {/* Monospaced Code Example */}
        <div className="text-sm bg-card font-mono p-2 rounded">
          const example = "This is using the monospace font for code";
        </div>
      </div>
    </div>
  )
}
