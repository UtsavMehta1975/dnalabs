import './index.css'
import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import Slider from 'react-slick'
import { products, trendingProducts, productsByCategory, categories, type ProductItem } from './products'

function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null

  // Close on Escape key
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 9999 }} onClick={onClose}>
      <div style={{ background: '#fff', maxWidth: 720, margin: '10vh auto', borderRadius: 8, overflow: 'hidden' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ position: 'relative', padding: 16 }}>
          <button aria-label="Close" onClick={onClose} style={{ position: 'absolute', top: 8, right: 10, background: 'transparent', border: 'none', fontSize: 22, lineHeight: 1, cursor: 'pointer' }}>×</button>
          {children}
        </div>
      </div>
    </div>
  )
}

function SiteDisclaimer() {
  return (
    <div className="disclaimer-banner">
      <div className="disclaimer-inner">
        Information provided is for educational purposes only. Use strictly under professional guidance. Not for diagnosis, treatment, or cure.
      </div>
    </div>
  )
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img alt="DNA Laboratory Logo" className="logo-img" src="/logo192.png" />
          <span>DNA Laboratory</span>
        </div>
        <div className="hamburger" onClick={() => setMenuOpen(o => !o)}>
          <div></div><div></div><div></div>
        </div>
        <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <li><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMenuOpen(false)}>Home</NavLink></li>
          <li className={`dropdown  ${menuOpen ? 'open' : ''}`}>
            <span className="dropdown-toggle">Our Products</span>
            <ul className="dropdown-menu">
              {categories.map(c => (
                <li key={c.slug}><NavLink to={`/products/${c.slug}`} className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMenuOpen(false)}>{c.name}</NavLink></li>
              ))}
            </ul>
          </li>
          <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMenuOpen(false)}>About Us</NavLink></li>
          <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMenuOpen(false)}>Contact Us</NavLink></li>
        </ul>
      </div>
    </header>
  )
}

// Hero inlined inside HomePage; separate function removed

function ProductCarousel() {
  const settings = { dots: true, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1, autoplay: true, autoplaySpeed: 2500, arrows: true, adaptiveHeight: true } as const
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<ProductItem | null>(null)
  return (
    <section className="product-carousel">
      <h2 className="carousel-title">Top Trending Products</h2>
      <Slider {...settings}>
        {trendingProducts.map((p) => (
          <div key={p.image}>
            <div className="carousel-card" onClick={() => { setActive(p); setOpen(true) }} style={{ cursor: 'pointer' }}>
              <img src={p.image} alt={p.name} className="carousel-img" />
              <h3>{p.name}</h3>
              <p>£{p.priceGBP}</p>
              <div className="product-disclaimer">For informational purposes only. Use under professional guidance.</div>
            </div>
          </div>
        ))}
      </Slider>
      <Modal open={open} onClose={() => setOpen(false)}>
        {active && (
          <div>
            <h2 style={{ marginTop: 0 }}>{active.name}</h2>
            <p style={{ color: '#666' }}>£{active.priceGBP}</p>
            <img src={active.image} alt={active.name} style={{ width: '100%', height: 'auto', borderRadius: 6 }} />
            <p style={{ marginTop: 12 }}>{active.description}</p>
            <div className="product-disclaimer">Information provided is educational only. Always consult a qualified professional.</div>
          </div>
        )}
      </Modal>
    </section>
  )
}

function ProductGridList({ items }: { items: typeof products }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<ProductItem | null>(null)
  return (
    <>
      <div className="product-grid">
        {items.map((p) => (
          <div key={p.image} className="product-card" onClick={() => { setActive(p); setOpen(true) }} style={{ cursor: 'pointer' }}>
            <img src={p.image} alt={p.name} className="product-img" />
            <div className="product-info">
              <h2>{p.name}</h2>
              <p>£{p.priceGBP ?? '—'}</p>
              <div className="product-disclaimer">Information only. Use under professional guidance.</div>
            </div>
          </div>
        ))}
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        {active && (
          <div>
            <h2 style={{ marginTop: 0 }}>{active.name}</h2>
            {typeof active.priceGBP === 'number' && <p style={{ color: '#666' }}>£{active.priceGBP}</p>}
            <img src={active.image} alt={active.name} style={{ width: '100%', height: 'auto', borderRadius: 6 }} />
            <p style={{ marginTop: 12 }}>{active.description}</p>
            <div className="product-disclaimer">Information provided is educational only. Always consult a qualified professional.</div>
      </div>
        )}
      </Modal>
    </>
  )
}

