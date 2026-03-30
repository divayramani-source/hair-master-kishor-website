import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function useInView() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}
function Anim({ children, delay = 0 }) {
  const [ref, v] = useInView()
  return <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(40px)', transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>{children}</div>
}

const categories = [
  {
    title: "Men's Services",
    icon: '💈',
    color: '#D4AF37',
    services: [
      { name: 'Classic Haircut', time: '20 min', desc: 'Precision cut styled to your preference.' },
      { name: 'Modern Fade Cut', time: '25 min', desc: 'Sharp, clean fade from skin to length.' },
      { name: 'Skin Fade', time: '30 min', desc: 'Razored skin fade for the sharpest look.' },
      { name: 'Beard Trim & Shape', time: '15 min', desc: 'Line up, shape, and trim your beard.' },
      { name: 'Hair + Beard Combo', time: '45 min', desc: 'Complete grooming package for men.' },
      { name: 'Head Shave', time: '20 min', desc: 'Clean, smooth head shave with razor finish.' },
    ]
  },
  {
    title: "Women's Services",
    icon: '💇‍♀️',
    color: '#e879a0',
    services: [
      { name: 'Haircut with Wash', time: '40 min', desc: 'Expert cut styled to your face shape.' },
      { name: 'Blow Dry & Style', time: '45 min', desc: 'Voluminous blow-out or sleek finish.' },
      { name: 'Deep Conditioning', time: '60 min', desc: 'Restore shine, softness & health.' },
      { name: 'Bridal Hair', price: 'On request', time: '90+ min', desc: 'Look stunning on your special day.' },
      { name: 'Keratin Treatment', price: 'On request', time: '120 min', desc: 'Smooth, frizz-free hair for months.' },
      { name: 'Henna Treatment', time: '60 min', desc: 'Natural strengthening & color.' },
    ]
  },
  {
    title: 'Hair Coloring',
    icon: '🎨',
    color: '#a78bfa',
    services: [
      { name: 'Global Color', time: '90 min', desc: 'Full head single-color transformation.' },
      { name: 'Highlights', time: '120 min', desc: 'Foil or freehand highlights.' },
      { name: 'Balayage', time: '150 min', desc: 'Hand-painted natural gradient look.' },
      { name: 'Ombre / Sombre', time: '120 min', desc: 'Seamless dark-to-light fade.' },
      { name: 'Fashion Colors', time: '180 min', desc: 'Bold: red, blue, platinum & more.' },
      { name: 'Root Touch-Up', time: '60 min', desc: 'Seamless regrowth blending.' },
    ]
  },
  {
    title: 'Treatments & Spa',
    icon: '✨',
    color: '#34d399',
    services: [
      { name: 'Hair Spa', time: '60 min', desc: 'Deep nourishment & scalp massage.' },
      { name: 'Scalp Treatment', time: '45 min', desc: 'Target dandruff, dryness & hair fall.' },
      { name: 'Protein Treatment', time: '75 min', desc: 'Rebuild strength and reduce breakage.' },
      { name: 'Steam Treatment', time: '30 min', desc: 'Opens cuticles for deep penetration.' },
      { name: 'Oiling Massage', time: '20 min', desc: 'Relaxing hot oil head massage.' },
      { name: 'Dandruff Control', time: '45 min', desc: 'Medicated treatment for healthy scalp.' },
    ]
  },
]

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [hoveredCard, setHoveredCard] = useState(null)

  return (
    <div className="page-enter">
      {/* Hero */}
      <section style={{
        padding: '140px 40px 80px',
        background: 'linear-gradient(160deg, #0a0a0a 0%, #111 100%)',
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
          <p className="section-subtitle">Premium Care</p>
          <h1 className="section-title">Our <span className="shimmer-text">Services</span></h1>
          <p style={{ color: '#888', maxWidth: '500px', margin: '1rem auto 0', lineHeight: 1.8 }}>
            Expert styling for men, women & everyone in between. Every service uses premium products and hygiene-first practices.
          </p>
        </Anim>
      </section>

      {/* Tab selector */}
      <section style={{ padding: '0 40px', background: '#0a0a0a', position: 'sticky', top: '70px', zIndex: 100, borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', gap: '0', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {categories.map((c, i) => (
            <button key={i} onClick={() => setActiveTab(i)} style={{
              background: 'none', border: 'none',
              cursor: 'pointer',
              padding: '18px 24px',
              color: activeTab === i ? c.color : '#666',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: '0.8rem',
              letterSpacing: '0.5px',
              borderBottom: activeTab === i ? `3px solid ${c.color}` : '3px solid transparent',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <span>{c.icon}</span> {c.title}
            </button>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ padding: '60px 40px 100px', background: '#0a0a0a' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Anim>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {categories[activeTab].services.map((s, i) => (
                <div key={i}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    background: hoveredCard === i ? 'rgba(212,175,55,0.05)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${hoveredCard === i ? categories[activeTab].color + '50' : 'rgba(255,255,255,0.06)'}`,
                    borderRadius: '16px',
                    padding: '1.75rem',
                    transition: 'all 0.3s ease',
                    transform: hoveredCard === i ? 'translateY(-5px)' : 'translateY(0)',
                    animation: `fadeInUp 0.4s ease ${i * 0.06}s both`,
                  }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 700, color: '#fff', flex: 1, paddingRight: '1rem' }}>{s.name}</h3>
                    <span style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 800,
                      color: categories[activeTab].color,
                      fontSize: '0.95rem',
                      whiteSpace: 'nowrap'
                    }}>{s.price}</span>
                  </div>
                  <p style={{ color: '#777', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>{s.desc}</p>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                    color: '#555', fontSize: '0.75rem',
                    fontFamily: "'Montserrat', sans-serif", fontWeight: 600
                  }}>⏱ {s.time}</span>
                </div>
              ))}
            </div>
          </Anim>

          {/* Note */}
          <Anim delay={0.3}>
            <div style={{
              marginTop: '3rem',
              padding: '1.5rem 2rem',
              background: 'rgba(212,175,55,0.05)',
              border: '1px solid rgba(212,175,55,0.15)',
              borderRadius: '12px',
              display: 'flex', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap'
            }}>
              <span style={{ fontSize: '1.5rem' }}>ℹ️</span>
              <p style={{ color: '#aaa', fontSize: '0.875rem', lineHeight: 1.7, flex: 1, minWidth: '200px' }}>
                <strong style={{ color: '#D4AF37' }}>Prices may vary</strong> based on hair length, product used, and customization. All prices are starting rates. Please call or WhatsApp for exact pricing and to book your appointment.
              </p>
              <a href="tel:+919624960905" className="btn-gold" style={{ flexShrink: 0 }}>📞 Book Now</a>
            </div>
          </Anim>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: '100px 40px', background: '#111' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Anim>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <p className="section-subtitle">Why Us</p>
              <h2 className="section-title">The <span className="shimmer-text">Hair Master</span> Difference</h2>
            </div>
          </Anim>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
            {[
              { icon: '🏆', title: 'Expert Hands', desc: '8+ years of experience in cutting, styling & coloring for all hair types.' },
              { icon: '🧴', title: 'Premium Products', desc: 'Only top-grade, trusted products used — safe for all hair & scalp types.' },
              { icon: '🧼', title: 'Hygiene First', desc: 'Sanitised tools, fresh towels, and a clean workspace — every single time.' },
              { icon: '💯', title: 'Satisfaction Guaranteed', desc: 'Not happy? We fix it. Your satisfaction is our top priority.' },
            ].map((f, i) => (
              <Anim key={i} delay={i * 0.1}>
                <div style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem', animation: `float ${2.5 + i * 0.3}s ease-in-out infinite` }}>{f.icon}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, color: '#D4AF37', marginBottom: '0.5rem' }}>{f.title}</h3>
                  <p style={{ color: '#777', fontSize: '0.875rem', lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 40px', textAlign: 'center' }}>
        <Anim>
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>Ready to Look <span className="shimmer-text">Amazing?</span></h2>
          <p style={{ color: '#888', marginBottom: '2rem', lineHeight: 1.8 }}>Walk in anytime or book in advance. We're open 7 days a week.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://wa.me/919624960905?text=Hi%2C%20I%20want%20to%20book%20an%20appointment" target="_blank" rel="noopener noreferrer" className="btn-gold">💬 WhatsApp to Book</a>
            <Link to="/gallery" className="btn-outline">View Our Work</Link>
          </div>
        </Anim>
      </section>
    </div>
  )
}
