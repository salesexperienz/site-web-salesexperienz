import Navbar        from '@/components/Navbar'
import Hero          from '@/components/Hero'
import WhyAutomate   from '@/components/WhyAutomate'
import OpportunityMap from '@/components/OpportunityMap'
import WhatToAutomate from '@/components/WhatToAutomate'
import HowItWorks    from '@/components/HowItWorks'
import Services      from '@/components/Services'
import About         from '@/components/About'
import FAQ           from '@/components/FAQ'
import FinalCTA      from '@/components/FinalCTA'
import Footer        from '@/components/Footer'
import { faqJsonLd } from '@/lib/schema-faq'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WhyAutomate />
      <OpportunityMap />
      <WhatToAutomate />
      <HowItWorks />
      <Services />
      <About />
      <FAQ />
      <FinalCTA />
      <Footer />

      {/* FAQPage Schema — GEO : cite par ChatGPT, Perplexity, Claude, Gemini */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </main>
  )
}
