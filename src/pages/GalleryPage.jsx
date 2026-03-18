import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

function useInView() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.05 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}
function Anim({ children, delay = 0 }) {
  const [ref, v] = useInView()
  return <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(40px)', transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s` }}>{children}</div>
}

const galleryItems = [
  { type: 'image', src: '/images/salon-1.jpg', title: 'Modern Haircut', category: 'men' },
  { type: 'image', src: '/images/salon-2.jpg', title: 'Expert Styling – Kishor Sen', category: 'women' },
  { type: 'image', src: '/images/salon-4.jpg', title: 'Gorgeous Curls', category: 'women' },
  { type: 'image', src: '/images/salon-5.jpg', title: 'Precision Cut', category: 'men' },
  { type: 'image', src: '/images/salon-6.jpg', title: 'Salon Work', category: 'women' },
  { type: 'image', src: '/images/salon-7.jpg', title: 'Happy Client', category: 'men' },
  { type: 'image', src: '/images/salon-8.jpg', title: 'Bridal Prep', category: 'women' },
  { type: 'image', src: '/images/salon-9.jpg', title: 'Bridal Grooming', category: 'men' },
  { type: 'image', src: '/images/salon-3.jpg', title: 'Groom Styling', category: 'men' },
  { type: 'video', src: '/images/video-1.mp4', title: 'Fade Tutorial', category: 'video', thumb: '/images/salon-1.jpg' },
  { type: 'video', src: '/images/video-2.mp4', title: 'Styling in Action', category: 'video', thumb: '/images/salon-2.jpg' },
  { type: 'image', src: '/images/WhatsAppimg5.jpeg', title: 'Modern Haircut', category: 'men' },
  { type: 'image', src: '/images/WhatsAppimg4.jpeg', title: 'Modern Haircut', category: 'men' },
  { type: 'image', src: '/images/WhatsAppimg3.jpeg', title: 'Modern Haircut', category: 'men' },
  { type: 'image', src: '/images/WhatsApp-Image-1.jpeg', title: 'Modern Haircut', category: 'men' },
  { type: 'image', src: '/images/WhatsApp-Image-2.jpeg', title: 'Modern Haircut', category: 'men' },
  { type: 'video', src: '/images/WhatsApp-Vid-1.mp4', title: 'Styling in Action', category: 'video', thumb: '/images/salon-2.jpg' },
]

const filters = [
  { key: 'all', label: 'All' },
  { key: 'men', label: "Men's" },
  { key: 'women', label: "Women's" },
  { key: 'video', label: '▶ Videos' },
]

