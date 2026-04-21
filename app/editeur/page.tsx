import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ImageIcon, Download } from 'lucide-react'
import EditorWrapper from './EditorWrapper'

export const metadata: Metadata = {
  title: 'Éditeur de Newsletter — Sales Experienz',
  description: 'Créez et personnalisez vos newsletters HTML professionnelles en quelques minutes. Charte graphique, typographie, export HTML prêt pour Brevo ou Mailchimp.',
  robots: { index: false, follow: false },
}

export default function EditeurPage() {
  return (
    <>
      <Navbar />

      {/* Spacer navbar fixe */}
      <div className="h-[100px]" />

      {/* Hero compact — section indépendante */}
      <section className="bg-se-navy">
        <div className="max-w-[1100px] mx-auto px-5 py-10 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white leading-tight">
              Éditeur de Newsletter
            </h1>
            <p className="text-sm text-se-muted mt-1">
              Compose, personnalise et exporte ton HTML en quelques minutes.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-6 text-right">
            <div>
              <p className="text-xl font-bold text-white">HTML</p>
              <p className="text-xs text-se-muted">Export direct</p>
            </div>
            <div>
              <p className="text-xl font-bold text-white">Gmail</p>
              <p className="text-xs text-se-muted">Compatible</p>
            </div>
            <div>
              <p className="text-xl font-bold text-white">100%</p>
              <p className="text-xs text-se-muted">Temps réel</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section explicative */}
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-[1100px] mx-auto px-5 py-10">

          {/* Titre */}
          <p className="text-xs font-semibold text-se-orange uppercase tracking-widest mb-2">Comment ça marche</p>
          <h2 className="text-xl font-bold text-se-navy mb-8">
            De la rédaction à l&apos;envoi en 3 étapes
          </h2>

          {/* 3 étapes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-se-orange text-white text-sm font-bold flex items-center justify-center">1</div>
              <div>
                <p className="font-semibold text-se-navy text-sm mb-1">Rédige ton contenu</p>
                <p className="text-sm text-stone-500 leading-relaxed">
                  Sélectionne une section dans la colonne gauche — titre, introduction, sections, CTA — et saisis ton texte directement. La prévisualisation se met à jour en temps réel.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-se-orange text-white text-sm font-bold flex items-center justify-center">2</div>
              <div>
                <p className="font-semibold text-se-navy text-sm mb-1">Personnalise ta charte</p>
                <p className="text-sm text-stone-500 leading-relaxed">
                  Onglet <strong className="text-stone-700">Charte graphique</strong> : choisis un thème couleur, une police, l&apos;espacement et ajoute ton logo. Tout s&apos;applique instantanément.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-se-orange text-white text-sm font-bold flex items-center justify-center">3</div>
              <div>
                <p className="font-semibold text-se-navy text-sm mb-1">Exporte et envoie</p>
                <p className="text-sm text-stone-500 leading-relaxed">
                  Clique sur <strong className="text-stone-700">Copier</strong> ou <strong className="text-stone-700">HTML</strong> pour récupérer ton code. Colle-le dans ton outil d&apos;envoi : Brevo, Mailchimp, Sendinblue, ActiveCampaign…
                </p>
              </div>
            </div>
          </div>

          {/* Note images */}
          <div className="flex items-start gap-3 bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 mb-8">
            <ImageIcon size={18} className="text-se-orange flex-shrink-0 mt-0.5" />
            <p className="text-sm text-stone-600">
              <strong className="text-stone-800">Images dans le corps de la newsletter</strong> — utilise les sections <strong className="text-stone-800">Image 1</strong> et <strong className="text-stone-800">Image 2</strong> (colonne gauche) pour insérer une URL d&apos;image et choisir son emplacement exact dans la newsletter.
            </p>
          </div>

          {/* Compatibilité outils */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-xs text-stone-400 uppercase tracking-wide font-medium">Compatible avec</span>
            {['Brevo', 'Mailchimp', 'ActiveCampaign', 'Sendinblue', 'HubSpot', 'Klaviyo'].map((tool) => (
              <span key={tool} className="text-xs px-3 py-1 rounded-full border border-stone-200 text-stone-600 bg-stone-50 font-medium">
                {tool}
              </span>
            ))}
          </div>

          {/* Skill Claude */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-stone-50 border border-stone-200 rounded-lg px-4 py-4">
            <div className="flex-1">
              <p className="text-sm font-semibold text-se-navy mb-1">Rédige ta newsletter avec Claude, exporte-la ici en un clic</p>
              <p className="text-sm text-stone-500 leading-relaxed">
                Installe le skill Claude pour rédiger ton contenu directement dans Claude Code, puis l&apos;exporter automatiquement dans cet éditeur — sans copier-coller.
              </p>
            </div>
            <a
              href="/newsletter-editor-skill.zip"
              download
              className="flex-shrink-0 inline-flex items-center gap-2 bg-se-orange hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
            >
              <Download size={16} />
              Télécharger le skill Claude
            </a>
          </div>

        </div>
      </section>

      {/* Éditeur */}
      <EditorWrapper />

      <Footer />
    </>
  )
}
