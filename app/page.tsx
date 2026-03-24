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
    </main>
  )
}
