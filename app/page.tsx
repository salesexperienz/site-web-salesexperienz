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
import { getSiteSettings } from '@/lib/sanity'

export default async function Home() {
  const settings = await getSiteSettings()

  return (
    <main>
      <Navbar />
      <Hero settings={settings} />
      <WhyAutomate />
      <OpportunityMap />
      <WhatToAutomate />
      <HowItWorks />
      <Services settings={settings} />
      <About />
      <FAQ settings={settings} />
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