function ProductsPageAll() {
  return (
    <section id="products" className="products-page">
      <h1>Products</h1>
      <p className="page-intro">Explore our catalog. This website provides educational information about our products, including composition and responsible usage. Always consult a professional before use.</p>
      <ProductGridList items={products} />
    </section>
  )
}

function useDietaryImages() {
  const [images, setImages] = useState<string[]>([])
  useEffect(() => {
    fetch('/dietary-images.json', { cache: 'no-store' })
      .then(r => r.ok ? r.json() : [])
      .then((arr) => Array.isArray(arr) ? setImages(arr) : setImages([]))
      .catch(() => setImages([]))
  }, [])
  return images
}

function prettyDietaryNameFromSrc(src: string): string {
  const base = (src.split('/').pop() || '').replace(/\.[^.]+$/, '')
  const key = base.toLowerCase().replace(/[^a-z0-9]+/g, '')
  if (key === 'creatinemonohydratemangoflavor' || key === 'creatinemonohydratemangoflavour') return 'Creatine Monohydrate (Mango Flavour)'
  if (key === 'ecaburn') return 'ECA Burn'
  if (key === 'lcarnitine') return 'L‑Carnitine'
  if (key === 'lcarnitineliquid') return 'L‑Carnitine (Liquid)'
  if (key === 'massgainer') return 'Mass Gainer'
  if (key === 'waterout') return 'Water Out'
  if (key === 'isowheyprotein') return 'ISO Whey Protein'
  if (key === 'wheyprotineblend' || key === 'wheyproteinblend') return 'Whey Protein Blend'
  return base
    .replace(/[-_]+/g, ' ')
    .replace(/\b([a-z])/g, (m) => m.toUpperCase())
}

function dietaryPriceGBP(src: string): number | undefined {
  const base = (src.split('/').pop() || '').replace(/\.[^.]+$/, '')
  const key = base.toLowerCase().replace(/[^a-z0-9]+/g, '')
  if (key === 'creatinemonohydratemangoflavor' || key === 'creatinemonohydratemangoflavour') return 25
  if (key === 'ecaburn') return 30
  if (key === 'lcarnitine') return 30
  if (key === 'lcarnitineliquid') return 45
  if (key === 'massgainer') return 60
  if (key === 'waterout') return 30
  if (key === 'isowheyprotein') return 90
  if (key === 'wheyprotineblend' || key === 'wheyproteinblend') return 70
  return undefined
}

