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
function Anim({ children, delay = 0, style = {} }) {
  const [ref, v] = useInView()
  return <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(40px)', transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, ...style }}>{children}</div>
}

/* Countdown timer */
function Countdown() {
  const target = new Date()
  target.setDate(target.getDate() + 7)
  target.setHours(23, 59, 59)

  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 })
  useEffect(() => {
    const tick = () => {
      const diff = target - Date.now()
      if (diff <= 0) return
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
      {[
        { val: time.d, label: 'Days' },
        { val: time.h, label: 'Hours' },
        { val: time.m, label: 'Mins' },
        { val: time.s, label: 'Secs' },
      ].map(({ val, label }) => (
        <div key={label} style={{
          background: 'rgba(212,175,55,0.1)',
          border: '1px solid rgba(212,175,55,0.3)',
          borderRadius: '12px',
          padding: '16px 20px',
          minWidth: '70px',
          textAlign: 'center',
        }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '2.2rem', color: '#D4AF37', lineHeight: 1 }}>
            {String(val).padStart(2, '0')}
          </div>
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '0.65rem', letterSpacing: '2px', color: '#666', marginTop: '4px', textTransform: 'uppercase' }}>
            {label}
          </div>
        </div>
      ))}
    </div>
  )
}

/* Enrollment form */
function EnrollForm() {
  const [form, setForm] = useState({ name: '', phone: '', city: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = `🎓 New Enrollment Request!\n\n👤 Name: ${form.name}\n📞 Phone: ${form.phone}\n📍 City: ${form.city}\n💬 Message: ${form.message || 'N/A'}\n\n✂️ Hair Master Kishor Academy – 2nd Batch`
    window.open(`https://wa.me/919624960826?text=${encodeURIComponent(text)}`, '_blank')
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 2rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: '#D4AF37', marginBottom: '1rem' }}>
          You're on your way!
        </h3>
        <p style={{ color: '#aaa', lineHeight: 1.8, marginBottom: '1.5rem' }}>
          Your enrollment request has been sent via WhatsApp. Kishor sir will confirm your spot shortly!
        </p>
        <button onClick={() => setSubmitted(false)} className="btn-outline" style={{ cursor: 'pointer' }}>
          Submit Another Request
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      {[
        { key: 'name', label: 'Full Name *', type: 'text', placeholder: 'Your full name', required: true },
        { key: 'phone', label: 'Phone / WhatsApp *', type: 'tel', placeholder: '+91 XXXXX XXXXX', required: true },
        { key: 'city', label: 'Your City / District', type: 'text', placeholder: 'Where are you from?', required: false },
      ].map(f => (
        <div key={f.key}>
          <label style={{ display: 'block', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '0.75rem', letterSpacing: '1px', color: '#D4AF37', marginBottom: '6px', textTransform: 'uppercase' }}>
            {f.label}
          </label>
          <input
            type={f.type}
            required={f.required}
            placeholder={f.placeholder}
            value={form[f.key]}
            onChange={e => setForm({ ...form, [f.key]: e.target.value })}
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(212,175,55,0.2)',
              borderRadius: '10px',
              padding: '12px 16px',
              color: '#fff',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.9rem',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = '#D4AF37'}
            onBlur={e => e.target.style.borderColor = 'rgba(212,175,55,0.2)'}
          />
        </div>
      ))}
      <div>
        <label style={{ display: 'block', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '0.75rem', letterSpacing: '1px', color: '#D4AF37', marginBottom: '6px', textTransform: 'uppercase' }}>
          Message (Optional)
        </label>
        <textarea
          placeholder="Any questions or special requirements?"
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          rows={3}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(212,175,55,0.2)',
            borderRadius: '10px',
            padding: '12px 16px',
            color: '#fff',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.9rem',
            outline: 'none',
            resize: 'vertical',
            transition: 'border-color 0.2s',
          }}
          onFocus={e => e.target.style.borderColor = '#D4AF37'}
          onBlur={e => e.target.style.borderColor = 'rgba(212,175,55,0.2)'}
        />
      </div>
      <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '16px', marginTop: '0.5rem' }}>
        🚀 Send Enrollment via WhatsApp
      </button>
      <p style={{ color: '#555', fontSize: '0.75rem', textAlign: 'center', lineHeight: 1.6 }}>
        This will open WhatsApp with your details pre-filled. We'll confirm your seat within 24 hours.
      </p>
    </form>
  )
}