export default function GalleryPage() {
  const [filter, setFilter] = useState('all')
  const [lightbox, setLightbox] = useState(null)

  const filtered = filter === 'all' ? galleryItems : galleryItems.filter(i => i.category === filter)

  // Close lightbox on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <div className="page-enter">
      {/* Hero */}
      <section style={{
        padding: '140px 40px 80px',
        background: '#0a0a0a',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 80% at 50% 0%, rgba(212,175,55,0.07) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <Anim>
          <p className="section-subtitle">Our Portfolio</p>
          <h1 className="section-title">The <span className="shimmer-text">Gallery</span></h1>
          <p style={{ color: '#888', maxWidth: '500px', margin: '1rem auto 0', lineHeight: 1.8 }}>
            Every transformation tells a story. Browse our work — from precision fades to stunning bridal styling.
          </p>
        </Anim>
      </section>

      {/* Filters */}
      <section style={{ padding: '0 40px 40px', background: '#0a0a0a', position: 'sticky', top: '70px', zIndex: 99 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', paddingBottom: '1rem', borderBottom: '1px solid rgba(212,175,55,0.08)' }}>
          {filters.map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)} style={{
              background: filter === f.key ? 'linear-gradient(135deg, #D4AF37, #F0CC5A)' : 'rgba(255,255,255,0.04)',
              color: filter === f.key ? '#000' : '#888',
              border: `1px solid ${filter === f.key ? 'transparent' : 'rgba(255,255,255,0.08)'}`,
              borderRadius: '50px',
              padding: '8px 22px',
              cursor: 'pointer',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: '0.8rem',
              letterSpacing: '0.5px',
              transition: 'all 0.2s',
            }}>
              {f.label} {filter === f.key && `(${filtered.length})`}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: '20px 40px 100px', background: '#0a0a0a' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px',
          }}>
            {filtered.map((item, i) => (
              <Anim key={`${filter}-${i}`} delay={i * 0.05}>
                <div
                  onClick={() => setLightbox(item)}
                  style={{
                    position: 'relative',
                    aspectRatio: i % 5 === 0 ? '4/5' : '1',
                    overflow: 'hidden',
                    borderRadius: '14px',
                    cursor: 'pointer',
                    border: '1px solid rgba(212,175,55,0.08)',
                    background: '#111',
                    gridRow: i % 5 === 0 ? 'span 1' : 'span 1',
                  }}
                >
                  {item.type === 'video' ? (
                    <>
                      <img src={item.thumb} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', display: 'block' }} />
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'rgba(0,0,0,0.4)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <div style={{
                          width: '56px', height: '56px',
                          background: 'rgba(212,175,55,0.9)',
                          borderRadius: '50%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '1.3rem', paddingLeft: '4px',
                        }}>▶</div>
                      </div>
                    </>
                  ) : (
                    <img src={item.src} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', display: 'block' }} />
                  )}

                  {/* Hover overlay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
                    opacity: 0,
                    transition: 'opacity 0.3s',
                    display: 'flex', alignItems: 'flex-end', padding: '1rem',
                  }}
                    className="gallery-overlay"
                  >
                    <span style={{ color: '#fff', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '0.85rem' }}>{item.title}</span>
                  </div>
                </div>
              </Anim>
            ))}
          </div>

          {/* Instagram CTA */}
          <Anim delay={0.3}>
            <div style={{
              marginTop: '4rem',
              textAlign: 'center',
              padding: '3rem 2rem',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(212,175,55,0.1)',
              borderRadius: '20px',
            }}>
              <p style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📸</p>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>See More on Instagram</h3>
              <p style={{ color: '#888', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                We post new work daily — follow us for daily inspiration, tips, and behind-the-scenes salon content.
              </p>
              <a href="https://www.instagram.com/hair_master_kishor/" target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'linear-gradient(135deg, #405DE6, #5851DB, #C13584, #E1306C, #FD1D1D, #F56040)',
                color: '#fff',
                padding: '14px 32px',
                borderRadius: '50px',
                textDecoration: 'none',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                fontSize: '0.875rem',
                letterSpacing: '1px',
              }}>
                📸 @hair_master_kishor
              </a>
            </div>
          </Anim>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9998,
            background: 'rgba(0,0,0,0.95)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <button onClick={() => setLightbox(null)} style={{
            position: 'absolute', top: '20px', right: '20px',
            background: 'rgba(212,175,55,0.2)',
            border: '1px solid rgba(212,175,55,0.4)',
            color: '#D4AF37',
            width: '44px', height: '44px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '1.3rem', zIndex: 1,
          }}>✕</button>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '90vh', position: 'relative' }}>
            {lightbox.type === 'video' ? (
              <video src={lightbox.src} controls autoPlay style={{ maxWidth: '90vw', maxHeight: '85vh', borderRadius: '12px' }} />
            ) : (
              <img src={lightbox.src} alt={lightbox.title} style={{ maxWidth: '90vw', maxHeight: '85vh', borderRadius: '12px', display: 'block', objectFit: 'contain' }} />
            )}
            <p style={{ textAlign: 'center', marginTop: '12px', color: '#D4AF37', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '0.875rem' }}>{lightbox.title}</p>
          </div>
        </div>
      )}

      <style>{`
        div:hover > .gallery-overlay { opacity: 1 !important; }
        div:hover > img { transform: scale(1.06); }
      `}</style>
    </div>
  )
}
