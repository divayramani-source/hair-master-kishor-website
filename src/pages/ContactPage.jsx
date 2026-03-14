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

function BookingForm() {
  const [form, setForm] = useState({ name: '', phone: '', service: '', date: '', notes: '' })
  const [submitted, setSubmitted] = useState(false)

  const services = ['Haircut (Men)', 'Haircut (Women)', 'Hair Coloring', 'Beard Grooming', 'Hair Spa', 'Bridal Styling', 'Academy Inquiry', 'Other']

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = `💈 Appointment Request!\n\n👤 Name: ${form.name}\n📞 Phone: ${form.phone}\n✂️ Service: ${form.service}\n📅 Preferred Date: ${form.date || 'Flexible'}\n💬 Notes: ${form.notes || 'None'}\n\n📍 Hair Master Kishor – Gandhinagar`
    window.open(`https://wa.me/919624960905?text=${encodeURIComponent(text)}`, '_blank')
    setSubmitted(true)
  }

  if (submitted) return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: '#D4AF37', marginBottom: '0.75rem' }}>Booking Sent!</h3>
      <p style={{ color: '#888', lineHeight: 1.7, marginBottom: '1.5rem' }}>We'll confirm your appointment via WhatsApp shortly. See you soon!</p>
      <button onClick={() => setSubmitted(false)} className="btn-outline" style={{ cursor: 'pointer' }}>Book Another</button>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {[
        { key: 'name', label: 'Your Name *', type: 'text', placeholder: 'Full name', required: true },
        { key: 'phone', label: 'Phone / WhatsApp *', type: 'tel', placeholder: '+91 XXXXX XXXXX', required: true },
      ].map(f => (
        <div key={f.key}>
          <label style={{ display: 'block', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '0.72rem', letterSpacing: '1px', color: '#D4AF37', marginBottom: '6px', textTransform: 'uppercase' }}>{f.label}</label>
          <input type={f.type} required={f.required} placeholder={f.placeholder} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '10px', padding: '12px 16px', color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', outline: 'none' }} onFocus={e => e.target.style.borderColor = '#D4AF37'} onBlur={e => e.target.style.borderColor = 'rgba(212,175,55,0.2)'} />
        </div>
      ))}
      <div>
        <label style={{ display: 'block', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '0.72rem', letterSpacing: '1px', color: '#D4AF37', marginBottom: '6px', textTransform: 'uppercase' }}>Service *</label>
        <select required value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '10px', padding: '12px 16px', color: form.service ? '#fff' : '#555', fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', outline: 'none', cursor: 'pointer' }} onFocus={e => e.target.style.borderColor = '#D4AF37'} onBlur={e => e.target.style.borderColor = 'rgba(212,175,55,0.2)'}>
          <option value="" disabled>Select a service...</option>
          {services.map(s => <option key={s} value={s} style={{ color: '#fff' }}>{s}</option>)}
        </select>
      </div>
      <div>
        <label style={{ display: 'block', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '0.72rem', letterSpacing: '1px', color: '#D4AF37', marginBottom: '6px', textTransform: 'uppercase' }}>Preferred Date (Optional)</label>
        <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '10px', padding: '12px 16px', color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', outline: 'none', colorScheme: 'dark' }} onFocus={e => e.target.style.borderColor = '#D4AF37'} onBlur={e => e.target.style.borderColor = 'rgba(212,175,55,0.2)'} />
      </div>
      <div>
        <label style={{ display: 'block', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '0.72rem', letterSpacing: '1px', color: '#D4AF37', marginBottom: '6px', textTransform: 'uppercase' }}>Notes (Optional)</label>
        <textarea placeholder="Any special requests or questions?" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={3} style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '10px', padding: '12px 16px', color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', outline: 'none', resize: 'vertical' }} onFocus={e => e.target.style.borderColor = '#D4AF37'} onBlur={e => e.target.style.borderColor = 'rgba(212,175,55,0.2)'} />
      </div>
      <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center', fontSize: '0.95rem', padding: '15px' }}>
        📅 Send Appointment Request
      </button>
    </form>
  )
}

