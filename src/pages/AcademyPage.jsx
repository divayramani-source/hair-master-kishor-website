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

const curriculum = [
  { module: '01', title: 'Introduction & Tools', topics: ['Salon hygiene & safety', 'Tool identification & care', 'Professional behavior', 'Client consultation basics'], icon: '🧰' },
  { module: '02', title: 'Classic Haircuts', topics: ['Scissor-over-comb technique', 'Classic men\'s cuts', 'Basic women\'s cuts', 'Layering fundamentals'], icon: '✂️' },
  { module: '03', title: 'Fades & Modern Cuts', topics: ['Clipper techniques', 'Skin fade & taper fade', 'High, mid & low fades', 'Disconnected undercuts'], icon: '💈' },
  { module: '04', title: 'Beard Mastery', topics: ['Beard shaping & styling', 'Line-up & detailing', 'Hot towel shave', 'Beard coloring basics'], icon: '🪒' },
  { module: '05', title: 'Coloring & Highlights', topics: ['Color theory', 'Global color application', 'Highlights & balayage basics', 'Face cuts & framing'], icon: '🎨' },
  { module: '06', title: 'Advanced & Business', topics: ['Trending styles 2025', 'Social media presence', 'Client management', 'Building your career'], icon: '🚀' },
]

const perks = [
  { icon: '🍽️', title: 'Free Meals', desc: 'Breakfast, Lunch & Dinner provided throughout the course.' },
  { icon: '🏠', title: 'Free Stay', desc: 'Accommodation provided for students coming from outside Gandhinagar.' },
  { icon: '📜', title: 'Certificate', desc: 'Government-recognized certificate upon successful course completion.' },
  { icon: '📱', title: 'Social Media Training', desc: 'Learn to build your online brand & attract clients via Instagram.' },
  { icon: '💼', title: 'Job Assistance', desc: 'Career guidance and placement support after completion.' },
  { icon: '🤝', title: 'Real Client Practice', desc: 'Hands-on practice with real clients under expert supervision.' },
]

const faqs = [
  { q: 'Who can join this course?', a: 'Anyone aged 16+ with a passion for hair styling — no prior experience needed. This course starts from absolute basics.' },
  { q: 'What is the course duration?', a: 'The course is comprehensive and covers all modules. Duration depends on batch schedule. Contact us for the exact timetable.' },
  { q: 'Is accommodation really free?', a: 'Yes! Students coming from outside Gandhinagar get free stay for the course duration. Just inform us in advance.' },
  { q: 'Will I get a certificate?', a: 'Absolutely. Every student who completes the course receives a professional certificate from Hair Master Kishor Academy.' },
  { q: 'How many seats are available?', a: 'We keep batches small for quality training. The 2nd batch has limited seats — enroll fast to secure your spot.' },
  { q: 'How do I enroll?', a: 'Call or WhatsApp us on +91 96249 60905 or click the Enroll button on this page. We\'ll guide you through the process.' },
]