function dietaryDescription(src: string): string {
  const base = (src.split('/').pop() || '').replace(/\.[^.]+$/, '')
  const key = base.toLowerCase().replace(/[^a-z0-9]+/g, '')
  if (key === 'creatinemonohydratemangoflavor' || key === 'creatinemonohydratemangoflavour') {
    return 'Creatine Monohydrate (Mango Flavour) is a staple performance supplement discussed for supporting high‑intensity efforts and training volume. Typical use pairs with adequate hydration and carbohydrate intake. This overview is educational only; consult a qualified professional for suitability, timing, and dose under supervised, safety‑first guidance.'
  }
  if (key === 'ecaburn') {
    return 'ECA Burn is presented as a thermogenic support formula for disciplined cutting phases. Emphasis is placed on responsible use, hydration, sleep, and a structured nutrition plan. This information is not advice. Always consult a qualified professional regarding risks, interactions, and appropriate supervised protocols.'
  }
  if (key === 'lcarnitine') {
    return 'L‑Carnitine is often referenced for its role in fatty acid transport and general energy metabolism, typically alongside a balanced diet and training. Responses vary by individual. The description here is informational only; seek professional guidance for suitability and safe, responsible incorporation if appropriate.'
  }
  if (key === 'lcarnitineliquid') {
    return 'L‑Carnitine (Liquid) offers a convenient format frequently discussed in weight‑management and energy‑support contexts. Outcomes depend on overall nutrition, activity, and recovery. This is educational material, not medical advice. Consult a qualified professional to evaluate use, dosing, and any contraindications.'
  }
  if (key === 'massgainer') {
    return 'Mass Gainer products are typically designed to help increase daily calories and protein during size‑focused phases. Effective use hinges on consistent training, recovery, and macronutrient planning. This content is informational only. Discuss suitability, timing, and serving sizes with a qualified professional.'
  }
  if (key === 'waterout') {
    return 'Water Out blends are generally discussed for short‑term water balance support. Users emphasize hydration, electrolyte awareness, and responsible, time‑limited use. This summary is educational only and not a recommendation. Seek professional guidance to determine appropriateness and to supervise safe practices.'
  }
  if (key === 'isowheyprotein') {
    return 'ISO Whey Protein is a highly filtered whey isolate discussed for lean protein intake with minimal carbs and fats. Typical considerations include timing around workouts and daily protein targets. This is educational content only. Consult a qualified professional for suitability, intolerances, and safe, individualized use.'
  }
  if (key === 'wheyprotineblend' || key === 'wheyproteinblend') {
    return 'Whey Protein Blend is commonly used to help meet daily protein targets that support muscle repair and recovery. Quality outcomes rely on total diet and training consistency. This information is educational only. Consult a qualified professional for personalized advice, intolerances, and safe usage.'
  }
  return 'Informational overview. Consult a qualified professional for suitability, protocols, and safe, supervised use.'
}

function ProductsPageByCategory() {
  const { category } = useParams()
  const items = productsByCategory(category)
  const title = categories.find(c => c.slug === category)?.name || 'Products'

  if (category === 'dietary-supplements') {
    const images = useDietaryImages()
    const [open, setOpen] = useState(false)
    const [active, setActive] = useState<string | null>(null)
    const openModal = (src: string) => { setActive(src); setOpen(true) }
    const price = (src: string) => dietaryPriceGBP(src)
    const name = (src: string) => prettyDietaryNameFromSrc(src)
    const desc = (src: string) => dietaryDescription(src)

    return (
      <section id="products" className="products-page">
        <h1>{title}</h1>
        <p className="page-intro">Dietary supplements information hub. Review composition, suggested usage, and safety notes. Always consult a professional before use.</p>
        <div className="product-grid">
          {images.map((src) => (
            <div key={src} className="product-card" onClick={() => openModal(src)} style={{ cursor: 'pointer' }}>
              <img src={src} alt={src.split('/').pop() || 'Dietary product'} className="product-img" />
              <div className="product-info">
                <h2>{name(src)}</h2>
                <p>£{price(src) ?? '—'}</p>
                <div className="product-disclaimer">Information only. Use under professional guidance.</div>
              </div>
            </div>
          ))}
        </div>
        <Modal open={open} onClose={() => setOpen(false)}>
          {active && (
            <div>
              <h2 style={{ marginTop: 0 }}>{name(active)}</h2>
              {typeof price(active) === 'number' && <p style={{ color: '#666' }}>£{price(active)}</p>}
              <img src={active} alt={name(active)} style={{ width: '100%', height: 'auto', borderRadius: 6 }} />
              <p style={{ marginTop: 12 }}>{desc(active)}</p>
              <div className="product-disclaimer">Information provided is educational only. Always consult a qualified professional.</div>
            </div>
          )}
        </Modal>
      </section>
    )
  }

  return (
    <section id="products" className="products-page">
      <h1>{title}</h1>
      <p className="page-intro">This section provides educational information for the selected category. Consult a professional before use.</p>
      <ProductGridList items={items} />
    </section>
  )
}

function InfoCards() {
  return (
    <section className="info-cards">
      <div className="card green">
        <h3>📞 Any Query</h3>
        <p>Please feel free to contact our friendly staff with any enquiry.</p>
      </div>
      <div className="card blue">
        <h3>➕ CAUTION</h3>
        <p>Use under professional supervision. Keep away from children.</p>
      </div>
      <div className="card dark-blue">
        <p>Please email your inquiries and questions to</p>
        <p><strong>Email: laboratoriesdnaa@gmail.com</strong></p>
      </div>
    </section>
  )
}