export default function ContactPage() {
  return (
    <div className="page-enter">
      {/* Hero */}
      <section style={{ padding: '140px 40px 80px', background: '#0a0a0a', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 50% 0%, rgba(212,175,55,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <Anim>
          <p className="section-subtitle">Get In Touch</p>
          <h1 className="section-title">Book Your <span className="shimmer-text">Appointment</span></h1>
          <p style={{ color: '#888', maxWidth: '500px', margin: '1rem auto 0', lineHeight: 1.8 }}>
            Ready for a transformation? Reach out via WhatsApp, call us, or fill in the form below. We're open 7 days a week.
          </p>
        </Anim>
      </section>

      {/* Quick contact pills */}
      <section style={{ padding: '0 40px 60px', background: '#0a0a0a' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { icon: '📞', label: 'Call Now', sub: '+91 96249 60905', href: 'tel:+919624960905', color: '#D4AF37' },
            { icon: '💬', label: 'WhatsApp', sub: 'Chat instantly', href: 'https://wa.me/919624960905', color: '#25D366' },
            { icon: '📸', label: 'Instagram', sub: '@hair_master_kishor', href: 'https://www.instagram.com/hair_master_kishor/', color: '#E1306C' },
          ].map((c, i) => (
            <Anim key={i} delay={i * 0.1}>
              <a href={c.href} target={c.href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '14px 24px',
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${c.color}30`,
                borderRadius: '12px',
                textDecoration: 'none',
                transition: 'all 0.3s',
                minWidth: '200px',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = c.color; e.currentTarget.style.background = `${c.color}10` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `${c.color}30`; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
              >
                <span style={{ fontSize: '1.5rem' }}>{c.icon}</span>
                <div>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, color: c.color, fontSize: '0.85rem' }}>{c.label}</div>
                  <div style={{ color: '#777', fontSize: '0.75rem' }}>{c.sub}</div>
                </div>
              </a>
            </Anim>
          ))}
        </div>
      </section>

      {/* Booking form + info */}
      <section style={{ padding: '20px 40px 100px', background: '#0a0a0a' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'start' }}>
          {/* Form */}
          <Anim delay={0.1}>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(212,175,55,0.12)', borderRadius: '20px', padding: '2.5rem' }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 700, marginBottom: '1.75rem', color: '#fff' }}>
                📋 Book an Appointment
              </h2>
              <BookingForm />
            </div>
          </Anim>

          {/* Info */}
          <Anim delay={0.2}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Address */}
              <div style={{ background: 'rgba(212,175,55,0.04)', border: '1px solid rgba(212,175,55,0.12)', borderRadius: '16px', padding: '1.75rem' }}>
                <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, color: '#D4AF37', marginBottom: '1.25rem', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase' }}>📍 Location</h3>
                <p style={{ color: '#ccc', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: '1.25rem' }}>
                  1st Floor, Elixir Prime Business,<br />
                  120, PDPU Road, Raysan,<br />
                  Gandhinagar, Gujarat — 382007
                </p>
                <a href="https://maps.google.com/?q=Elixir+Prime+Business+120+PDPU+Road+Raysan+Gandhinagar+Gujarat" target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  color: '#D4AF37', fontFamily: "'Montserrat', sans-serif", fontWeight: 700,
                  fontSize: '0.8rem', textDecoration: 'none',
                  borderBottom: '1px dashed rgba(212,175,55,0.4)', paddingBottom: '2px',
                }}>
                  🗺️ Get Directions on Google Maps →
                </a>
              </div>

              {/* Hours */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '1.75rem' }}>
                <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, color: '#D4AF37', marginBottom: '1.25rem', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase' }}>🕐 Hours</h3>
                {[
                  { day: 'Monday – Sunday', hours: '8:30 AM – 8:30 PM', open: true },
                ].map((h, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <span style={{ color: '#aaa', fontSize: '0.875rem' }}>{h.day}</span>
                    <span style={{ color: h.open ? '#22c55e' : '#ef4444', fontWeight: 700, fontSize: '0.875rem' }}>{h.hours}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '1rem' }}>
                  <span style={{ width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%', display: 'inline-block', animation: 'blink 1.5s infinite' }} />
                  <span style={{ color: '#22c55e', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '0.8rem' }}>Open Now — Walk-ins Welcome!</span>
                </div>
              </div>

              {/* Map embed placeholder */}
              <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(212,175,55,0.1)', background: '#111' }}>
                <iframe
                  title="Hair Master Kishor Location"
                  width="100%"
                  height="220"
                  style={{ border: 0, display: 'block', filter: 'grayscale(80%) invert(90%) hue-rotate(180deg)' }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.6!2d72.65!3d23.18!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjMuMTgsIDcyLjY1!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
                />
                <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#888', fontSize: '0.8rem' }}>📍 Raysan, Gandhinagar</span>
                  <a href="https://maps.google.com/?q=PDPU+Road+Raysan+Gandhinagar" target="_blank" rel="noopener noreferrer" style={{ color: '#D4AF37', fontSize: '0.75rem', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, textDecoration: 'none' }}>Open Maps →</a>
                </div>
              </div>
            </div>
          </Anim>
        </div>
      </section>

      {/* Academy CTA */}
      <section style={{ padding: '80px 40px', background: '#111', textAlign: 'center' }}>
        <Anim>
          <p className="section-subtitle">Also Interested In</p>
          <h2 className="section-title">Join the <span className="shimmer-text">Academy</span></h2>
          <p style={{ color: '#888', maxWidth: '500px', margin: '1rem auto 1.5rem', lineHeight: 1.8 }}>
            Want to turn your passion into a profession? Enroll in our Men's Haircut Training Course — 2nd batch now open!
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/enroll" className="btn-gold">🎓 Enroll in 2nd Batch</Link>
            <Link to="/academy" className="btn-outline">Learn About Academy</Link>
          </div>
        </Anim>
      </section>
    </div>
  )
}
