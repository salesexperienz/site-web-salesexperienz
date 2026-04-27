export default function Footer() {
  return (
    <footer className="py-10 px-6 lg:px-20" style={{ background: '#0A1530' }}>
      <div className="max-w-container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

          {/* Logo + copyright */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-blanc.png" alt="Sales Experienz" className="h-20 w-auto mb-2" />
            <p className="font-body text-[13px] text-se-muted mt-1">
              © 2026 Sales Experienz — Laurent Guyonvarch
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            <p className="font-body text-[14px] font-bold text-se-muted">Services</p>
            <a href="/services/deepsignal" className="font-body text-[14px] text-se-muted hover:text-white transition-colors duration-200 pl-3">
              Prospection automatisée
            </a>
            <a href="/services/seo-geo-machine" className="font-body text-[14px] text-se-muted hover:text-white transition-colors duration-200 pl-3">
              Stratégie site web SEO-GEO
            </a>
            <a href="/blog" className="font-body text-[14px] font-bold text-se-muted hover:text-white transition-colors duration-200 mt-1">
              Blog
            </a>
            <a href="/etudes-de-cas" className="font-body text-[14px] font-bold text-se-muted hover:text-white transition-colors duration-200">
              Études de cas
            </a>
            <a href="/etudes-de-cas/ambassimmo" className="font-body text-[14px] text-se-muted hover:text-white transition-colors duration-200 pl-3">
              Ambassimmo — SEO Automatisé
            </a>
            <a href="#" className="font-body text-[14px] font-bold text-se-muted hover:text-white transition-colors duration-200">
              Contact
            </a>
          </div>

          {/* Pages locales */}
          <div className="flex flex-col gap-2">
            <p className="font-body text-[14px] font-bold text-se-muted">Expertises locales</p>
            <a href="/expert-automatisation-commerciale-paris" className="font-body text-[14px] text-se-muted hover:text-white transition-colors duration-200 pl-3">Automatisation Paris</a>
            <a href="/expert-automatisation-commerciale-lyon" className="font-body text-[14px] text-se-muted hover:text-white transition-colors duration-200 pl-3">Automatisation Lyon</a>
            <a href="/expert-automatisation-commerciale-marseille" className="font-body text-[14px] text-se-muted hover:text-white transition-colors duration-200 pl-3">Automatisation Marseille</a>
            <a href="/expert-automatisation-commerciale-toulouse" className="font-body text-[14px] text-se-muted hover:text-white transition-colors duration-200 pl-3">Automatisation Toulouse</a>
            <a href="/expert-automatisation-commerciale-nantes" className="font-body text-[14px] text-se-muted hover:text-white transition-colors duration-200 pl-3">Automatisation Nantes</a>
            <a href="/expert-automatisation-commerciale-nice" className="font-body text-[14px] text-se-muted hover:text-white transition-colors duration-200 pl-3">Automatisation Nice</a>
            <a href="/agence-marketing-automatisation-sete" className="font-body text-[14px] text-se-muted hover:text-white transition-colors duration-200 pl-3">Automatisation Sète</a>
          </div>

          {/* Contact + NAP */}
          <address
            className="not-italic flex flex-col gap-1"
            itemScope
            itemType="https://schema.org/MarketingAgency"
          >
            <span itemProp="name" className="sr-only">Sales Experienz</span>

            <span
              itemProp="address"
              itemScope
              itemType="https://schema.org/PostalAddress"
              className="font-body text-[13px] text-se-muted"
            >
              <span itemProp="streetAddress">15 Bd Chevalier de Clerville, Bât. M3</span>
              {' — '}
              <span itemProp="postalCode">34200</span>{' '}
              <span itemProp="addressLocality">Sète</span>
            </span>

            <a
              href="mailto:contact@salesexperienz.fr"
              itemProp="email"
              className="font-body text-[14px] text-se-muted hover:text-white transition-colors duration-200"
            >
              contact@salesexperienz.fr
            </a>

            <a
              href="tel:+33622951638"
              itemProp="telephone"
              className="font-body text-[14px] text-se-muted hover:text-white transition-colors duration-200"
            >
              06 22 95 16 38
            </a>

            <a
              href="https://maps.google.com/?q=Sales+Experienz+15+Bd+Chevalier+de+Clerville+Sète"
              target="_blank"
              rel="noopener noreferrer"
              itemProp="hasMap"
              className="font-body text-[13px] text-se-muted hover:text-white transition-colors duration-200"
            >
              Voir sur Google Maps
            </a>
          </address>

        </div>
      </div>
    </footer>
  )
}
