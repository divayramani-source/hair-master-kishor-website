import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/academy', label: 'Academy' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? '10px 40px' : '18px 40px',
        background: scrolled ? 'rgba(10,10,10,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(212,175,55,0.15)' : 'none',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '40px', height: '40px',
            background: 'linear-gradient(135deg, #D4AF37, #F0CC5A)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.2rem', fontWeight: 900, color: '#000',
            fontFamily: "'Playfair Display', serif",
            flexShrink: 0
          }}>K</div>
          <div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: '1.1rem',
              letterSpacing: '1px',
              background: 'linear-gradient(90deg, #D4AF37, #F0CC5A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.1
            }}>HAIR MASTER KISHOR</div>
            <div style={{
              fontSize: '0.55rem',
              letterSpacing: '2px',
              color: '#888',
              textTransform: 'uppercase',
              fontFamily: "'Montserrat', sans-serif"
            }}>Unisex Salon & Academy</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="desktop-nav">
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{
              textDecoration: 'none',
              color: pathname === l.to ? '#D4AF37' : '#ccc',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              fontSize: '0.8rem',
              letterSpacing: '0.5px',
              padding: '8px 14px',
              borderRadius: '50px',
              transition: 'all 0.2s',
              background: pathname === l.to ? 'rgba(212,175,55,0.1)' : 'transparent',
              borderBottom: pathname === l.to ? '2px solid #D4AF37' : '2px solid transparent',
            }}>{l.label}</Link>
          ))}
          <Link to="/enroll" style={{
            textDecoration: 'none',
            background: 'linear-gradient(135deg, #D4AF37, #F0CC5A)',
            color: '#000',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            fontSize: '0.75rem',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            padding: '9px 20px',
            borderRadius: '50px',
            marginLeft: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            animation: 'pulse-gold 2s infinite',
            whiteSpace: 'nowrap',
          }}>
            🔥 Enroll Now
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="hamburger"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'none', flexDirection: 'column', gap: '5px',
            padding: '6px',
          }}
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: 'block', width: '24px', height: '2px',
              background: '#D4AF37', borderRadius: '2px',
              transition: 'all 0.3s',
              transform: open
                ? i === 0 ? 'rotate(45deg) translate(5px,5px)'
                : i === 1 ? 'scaleX(0)'
                : 'rotate(-45deg) translate(5px,-5px)'
                : 'none',
              opacity: open && i === 1 ? 0 : 1
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(10,10,10,0.98)',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        {links.map(l => (
          <Link key={l.to} to={l.to} style={{
            textDecoration: 'none',
            color: pathname === l.to ? '#D4AF37' : '#fff',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: '2rem',
            transition: 'color 0.2s',
          }}>{l.label}</Link>
        ))}
        <Link to="/enroll" style={{
          textDecoration: 'none',
          background: 'linear-gradient(135deg, #D4AF37, #F0CC5A)',
          color: '#000',
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 800,
          fontSize: '1rem',
          padding: '14px 36px',
          borderRadius: '50px',
          marginTop: '1rem',
        }}>🔥 Enroll Now</Link>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
          nav { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>
    </>
  )
}