export default function AcademyPage() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="page-enter">
      {/* Hero */}
      <section style={{
        padding: '140px 40px 100px',
        background: 'linear-gradient(160deg, #0a0a0a 0%, #0d0800 60%, #0a0a0a 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 80% at 50% 0%, rgba(212,175,55,0.1) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        {/* Background image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/salon-3.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center 30%',
          opacity: 0.08, filter: 'saturate(0)',
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <Anim>
              <span className="badge-urgent" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
                <span className="dot" />
                🎓 2nd Batch — Enrolling Now
              </span>
              <h1 className="section-title" style={{ marginBottom: '1rem' }}>
                Hair Master Kishor <span className="shimmer-text">Academy</span>
              </h1>
              <p style={{ color: '#aaa', lineHeight: 1.9, marginBottom: '2rem', fontSize: '1.05rem' }}>
                A professional hair training academy dedicated to transforming passionate beginners into certified hair artists. Learn from the master himself — <strong style={{ color: '#D4AF37' }}>Kishor Sen</strong>.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/enroll" className="btn-gold" style={{ fontSize: '1rem', padding: '15px 36px' }}>🚀 Enroll Now</Link>
                <a href="https://wa.me/919624960905?text=Hi%2C%20I%20want%20to%20know%20more%20about%20the%20Hair%20Academy" target="_blank" rel="noopener noreferrer" className="btn-outline">💬 Ask on WhatsApp</a>
              </div>
            </Anim>

            {/* Academy card */}
            <Anim delay={0.2}>
              <div style={{
                background: 'rgba(20,15,0,0.8)',
                border: '1px solid rgba(212,175,55,0.25)',
                borderRadius: '20px',
                padding: '2rem',
                backdropFilter: 'blur(20px)',
              }}>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: '0.7rem', letterSpacing: '3px', color: '#D4AF37', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                  Course Highlights
                </div>
                {[
                  { icon: '🎯', label: "Men's Haircut Training – Basic to Advanced" },
                  { icon: '✂️', label: 'Classic, Fade, Skin Fade & Beard Cutting' },
                  { icon: '🎨', label: 'Hair Coloring, Highlights & Face Cuts' },
                  { icon: '📜', label: 'Certificate After Completion' },
                  { icon: '🍽️', label: 'Free Meals (B/L/D)' },
                  { icon: '🏠', label: 'Free Stay for Outstation Students' },
                  { icon: '📱', label: 'Social Media Presence Training' },
                  { icon: '⚡', label: 'Limited Seats — Enroll Fast!' },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '10px 0',
                    borderBottom: i < 7 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  }}>
                    <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{item.icon}</span>
                    <span style={{ color: '#ccc', fontSize: '0.875rem', fontFamily: "'Inter', sans-serif" }}>{item.label}</span>
                  </div>
                ))}

                <Link to="/enroll" style={{
                  display: 'block',
                  textAlign: 'center',
                  marginTop: '1.5rem',
                  background: 'linear-gradient(135deg, #D4AF37, #F0CC5A)',
                  color: '#000',
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 800,
                  fontSize: '0.875rem',
                  padding: '14px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}>Secure Your Seat →</Link>
              </div>
            </Anim>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <div style={{ background: 'linear-gradient(135deg, #D4AF37, #F0CC5A)', padding: '30px 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', textAlign: 'center' }}>
          {[
            { val: '2nd', label: 'Batch Running' },
            { val: '100%', label: 'Practical Training' },
            { val: '50+', label: 'Students Trained' },
            { val: '✓', label: 'Certificate Included' },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '2rem', color: '#000', lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(0,0,0,0.6)', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Curriculum */}
      <section style={{ padding: '100px 40px', background: '#0a0a0a' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Anim>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <p className="section-subtitle">Curriculum</p>
              <h2 className="section-title">What You'll <span className="shimmer-text">Learn</span></h2>
              <p style={{ color: '#888', maxWidth: '500px', margin: '1rem auto 0', lineHeight: 1.8 }}>
                A structured journey from absolute basics to advanced professional techniques.
              </p>
            </div>
          </Anim>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {curriculum.map((mod, i) => (
              <Anim key={i} delay={i * 0.08}>
                <div className="card" style={{ padding: '2rem', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #D4AF37, #F0CC5A)',
                      color: '#000',
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 900,
                      fontSize: '0.65rem',
                      letterSpacing: '1px',
                      padding: '4px 10px',
                      borderRadius: '20px',
                    }}>MODULE {mod.module}</div>
                    <span style={{ fontSize: '1.5rem' }}>{mod.icon}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>{mod.title}</h3>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {mod.topics.map((t, ti) => (
                      <li key={ti} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: '#888', fontSize: '0.875rem' }}>
                        <span style={{ color: '#D4AF37', marginTop: '2px', flexShrink: 0 }}>✓</span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section style={{ padding: '100px 40px', background: '#111' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Anim>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <p className="section-subtitle">Included Benefits</p>
              <h2 className="section-title">Everything You <span className="shimmer-text">Get</span></h2>
            </div>
          </Anim>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {perks.map((p, i) => (
              <Anim key={i} delay={i * 0.08}>
                <div style={{
                  display: 'flex', gap: '1rem', alignItems: 'flex-start',
                  padding: '1.75rem',
                  background: 'rgba(212,175,55,0.04)',
                  border: '1px solid rgba(212,175,55,0.1)',
                  borderRadius: '16px',
                  transition: 'all 0.3s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.35)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.1)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <div style={{ fontSize: '2rem', flexShrink: 0, animation: `float ${2.5 + i * 0.4}s ease-in-out infinite` }}>{p.icon}</div>
                  <div>
                    <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, color: '#D4AF37', marginBottom: '4px', fontSize: '0.95rem' }}>{p.title}</h4>
                    <p style={{ color: '#888', fontSize: '0.875rem', lineHeight: 1.7 }}>{p.desc}</p>
                  </div>
                </div>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      {/* Trainer Profile */}
      <section style={{ padding: '100px 40px', background: '#0a0a0a' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <Anim>
              <div style={{ position: 'relative' }}>
                <img src="/images/salon-9.jpg" alt="Kishor Sen" style={{
                  width: '100%', borderRadius: '20px',
                  border: '2px solid rgba(212,175,55,0.2)',
                  objectFit: 'cover',
                  aspectRatio: '3/4',
                }} />
                <div style={{
                  position: 'absolute', bottom: '-15px', left: '-15px',
                  background: 'linear-gradient(135deg, #D4AF37, #F0CC5A)',
                  color: '#000', borderRadius: '12px',
                  padding: '12px 18px',
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 800, fontSize: '0.7rem',
                  letterSpacing: '1px', textTransform: 'uppercase',
                }}>
                  ✓ Certified Master Trainer
                </div>
              </div>
            </Anim>
            <Anim delay={0.2}>
              <p className="section-subtitle">Your Trainer</p>
              <h2 className="section-title">Kishor <span className="gold-text">Sen</span></h2>
              <div className="divider-gold" />
              <p style={{ color: '#aaa', lineHeight: 1.9, marginBottom: '1.2rem' }}>
                With over <strong style={{ color: '#D4AF37' }}>8 years of experience</strong> in the hair industry, Kishor Sen is not just a stylist — he's an educator, mentor, and industry professional who has transformed hundreds of careers.
              </p>
              <p style={{ color: '#aaa', lineHeight: 1.9, marginBottom: '1.5rem' }}>
                His teaching style is hands-on, practical, and deeply focused on real-world skill-building. He believes every student deserves the tools to build a successful, independent career.
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                {[
                  { val: '8+', label: 'Years Experience' },
                  { val: '50+', label: 'Students Trained' },
                  { val: '100%', label: 'Pass Rate' },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '1.8rem', color: '#D4AF37', lineHeight: 1 }}>{s.val}</div>
                    <div style={{ color: '#666', fontSize: '0.7rem', fontFamily: "'Montserrat', sans-serif", letterSpacing: '1px', marginTop: '2px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <a href="https://www.instagram.com/hair_master_kishor/" target="_blank" rel="noopener noreferrer" className="btn-outline">
                📸 Follow on Instagram
              </a>
            </Anim>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '100px 40px', background: '#111' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Anim>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <p className="section-subtitle">Got Questions?</p>
              <h2 className="section-title">Frequently Asked <span className="shimmer-text">Questions</span></h2>
            </div>
          </Anim>
          {faqs.map((faq, i) => (
            <Anim key={i} delay={i * 0.05}>
              <div style={{
                border: '1px solid rgba(212,175,55,0.1)',
                borderRadius: '12px',
                marginBottom: '1rem',
                overflow: 'hidden',
                transition: 'border-color 0.2s',
                borderColor: openFaq === i ? 'rgba(212,175,55,0.35)' : 'rgba(212,175,55,0.1)',
              }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                  width: '100%', background: 'none', border: 'none',
                  padding: '1.25rem 1.5rem',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  cursor: 'pointer', textAlign: 'left', gap: '1rem',
                }}>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, color: '#fff', fontSize: '0.95rem', flex: 1 }}>{faq.q}</span>
                  <span style={{
                    color: '#D4AF37', fontSize: '1.2rem', flexShrink: 0,
                    transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)',
                    transition: 'transform 0.3s', display: 'block'
                  }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 1.5rem 1.25rem', animation: 'fadeIn 0.2s ease' }}>
                    <p style={{ color: '#888', lineHeight: 1.8, fontSize: '0.9rem' }}>{faq.a}</p>
                  </div>
                )}
              </div>
            </Anim>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 40px', textAlign: 'center', background: '#0a0a0a' }}>
        <Anim>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="badge-urgent" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
              <span className="dot" />
              ⚡ Limited Seats in 2nd Batch
            </div>
            <h2 className="section-title">Don't Just Learn a Skill — <span className="shimmer-text">Build a Future</span></h2>
            <p style={{ color: '#888', marginBottom: '2.5rem', lineHeight: 1.8, fontSize: '1.05rem' }}>
              Your journey to becoming a professional hair artist starts here. Join the 2nd batch of Hair Master Kishor Academy.
            </p>
            <Link to="/enroll" className="btn-gold" style={{ fontSize: '1.1rem', padding: '18px 48px' }}>
              🎓 Enroll in 2nd Batch →
            </Link>
          </div>
        </Anim>
      </section>
    </div>
  )
}
