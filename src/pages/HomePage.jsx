import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

/* ── tiny hook: animate when element enters viewport ── */
function useInView() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, visible]
}

function AnimatedSection({ children, delay = 0 }) {
  const [ref, visible] = useInView()
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(50px)',
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>{children}</div>
  )
}

const stats = [
  { number: '500+', label: 'Happy Clients' },
  { number: '20+', label: 'Years Experience' },
  { number: '50+', label: 'Students Trained' },
  { number: '4.9★', label: 'Average Rating' },
]

const services = [
  { icon: '✂️', title: 'Haircut (Men)', desc: 'Classic, modern & trending cuts tailored for you.' },
  { icon: '💇‍♀️', title: 'Haircut (Women)', desc: 'Expert cuts with precision & style — from bobs to layers.' },
  { icon: '🎨', title: 'Hair Coloring', desc: 'Global color, highlights, balayage & ombre.' },
  { icon: '🪒', title: 'Beard Grooming', desc: 'Shape, trim & fade your beard to perfection.' },
  { icon: '💆', title: 'Hair Spa & Wash', desc: 'Deep conditioning & blow-dry for silky smooth hair.' },
  { icon: '👑', title: 'Bridal Styling', desc: 'Look your best on the most important day of your life.' },
]

const testimonials = [
  { name: 'Raj Patel', role: 'Regular Client', text: 'Best haircut I\'ve ever had in Gandhinagar! Kishor bhai understands exactly what you want. The fade is always on point.', stars: 5 },
  { name: 'Priya Shah', role: 'Happy Customer', text: 'Got highlights done here and I am absolutely in love! Very hygienic and professional environment. Will definitely come back!', stars: 5 },
  { name: 'Arjun Mehta', role: 'Academy Graduate', text: 'The training course changed my life. Kishor sir\'s teaching method is incredible — practical, detailed and industry-ready.', stars: 5 },
]

