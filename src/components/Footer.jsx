import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: '#050505', borderTop: '1px solid rgba(212,175,55,0.1)', padding: '60px 40px 30px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          {/* Brand */}
          <div>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.5rem',
              fontWeight: 900,
              background: 'linear-gradient(90deg, #D4AF37, #F0CC5A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1rem'
            }}>HAIR MASTER KISHOR</h3>
            <p style={{ color: '#888', fontSize: '0.875rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Premium Unisex Salon & Hair Academy in Gandhinagar. Where style meets expertise — transforming looks and building careers since day one.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { href: 'https://www.instagram.com/hair_master_kishor/', icon: '📸', label: 'Instagram' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                  width: '40px', height: '40px',
                  background: 'rgba(212,175,55,0.1)',
                  border: '1px solid rgba(212,175,55,0.2)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  textDecoration: 'none', fontSize: '1.1rem',
                  transition: 'all 0.3s',
                }}>{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '1.2rem' }}>Quick Links</h4>
            {[
              { to: '/', label: 'Home' },
              { to: '/services', label: 'Our Services' },
              { to: '/academy', label: 'Hair Academy' },
              { to: '/gallery', label: 'Gallery' },
              { to: '/contact', label: 'Contact Us' },
              { to: '/enroll', label: '🔥 Enroll 2nd Batch' },
            ].map(l => (
              <Link key={l.to} to={l.to} style={{
                display: 'block',
                color: '#888',
                textDecoration: 'none',
                fontSize: '0.875rem',
                marginBottom: '8px',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.target.style.color = '#D4AF37'}
                onMouseLeave={e => e.target.style.color = '#888'}
              >{l.label}</Link>
            ))}
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '1.2rem' }}>Services</h4>
            {['Haircut (Men & Women)', 'Hair Coloring', 'Highlights', 'Beard Grooming', 'Skin Fade', 'Hair Wash & Blow Dry', 'Bridal Styling', 'Keratin Treatment'].map(s => (
              <p key={s} style={{ color: '#888', fontSize: '0.875rem', marginBottom: '8px' }}>{s}</p>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '1.2rem' }}>Visit Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { icon: '📍', text: '1st Floor, Elixir Prime Business, 120, PDPU Rd, Raysan, Gandhinagar, Gujarat 382007' },
                { icon: '📞', text: '+91 96249 60826' },
                { icon: '🕐', text: 'Open: 8:30 AM – 8:30 PM' },
                { icon: '📸', text: '@hair_master_kishor' },
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: '2px' }}>{c.icon}</span>
                  <span style={{ color: '#888', fontSize: '0.875rem', lineHeight: 1.6 }}>{c.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(212,175,55,0.1)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: '#444', fontSize: '0.8rem' }}>© 2026 Hair Master Kishor. All rights reserved.</p>
          <p style={{ color: '#444', fontSize: '0.8rem' }}>Made with ❤️ in Gandhinagar, Gujarat</p>
        </div>
      </div>
    </footer>
  )
}
