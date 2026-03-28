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
          <div className="flex items-center gap-6">
            <a href="https://blog.salesexperienz.fr/articles/" target="_blank" rel="noopener noreferrer" className="font-body text-[14px] text-se-muted hover:text-white transition-colors duration-200">
              Blog
            </a>
            <a href="#" className="font-body text-[14px] text-se-muted hover:text-white transition-colors duration-200">
              Contact
            </a>
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