export default function EnrollPage() {
  return (
    <div className="page-enter">
      {/* HERO */}
      <section style={{
        padding: '100px 40px 60px',
        background: 'linear-gradient(160deg, #0a0a0a 0%, #0d0500 60%, #0a0a0a 100%)',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        {/* Animated background particles */}
        {['✂️','💈','⭐','✨','🎓','💇'].map((icon, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: `${5 + i * 15}%`,
            left: `${i % 2 === 0 ? 3 + i * 12 : 88 - i * 8}%`,
            fontSize: `${1.2 + i % 2}rem`,
            opacity: 0.06,
            animation: `float ${3 + i * 0.7}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
            pointerEvents: 'none',
          }}>{icon}</div>
        ))}

        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Urgent badges */}
          <Anim>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <span className="badge-urgent">
                <span className="dot" />
                🚨 2nd Batch Starting Soon
              </span>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                background: 'rgba(212,175,55,0.1)',
                border: '1px solid rgba(212,175,55,0.3)',
                color: '#D4AF37',
                padding: '6px 14px',
                borderRadius: '50px',
                fontSize: '0.75rem',
                fontWeight: 700,
                fontFamily: "'Montserrat', sans-serif",
                letterSpacing: '1px',
              }}>⚡ Limited Seats Available</span>
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: '1rem',
            }}>
              Enroll in the <span className="shimmer-text">2nd Batch</span><br />
              <span style={{ color: '#fff' }}>Men's Haircut</span> Course
            </h1>

            <p style={{ color: '#aaa', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              ✂️ <strong style={{ color: '#fff' }}>Basic to Advanced</strong> training by <strong style={{ color: '#D4AF37' }}>Hair Master Kishor Sen</strong><br />
              📍 Gandhinagar, PDPU Road · Free Meals · Free Stay · Certificate
            </p>

            {/* Countdown */}
            <div style={{ marginBottom: '2rem' }}>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '0.7rem', letterSpacing: '3px', color: '#D4AF37', marginBottom: '1rem', textTransform: 'uppercase' }}>
                Enrollment Closes In
              </p>
              <Countdown />
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#enroll-form" className="btn-gold" style={{ fontSize: '1.05rem', padding: '16px 40px' }}>
                🎓 Enroll Now — Scroll Down
              </a>
              <a href="https://wa.me/919624960826?text=Hi%2C%20I%20want%20to%20enroll%20in%20the%202nd%20batch!" target="_blank" rel="noopener noreferrer" className="btn-outline">
                💬 WhatsApp Directly
              </a>
            </div>
          </Anim>
        </div>
      </section>

      {/* WHAT YOU LEARN */}
      <section style={{ padding: '80px 40px', background: '#0a0a0a' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Anim>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <p className="section-subtitle">Course Content</p>
              <h2 className="section-title">Everything You'll <span className="shimmer-text">Master</span></h2>
            </div>
          </Anim>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            {[
              { icon: '✂️', text: 'Classic & Modern Haircuts' },
              { icon: '🔥', text: 'Fade, Skin Fade & Taper' },
              { icon: '🪒', text: 'Beard Cutting & Shaping' },
              { icon: '🎨', text: 'Face Cuts, Coloring & Highlights' },
              { icon: '📐', text: 'Clipper-Over-Comb & Texturizing' },
              { icon: '💫', text: 'Trending Hairstyles 2025' },
              { icon: '👥', text: 'Real Client Practice' },
              { icon: '🧼', text: 'Salon Hygiene & Tools' },
              { icon: '🤝', text: 'Professional Behavior' },
              { icon: '📱', text: 'Social Media for Barbers' },
              { icon: '📜', text: 'Certificate on Completion' },
              { icon: '💼', text: 'Career Guidance & Placement' },
            ].map((item, i) => (
              <Anim key={i} delay={i * 0.04}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '1rem 1.25rem',
                  background: 'rgba(212,175,55,0.04)',
                  border: '1px solid rgba(212,175,55,0.1)',
                  borderRadius: '12px',
                  transition: 'all 0.3s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.35)'; e.currentTarget.style.background = 'rgba(212,175,55,0.08)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.1)'; e.currentTarget.style.background = 'rgba(212,175,55,0.04)' }}
                >
                  <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ color: '#ddd', fontSize: '0.9rem', fontWeight: 600, fontFamily: "'Montserrat', sans-serif" }}>{item.text}</span>
                </div>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      {/* PERKS BANNER */}
      <section style={{
        padding: '60px 40px',
        background: 'linear-gradient(135deg, #0f0900 0%, #1a1200 50%, #0f0900 100%)',
        borderTop: '1px solid rgba(212,175,55,0.1)',
        borderBottom: '1px solid rgba(212,175,55,0.1)',
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Anim>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem', textAlign: 'center' }}>
              {[
                { icon: '🍽️', title: 'Free Meals', sub: 'Breakfast, Lunch & Dinner' },
                { icon: '🏠', title: 'Free Stay', sub: 'For outstation students' },
                { icon: '📜', title: 'Certificate', sub: 'After completion' },
                { icon: '📱', title: 'Social Media', sub: 'Build your brand' },
                { icon: '💼', title: 'Job Help', sub: 'Career placement support' },
              ].map((p, i) => (
                <div key={i}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem', animation: `float ${2.5 + i * 0.3}s ease-in-out infinite` }}>{p.icon}</div>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: '0.9rem', color: '#D4AF37', marginBottom: '4px' }}>{p.title}</div>
                  <div style={{ color: '#666', fontSize: '0.75rem' }}>{p.sub}</div>
                </div>
              ))}
            </div>
          </Anim>
        </div>
      </section>

      {/* ENROLL FORM + INFO */}
      <section id="enroll-form" style={{ padding: '100px 40px', background: '#0a0a0a' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Anim>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <p className="section-subtitle">Secure Your Spot</p>
              <h2 className="section-title">Enroll in the <span className="shimmer-text">2nd Batch</span></h2>
            </div>
          </Anim>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'start' }}>
            {/* Form */}
            <Anim delay={0.1}>
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(212,175,55,0.15)',
                borderRadius: '20px',
                padding: '2.5rem',
              }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#fff' }}>
                  📋 Enrollment Form
                </h3>
                <EnrollForm />
              </div>
            </Anim>

            {/* Info */}
            <Anim delay={0.2}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Contact block */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(212,175,55,0.04))',
                  border: '1px solid rgba(212,175,55,0.2)',
                  borderRadius: '16px',
                  padding: '1.75rem',
                }}>
                  <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, color: '#D4AF37', marginBottom: '1.25rem', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    📞 Contact Directly
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <a href="tel:+919624960826" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: '#fff', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#D4AF37'}
                      onMouseLeave={e => e.currentTarget.style.color = '#fff'}
                    >
                      <span style={{ fontSize: '1.5rem' }}>📞</span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Call Us</div>
                        <div style={{ color: '#888', fontSize: '0.8rem' }}>+91 96249 60826</div>
                      </div>
                    </a>
                    <a href="https://wa.me/919624960826?text=Hi%20I%20want%20to%20enroll%20in%20your%202nd%20batch!" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: '#fff', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#25D366'}
                      onMouseLeave={e => e.currentTarget.style.color = '#fff'}
                    >
                      <span style={{ fontSize: '1.5rem' }}>💬</span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>WhatsApp</div>
                        <div style={{ color: '#888', fontSize: '0.8rem' }}>Chat instantly</div>
                      </div>
                    </a>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <span style={{ fontSize: '1.5rem' }}>📍</span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fff' }}>Location</div>
                        <div style={{ color: '#888', fontSize: '0.8rem', lineHeight: 1.6 }}>1st Floor, Elixir Prime Business,<br />120 PDPU Rd, Raysan,<br />Gandhinagar, Gujarat 382007</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Instagram post reference */}
                <div style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '16px',
                  padding: '1.75rem',
                }}>
                  <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, color: '#fff', marginBottom: '1rem', fontSize: '0.875rem' }}>
                    📸 See It on Instagram
                  </h3>
                  <p style={{ color: '#888', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                    Follow us on Instagram to see student transformations, latest work, and course updates!
                  </p>
                  <a href="https://www.instagram.com/hair_master_kishor/" target="_blank" rel="noopener noreferrer" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    background: 'linear-gradient(135deg, #405DE6, #C13584, #E1306C)',
                    color: '#fff',
                    padding: '10px 20px',
                    borderRadius: '50px',
                    textDecoration: 'none',
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.8rem',
                  }}>
                    📸 @hair_master_kishor
                  </a>
                </div>

                {/* Urgency box */}
                <div style={{
                  background: 'rgba(229,62,62,0.08)',
                  border: '1px solid rgba(229,62,62,0.25)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  display: 'flex', gap: '12px', alignItems: 'flex-start',
                }}>
                  <span style={{ fontSize: '1.5rem' }}>🔥</span>
                  <div>
                    <div style={{ fontWeight: 700, color: '#fc8181', marginBottom: '4px', fontFamily: "'Montserrat', sans-serif", fontSize: '0.875rem' }}>
                      Seats Filling Fast!
                    </div>
                    <p style={{ color: '#aaa', fontSize: '0.825rem', lineHeight: 1.7 }}>
                      We keep batches small for quality. Once the 2nd batch fills up, you'll have to wait for the 3rd. Don't miss out — enroll today!
                    </p>
                  </div>
                </div>
              </div>
            </Anim>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section style={{ padding: '80px 40px', background: '#111', textAlign: 'center' }}>
        <Anim>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <p style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💬</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontStyle: 'italic', color: '#fff', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              "The training course changed my life. I came with zero experience and left with a professional skill and my own client base. Kishor sir's guidance is unmatched."
            </p>
            <div style={{ color: '#D4AF37', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '0.875rem' }}>
              ⭐⭐⭐⭐⭐ — Rahul, 1st Batch Graduate
            </div>
          </div>
        </Anim>
      </section>
    </div>
  )
}