export default function HomePage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [countedStats, setCountedStats] = useState([0, 0, 0, 0])
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef(null)
  const videoRef = useRef(null)

  /* parallax */
  useEffect(() => {
    const move = e => setMousePos({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 })
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  /* counter animation */
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStatsVisible(true); observer.disconnect() }
    }, { threshold: 0.3 })
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!statsVisible) return
    const targets = [500, 20, 50, 4.9]
    const duration = 1500
    const steps = 60
    let step = 0
    const interval = setInterval(() => {
      step++
      setCountedStats(targets.map(t => parseFloat((t * (step / steps)).toFixed(1))))
      if (step >= steps) clearInterval(interval)
    }, duration / steps)
    return () => clearInterval(interval)
  }, [statsVisible])

  const statDisplay = (val, i) => {
    if (i === 3) return `${Math.min(val, 4.9).toFixed(1)}★`
    return `${Math.floor(Math.min(val, [500, 20, 50][i]))}+`
  }

  return (
    <div className="page-enter">
      {/* ─── HERO ─── */}
      <section style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #0a0a0a 0%, #111 60%, #0d0d0d 100%)',
      }}>
        {/* Background image with parallax */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/background-img.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px) scale(1.06)`,
          transition: 'transform 0.1s ease',
          opacity: 0.22,
          filter: 'saturate(0.4)',
        }} />

        {/* Gold radial glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 60% at 70% 50%, rgba(212,175,55,0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        {/* Animated scissor particles */}
        {['✂️','💈','✨','⭐','✂️','💈'].map((icon, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: `${10 + i * 15}%`,
            left: `${5 + i * 16}%`,
            fontSize: `${1 + (i % 3) * 0.5}rem`,
            opacity: 0.07 + (i % 3) * 0.03,
            animation: `float ${3 + i * 0.7}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
            pointerEvents: 'none',
            userSelect: 'none',
          }}>{icon}</div>
        ))}

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '120px 40px 80px', width: '100%' }}>
          <div style={{ maxWidth: '700px' }}>
            {/* Urgent badge */}
            <div style={{ marginBottom: '1.5rem', animation: 'fadeInUp 0.6s ease' }}>
              <span className="badge-urgent">
                <span className="dot" />
                🔥 2nd Batch Now Open – Limited Seats
              </span>
            </div>

            <p className="section-subtitle" style={{ animation: 'fadeInUp 0.6s ease 0.1s both' }}>
              Gandhinagar's Premier
            </p>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              marginBottom: '1.5rem',
              animation: 'fadeInUp 0.7s ease 0.2s both',
            }}>
              <span className="shimmer-text">Hair Master</span><br />
              <span style={{ color: '#fff' }}>Kishor</span>
            </h1>

            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
              color: '#D4AF37',
              fontStyle: 'italic',
              marginBottom: '1rem',
              animation: 'fadeInUp 0.7s ease 0.3s both',
            }}>
              Unisex Salon & Academy — Where Style Meets Mastery
            </p>

            <p style={{
              color: '#999',
              fontSize: '1rem',
              lineHeight: 1.8,
              maxWidth: '520px',
              marginBottom: '2.5rem',
              animation: 'fadeInUp 0.7s ease 0.4s both',
            }}>
              Premium haircuts, coloring, and styling for everyone — plus professional training courses to launch your career in the beauty industry.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', animation: 'fadeInUp 0.7s ease 0.5s both' }}>
              <Link to="/contact" className="btn-gold">
                📅 Book Appointment
              </Link>
              <Link to="/enroll" className="btn-outline">
                🎓 Join Academy
              </Link>
            </div>

            {/* Open hours chip */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '50px',
              padding: '8px 16px',
              marginTop: '2rem',
              animation: 'fadeInUp 0.7s ease 0.6s both',
            }}>
              <span style={{ width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%', display: 'inline-block', animation: 'blink 1.5s infinite' }} />
              <span style={{ color: '#aaa', fontSize: '0.8rem', fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}>Open Today · 8:30 AM – 8:30 PM</span>
            </div>
          </div>
        </div>

        {/* Floating hero card */}
        <div style={{
          position: 'absolute',
          right: '5%',
          top: '50%',
          transform: `translateY(-50%) translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
          transition: 'transform 0.15s ease',
          display: 'none',
        }} className="hero-card">
          <div style={{
            background: 'rgba(20,20,20,0.9)',
            border: '1px solid rgba(212,175,55,0.2)',
            borderRadius: '20px',
            padding: '24px',
            backdropFilter: 'blur(20px)',
            width: '260px',
          }}>
            <img src="/images/salon-2.jpg" alt="Salon" style={{ width: '100%', borderRadius: '12px', marginBottom: '16px', aspectRatio: '4/3', objectFit: 'cover' }} />
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '0.8rem', color: '#D4AF37', marginBottom: '4px' }}>HAIR MASTER KISHOR</p>
            <p style={{ color: '#888', fontSize: '0.75rem' }}>Gandhinagar, Gujarat</p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          animation: 'float 2s ease-in-out infinite',
        }}>
          <span style={{ color: '#555', fontSize: '0.7rem', letterSpacing: '2px', fontFamily: "'Montserrat', sans-serif", textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(180deg, #D4AF37, transparent)' }} />
        </div>

        <style>{`@media(min-width:1100px){.hero-card{display:block!important}}`}</style>
      </section>

      {/* ─── MARQUEE STRIP ─── */}
      <div style={{ background: '#D4AF37', padding: '14px 0', overflow: 'hidden' }}>
        <div className="marquee-track">
          {Array(6).fill(['✂️ Premium Haircuts', '💈 Expert Beard Grooming', '🎨 Hair Coloring', '👑 Bridal Styling', '🎓 Professional Training', '⭐ Certified Courses']).flat().map((t, i) => (
            <span key={i} style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800,
              fontSize: '0.75rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: '#000',
              padding: '0 32px',
              whiteSpace: 'nowrap',
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ─── STATS ─── */}
      <section ref={statsRef} style={{ padding: '80px 40px', background: '#0d0d0d' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                padding: '2rem',
                background: 'rgba(212,175,55,0.04)',
                border: '1px solid rgba(212,175,55,0.12)',
                borderRadius: '16px',
                transition: 'all 0.3s',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'
                  e.currentTarget.style.transform = 'translateY(-5px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(212,175,55,0.12)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '3rem',
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #D4AF37, #F0CC5A)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1,
                  marginBottom: '8px',
                }}>
                  {statsVisible ? statDisplay(countedStats[i], i) : s.number}
                </div>
                <div style={{ color: '#888', fontFamily: "'Montserrat', sans-serif", fontSize: '0.8rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section style={{ padding: '100px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem', alignItems: 'center' }}>
          {/* Images grid */}
          <AnimatedSection>
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <img src="/images/salon-2.jpg" alt="Kishor at work" style={{
                  width: '100%', aspectRatio: '3/4', objectFit: 'cover',
                  borderRadius: '16px', gridRow: 'span 2',
                  border: '2px solid rgba(212,175,55,0.15)'
                }} />
                <img src="/images/salon-4.jpg" alt="Hair styling" style={{
                  width: '100%', aspectRatio: '4/3', objectFit: 'cover',
                  borderRadius: '12px', border: '2px solid rgba(212,175,55,0.1)'
                }} />
                <img src="/images/salon-7.jpg" alt="Happy client" style={{
                  width: '100%', aspectRatio: '4/3', objectFit: 'cover',
                  borderRadius: '12px', border: '2px solid rgba(212,175,55,0.1)'
                }} />
              </div>
              {/* Badge overlay */}
              <div style={{
                position: 'absolute', bottom: '-20px', right: '-20px',
                background: 'linear-gradient(135deg, #D4AF37, #F0CC5A)',
                color: '#000',
                borderRadius: '16px',
                padding: '16px 20px',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: '1.1rem',
                textAlign: 'center',
                boxShadow: '0 10px 40px rgba(212,175,55,0.3)',
              }}>
                <div style={{ fontSize: '2rem', lineHeight: 1 }}>8+</div>
                <div style={{ fontSize: '0.65rem', fontFamily: "'Montserrat', sans-serif", letterSpacing: '1px', marginTop: '4px' }}>YEARS<br/>MASTERY</div>
              </div>
            </div>
          </AnimatedSection>

          {/* Text */}
          <AnimatedSection delay={0.2}>
            <p className="section-subtitle">About Us</p>
            <h2 className="section-title">
              Meet <span className="gold-text">Kishor Sen</span> — The Hair Master
            </h2>
            <div className="divider-gold" />
            <p style={{ color: '#aaa', lineHeight: 1.9, marginBottom: '1.2rem' }}>
              Kishor Sen is Gandhinagar's most trusted hair artist — a passionate professional with over 8 years of hands-on experience. His salon, <strong style={{ color: '#D4AF37' }}>Hair Master Kishor</strong>, is a welcoming space for everyone: men, women, and children.
            </p>
            <p style={{ color: '#aaa', lineHeight: 1.9, marginBottom: '2rem' }}>
              From precision fades to stunning bridal styles, every service is crafted with care, creativity, and expertise. Kishor also runs a full-fledged Hair Academy, training the next generation of professional hair artists.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/services" className="btn-gold">Explore Services</Link>
              <Link to="/academy" className="btn-outline">Our Academy</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── SERVICES PREVIEW ─── */}
      <section style={{ padding: '100px 40px', background: '#0a0a0a' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <AnimatedSection>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <p className="section-subtitle">What We Offer</p>
              <h2 className="section-title">Our <span className="shimmer-text">Signature Services</span></h2>
              <p style={{ color: '#888', maxWidth: '500px', margin: '1rem auto 0' }}>Every service is performed with premium products, hygiene-first practices, and a passion for perfection.</p>
            </div>
          </AnimatedSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {services.map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="card" style={{ padding: '2rem', height: '100%', cursor: 'default' }}
                  onMouseEnter={e => {
                    e.currentTarget.querySelector('.svc-icon').style.transform = 'scale(1.2) rotate(10deg)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.querySelector('.svc-icon').style.transform = 'scale(1) rotate(0deg)'
                  }}
                >
                  <div className="svc-icon" style={{ fontSize: '2.5rem', marginBottom: '1rem', display: 'inline-block', transition: 'transform 0.3s ease' }}>{s.icon}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem', color: '#fff' }}>{s.title}</h3>
                  <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/services" className="btn-outline">View All Services →</Link>
          </div>
        </div>
      </section>

      {/* ─── ACADEMY CTA STRIP ─── */}
      <section style={{
        padding: '80px 40px',
        background: 'linear-gradient(135deg, #111 0%, #1a1500 50%, #111 100%)',
        borderTop: '1px solid rgba(212,175,55,0.1)',
        borderBottom: '1px solid rgba(212,175,55,0.1)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <AnimatedSection>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div className="badge-urgent" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
              <span className="dot" />
              🚨 2nd Batch Now Enrolling – Limited Seats!
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 900,
              marginBottom: '1rem',
            }}>
              Turn Your Passion Into a <span className="shimmer-text">Professional Career</span>
            </h2>
            <p style={{ color: '#aaa', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              Join Hair Master Kishor's Men's Haircut Training Course — from basics to advanced techniques — and launch your career in the beauty industry. Free meals, free stay & certificate included!
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/enroll" className="btn-gold" style={{ fontSize: '1.05rem', padding: '16px 40px' }}>
                🚀 Enroll in 2nd Batch
              </Link>
              <Link to="/academy" className="btn-outline">
                Learn More
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ─── GALLERY PREVIEW ─── */}
      <section style={{ padding: '100px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <AnimatedSection>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <p className="section-subtitle">Our Work</p>
              <h2 className="section-title">From the <span className="shimmer-text">Salon Floor</span></h2>
            </div>
          </AnimatedSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            {[
              { src: '/images/salon-1.jpg', span: 1 },
              { src: '/images/salon-4.jpg', span: 1 },
              { src: '/images/salon-5.jpg', span: 1 },
              { src: '/images/salon-6.jpg', span: 1 },
              { src: '/images/salon-7.jpg', span: 1 },
              { src: '/images/salon-9.jpg', span: 1 },
            ].map((img, i) => (
              <AnimatedSection key={i} delay={i * 0.07}>
                <div style={{
                  aspectRatio: '1',
                  overflow: 'hidden',
                  borderRadius: '12px',
                  border: '1px solid rgba(212,175,55,0.1)',
                  cursor: 'pointer',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.querySelector('img').style.transform = 'scale(1.08)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.querySelector('img').style.transform = 'scale(1)'
                  }}
                >
                  <img src={img.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', display: 'block' }} />
                </div>
              </AnimatedSection>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/gallery" className="btn-outline">View Full Gallery →</Link>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section style={{ padding: '100px 40px', background: '#0a0a0a' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <AnimatedSection>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <p className="section-subtitle">Testimonials</p>
              <h2 className="section-title">What Our <span className="shimmer-text">Clients Say</span></h2>
            </div>
          </AnimatedSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {testimonials.map((t, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="card" style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', gap: '2px', marginBottom: '1rem' }}>
                    {Array(t.stars).fill(null).map((_, si) => (
                      <span key={si} style={{ color: '#D4AF37', fontSize: '1rem' }}>★</span>
                    ))}
                  </div>
                  <p style={{ color: '#ccc', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '1.5rem', fontStyle: 'italic' }}>"{t.text}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '42px', height: '42px',
                      background: 'linear-gradient(135deg, #D4AF37, #F0CC5A)',
                      borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#000', fontWeight: 800, fontSize: '1.1rem',
                      fontFamily: "'Playfair Display', serif",
                    }}>{t.name[0]}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fff' }}>{t.name}</div>
                      <div style={{ color: '#666', fontSize: '0.75rem' }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section style={{ padding: '100px 40px', textAlign: 'center' }}>
        <AnimatedSection>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>✂️</p>
            <h2 className="section-title">Ready for Your <span className="shimmer-text">Best Look?</span></h2>
            <p style={{ color: '#888', marginBottom: '2.5rem', lineHeight: 1.8 }}>
              Walk in or book an appointment — we're open 8:30 AM to 8:30 PM, seven days a week. Your transformation starts here.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="tel:+919624960905" className="btn-gold">📞 Call Now</a>
              <a href="https://wa.me/919624960905" target="_blank" rel="noopener noreferrer" className="btn-outline">💬 WhatsApp</a>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  )
}