function useAuthCodes() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [codes, setCodes] = useState<string[]>([])
  const [codesSha256, setCodesSha256] = useState<string[]>([])
  const [salt, setSalt] = useState<string>('')

  useEffect(() => {
    let cancelled = false
    fetch('/auth-codes.json', { cache: 'no-store' })
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((json) => {
        if (cancelled) return
        setCodes(Array.isArray(json.codes) ? json.codes : [])
        setCodesSha256(Array.isArray(json.codesSha256) ? json.codesSha256 : [])
        setSalt(typeof json.salt === 'string' ? json.salt : '')
        setLoading(false)
      })
      .catch((e) => {
        if (cancelled) return
        setError(e.message)
        setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { loading, error, codes, codesSha256, salt }
}

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input)
  const hash = await crypto.subtle.digest('SHA-256', data)
  const bytes = Array.from(new Uint8Array(hash))
  return bytes.map((b) => b.toString(16).padStart(2, '0')).join('')
}

function Authenticator() {
  const { loading, error, codes, codesSha256, salt } = useAuthCodes()
  const [value, setValue] = useState('')
  const [status, setStatus] = useState<null | 'valid' | 'invalid'>(null)

  const placeholder = useMemo(() => 'Enter authentication code...', [])

  const onCheck = async () => {
    const trimmed = value.trim()
    if (!trimmed) {
      setStatus(null)
      return
    }
    if (codes.includes(trimmed)) {
      setStatus('valid')
      return
    }
    if (codesSha256.length > 0) {
      const hash = await sha256Hex((salt || '') + trimmed)
      if (codesSha256.includes(hash)) {
        setStatus('valid')
        return
      }
    }
    setStatus('invalid')
  }

  return (
    <section>
      <div className="search-container">
        <input
          className="search-box"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') onCheck() }}
        />
        <button onClick={onCheck} className="search-button">🔍</button>
      </div>
      {loading && <p>Loading authenticator...</p>}
      {error && <p>Failed to load codes: {error}</p>}
      {status === 'valid' && (<div className="auth-message">This product is genuine and authenticated.</div>)}
      {status === 'invalid' && (
        <div className="auth-message" style={{ backgroundColor: '#ffe6e6', borderLeftColor: '#d00', color: '#900' }}>
          This code is NOT valid.
        </div>
      )}
    </section>
  )
}

function QualitySection() {
  return (
    <section id="about" className="medical-banner">
      <div className="left-content">
        <svg className="quality-icon" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zM104 424c0 13.3 10.7 24 24 24s24-10.7 24-24-10.7-24-24-24-24 10.7-24 24zm216-135.4v49c36.5 7.4 64 39.8 64 78.4v41.7c0 7.6-5.4 14.2-12.9 15.7l-32.2 6.4c-4.3.9-8.5-1.9-9.4-6.3l-3.1-15.7c-.9 4.3-5.1 7.1-9.4 6.3l-31.2-4.2c-7.9-1.1-13.8-7.8-13.8-15.9V416c0-38.6 27.5-70.9 64-78.4v-45.2c-2.2.7-4.4 1.1-6.6 1.9-18 6.3-37.3 9.8-57.4 9.8s-39.4-3.5-57.4-9.8c-7.4-2.6-14.9-4.2-22.6-5.2v81.6c23.1 6.9 40 28.1 40 53.4 0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.3 16.9-46.5 40-53.4v-80.4C48.5 301 0 355.8 0 422.4v44.8C0 491.9 20.1 512 44.8 512h358.4c24.7 0 44.8-20.1 44.8-44.8v-44.8c0-72-56.8-130.3-128-133.8z" /></svg>
        <p className="blue-text">Products are individually tested for quality control before sale.<br />Products on this website can only be purchased through our global partners.</p>
      </div>
      <div className="right-content">
        <h2>The Quality Of Your Life Through Better Health Products.</h2>
        <p>Our goal is to deliver quality of care in a courteous, respectful, and compassionate manner. We hope you will allow us to care for you and to be the first and best choice for healthcare.</p>
        <p>Our products are manufactured in our Current Good Manufacturing Practices facility to ensure optimal quality.</p>
        <ul>
          <li>✅ <span className="bold">We conduct a range of tests</span> to help us work out why you're not feeling well and determine the right treatment for you.</li>
          <li>✅ <span className="bold">We have become synonymous with our brand and reputation.</span> We are continuously focusing on improving both the standard of our product and our business.</li>
        </ul>
      </div>
    </section>
  )
}

function WhyChooseUs() {
  return (
    <section className="why-choose-us">
      <h2>Why Choose DNA Laboratory?</h2>
      <ul>
        <li>✔ High-quality lab-tested products</li>
        <li>✔ Transparent sourcing & ingredients</li>
        <li>✔ 24/7 Customer support</li>
        <li>✔ Global shipping & timely delivery</li>
      </ul>
    </section>
  )
}

function ContactCTA() {
  return (
    <section className="contact-cta">
      <h2>Have Questions?</h2>
      <p>Reach out to our team for any product or partnership inquiry.</p>
      <a className="btn-primary" href="mailto:laboratoriesdnaa@gmail.com">Contact Us</a>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>DNA Laboratory</h3>
          <p>High-quality anabolic steroid trusted by athletes worldwide.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: laboratoriesdnaa@gmail.com</p>
          <p>Address: 18 Ennerdale Drive, West Midlands, B69 2HL United Kingdom</p>
        </div>
      </div>
      <div className="footer-bottom">© {new Date().getFullYear()} DNALaboratory. All rights reserved.</div>
    </footer>
  )
}

function HomePage() {
  return (
    <div className="home-container">
      <div className="medical-banner">
        <div className="banner-section">
          <div className="text-content">
            <h1>Providing Best <br /> Medical Products</h1>
            <p>The health and well-being of our patients and their health care team will <br />always be our priority, so we follow the best practices for cleanliness.</p>
          </div>
          <Authenticator />
          <div className="product-images">
            <div className="product-box">
              <img className="product-image" src="/static/media/TestP.bae9c9e3260e36c67f9e.jpeg" alt="Test-P Product" />
              <p style={{ color: 'white' }}>Anabolics</p>
            </div>
            <div className="product-box">
              <img className="product-image" src="/static/media/LGD4033.53cc515fc89947fe7890.jpg" alt="LGD-4033 Product" />
              <p style={{ color: 'white' }}>Sarms</p>
            </div>
            <div className="product-box">
              <img className="product-image" src="/static/media/wheyproteinblend.jpeg" alt="Whey Protein Blend" />
              <p style={{ color: 'white' }}>Dietary supplements</p>
            </div>
          </div>
        </div>
        <InfoCards />
      </div>
      <QualitySection />
      <ProductCarousel />
      <WhyChooseUs />
      <ContactCTA />
    </div>
  )
}

function AboutPage() {
  return (
    <div className="page-container">
      <h1>About Us</h1>
      <p className="page-intro">We are committed to providing clear, reliable information about our products, their composition, and responsible usage. Our facility follows current Good Manufacturing Practices (cGMP) to ensure quality.</p>
      <h2>What We Provide</h2>
      <p>— Educational content for each product, including typical composition and usage context.<br/>— Safety and storage information, plus professional guidance notes.<br/>— Regularly updated resources so customers can make informed decisions.</p>
      <h2>Our Promise</h2>
      <p>Transparency, quality, and a safety-first mindset. Always consult a healthcare or qualified professional before use.</p>
    </div>
  )
}

// Removed unused ProductsPage

function ContactPage() {
  return (
    <div className="page-container">
      <h1>Contact Us</h1>
      <p className="page-intro">Have questions about our products or need more information? Reach out and our team will be happy to help.</p>
      <p><strong>Email:</strong> laboratoriesdnaa@gmail.com<br/>
      <strong>Address:</strong> 18 Ennerdale Drive, West Midlands, B69 2HL, United Kingdom</p>
      <p>We strive to respond within 2–3 business days.</p>
    </div>
  )
}

export default function App() {
  return (
    <div>
      <SiteDisclaimer />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPageAll />} />
        <Route path="/products/:category" element={<ProductsPageByCategory />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </div>
  )
}
