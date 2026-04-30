import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Politique de confidentialité · SalesExperienz',
  description: 'Politique de confidentialité et traitement des données personnelles de SalesExperienz.',
  alternates: { canonical: 'https://www.salesexperienz.fr/politique-de-confidentialite' },
  robots: { index: false },
}

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ background: '#0A1530' }}>
        <article className="max-w-2xl mx-auto px-6 pt-24 pb-20 font-body text-se-muted">

          <h1 className="font-display text-3xl font-bold text-white mb-2">
            Politique de confidentialité
          </h1>
          <p className="text-[13px] mb-10">Dernière mise à jour : avril 2026</p>

          <section className="mb-8">
            <h2 className="text-white font-semibold text-[17px] mb-3">Responsable du traitement</h2>
            <p className="text-[15px] leading-relaxed">
              Sales Experienz — Laurent Guyonvarch<br />
              15 Bd Chevalier de Clerville, Bât. M3 — 34200 Sète<br />
              <a href="mailto:contact@salesexperienz.fr" className="text-se-accent hover:underline">contact@salesexperienz.fr</a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-white font-semibold text-[17px] mb-3">Données collectées</h2>
            <p className="text-[15px] leading-relaxed mb-3">
              Nous collectons uniquement les données que vous nous transmettez volontairement :
            </p>
            <ul className="list-disc pl-5 text-[15px] leading-relaxed space-y-1">
              <li>Prénom et adresse e-mail lors de l'inscription à la newsletter</li>
              <li>Informations renseignées dans les formulaires de contact</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-white font-semibold text-[17px] mb-3">Finalités et base légale</h2>
            <ul className="list-disc pl-5 text-[15px] leading-relaxed space-y-2">
              <li><strong className="text-white">Newsletter</strong> — envoi de contenus éditoriaux et commerciaux. Base légale : consentement (art. 6.1.a RGPD).</li>
              <li><strong className="text-white">Contact</strong> — réponse à vos demandes. Base légale : intérêt légitime (art. 6.1.f RGPD).</li>
              <li><strong className="text-white">Analyse d'audience</strong> — statistiques anonymisées via Vercel Analytics. Aucun cookie tiers.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-white font-semibold text-[17px] mb-3">Durée de conservation</h2>
            <p className="text-[15px] leading-relaxed">
              Vos données sont conservées tant que vous êtes abonné(e) à notre newsletter, puis supprimées dans un délai de 30 jours après désinscription. Les données de contact sont conservées 3 ans après le dernier échange.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-white font-semibold text-[17px] mb-3">Vos droits</h2>
            <p className="text-[15px] leading-relaxed">
              Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, de portabilité et d'opposition. Pour exercer ces droits, écrivez à{' '}
              <a href="mailto:contact@salesexperienz.fr" className="text-se-accent hover:underline">contact@salesexperienz.fr</a>.
              Vous pouvez également vous désabonner à tout moment via le lien présent dans chaque e-mail.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-white font-semibold text-[17px] mb-3">Sous-traitants</h2>
            <p className="text-[15px] leading-relaxed">
              Vos données peuvent être traitées par nos sous-traitants : Vercel (hébergement, UE/US avec garanties adéquates), n8n (automatisation, hébergé en Europe). Aucune donnée n'est vendue à des tiers.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-[17px] mb-3">Réclamation</h2>
            <p className="text-[15px] leading-relaxed">
              Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la{' '}
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-se-accent hover:underline">CNIL</a>.
            </p>
          </section>

        </article>
      </main>
      <Footer />
    </>
  )
}
