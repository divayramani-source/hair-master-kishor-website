import React, { useEffect, useState } from 'react'

export default function Loader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100 }
        return p + Math.random() * 15
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#0a0a0a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 99999,
    }}>
      {/* Scissors animation */}
      <div style={{ fontSize: '4rem', animation: 'scissors 0.8s ease-in-out infinite', marginBottom: '2rem' }}>✂️</div>

      {/* Brand name */}
      <h1 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(1.8rem, 5vw, 3rem)',
        fontWeight: 900,
        background: 'linear-gradient(90deg, #D4AF37 0%, #F0CC5A 50%, #D4AF37 100%)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'shimmer 2s linear infinite',
        marginBottom: '0.5rem',
        letterSpacing: '2px'
      }}>
        HAIR MASTER KISHOR
      </h1>
      <p style={{
        fontFamily: "'Montserrat', sans-serif",
        color: '#888',
        letterSpacing: '4px',
        fontSize: '0.7rem',
        textTransform: 'uppercase',
        marginBottom: '2.5rem'
      }}>Unisex Salon & Academy</p>

      {/* Progress bar */}
      <div style={{ width: '200px', height: '3px', background: '#222', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${Math.min(progress, 100)}%`,
          background: 'linear-gradient(90deg, #D4AF37, #F0CC5A)',
          borderRadius: '2px',
          transition: 'width 0.1s ease'
        }} />
      </div>
    </div>
  )
}
