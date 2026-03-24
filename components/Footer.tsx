export default function Footer() {
  return (
    <footer className="py-10 px-6 lg:px-20" style={{ background: '#0A1530' }}>
      <div className="max-w-container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

          {/* Logo + copyright */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-blanc.png" alt="SalesExperienz" className="h-20 w-auto mb-2" />
            <p className="font-body text-[13px] text-se-muted mt-1">
              © 2026 SalesExperienz — Laurent Guyonvarch
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

          {/* Contact */}
          <div className="flex flex-col gap-1">
            <a
              href="mailto:contact@salesexperienz.fr"
              className="font-body text-[14px] text-se-muted hover:text-white transition-colors duration-200"
            >
              contact@salesexperienz.fr
            </a>
            <a
              href="tel:+33622951638"
              className="font-body text-[14px] text-se-muted hover:text-white transition-colors duration-200"
            >
              06.22.95.16.38
            </a>
          </div>

        </div>
      </div>
    </footer>
  )
}
