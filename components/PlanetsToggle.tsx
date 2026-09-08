'use client'

import { useState } from 'react'

export default function PlanetsToggle() {
  const [visible, setVisible] = useState(true)

  const toggle = () => {
    const next = !visible
    setVisible(next)
    if (next) {
      delete document.documentElement.dataset.planets
    } else {
      document.documentElement.dataset.planets = 'hidden'
    }
  }

  return (
    <button
      onClick={toggle}
      title={visible ? 'Masquer les planètes' : 'Afficher les planètes'}
      className="fixed bottom-6 right-6 z-50 glass border border-white/20 rounded-full w-11 h-11 flex items-center justify-center text-lg transition-all duration-300 hover:border-purple-500/50 hover:scale-110"
      style={{ backdropFilter: 'blur(12px)' }}
    >
      {visible ? '🪐' : '⭐'}
    </button>
  )
}
