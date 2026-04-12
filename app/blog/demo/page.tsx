/**
 * /blog/demo — Page de prévisualisation du modèle d'article.
 * À supprimer ou protéger avant la mise en production.
 */

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ArticleSidebar from '@/components/ArticleSidebar'
import ArticleFooterBlocks from '@/components/ArticleFooterBlocks'
import SocialBlock from '@/components/SocialBlock'
import Link from 'next/link'

// ─── Contenu de démo ─────────────────────────────────────────────────────────

const DEMO_TOC = [
  { id: 'pourquoi-automatiser-sa-prospection', text: 'Pourquoi automatiser sa prospection ?', level: 2 },
  { id: 'le-probleme-de-la-prospection-manuelle', text: 'Le problème de la prospection manuelle', level: 3 },
  { id: 'ce-que-change-lautomatisation', text: "Ce que change l'automatisation", level: 3 },
  { id: 'les-3-briques-du-systeme', text: 'Les 3 briques du système', level: 2 },
  { id: 'brique-1-la-detection-de-signaux', text: 'Brique 1 — La détection de signaux', level: 3 },
  { id: 'brique-2-la-personnalisation-ia', text: 'Brique 2 — La personnalisation IA', level: 3 },
  { id: 'brique-3-le-nurturing-automatise', text: 'Brique 3 — Le nurturing automatisé', level: 3 },
  { id: 'combien-ca-coute-vraiment', text: 'Combien ça coûte vraiment ?', level: 2 },
  { id: 'conclusion', text: 'Conclusion', level: 2 },
]

const CATEGORY_COLORS: Record<string, string> = {
  'Automatisation': 'bg-se-teal text-white',
  'Prospection':    'bg-se-orange text-white',
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DemoArticlePage() {
  return (
    <>
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section id="article-hero" className="relative bg-se-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,98,26,0.08),transparent_60%)]" />

        <div className="relative max-w-container mx-auto px-6 pt-36 pb-14">
          {/* Fil d'Ariane */}
          <div className="flex items-center gap-2 text-[13px] text-se-muted mb-6">
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-se-teal">Automatisation</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Texte */}
            <div className="flex-1 min-w-0">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {['Automatisation', 'Prospection'].map((cat) => (
                  <span key={cat} className={`text-[11px] font-bold px-3 py-1 rounded-full ${CATEGORY_COLORS[cat]}`}>
                    {cat}
                  </span>
                ))}
              </div>

              <h1 className="font-display font-extrabold text-[32px] md:text-[42px] text-white leading-tight mb-5">
                Comment automatiser sa prospection B2B avec n8n en 2025
              </h1>

              <p className="text-se-muted text-[17px] leading-relaxed max-w-2xl mb-6">
                Découvrez comment construire un système de prospection entièrement automatisé :
                signaux LinkedIn, cold email et nurturing en flux continu, sans toucher à une ligne de code.
              </p>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-[13px] text-se-muted/70">
                <span className="flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-full bg-se-orange/20 flex items-center justify-center text-[10px] text-se-orange font-bold">L</span>
                  Laurent Guyonvarch
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  15 septembre 2025
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  7 min de lecture
                </span>
              </div>
            </div>

            {/* Image placeholder */}
            <div className="lg:w-[340px] flex-shrink-0">
              <div className="w-full h-[220px] rounded-2xl bg-gradient-to-br from-se-card to-se-teal-dark shadow-[0_20px_60px_rgba(0,0,0,0.35)] flex items-center justify-center">
                <svg className="w-16 h-16 text-white/10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contenu + Sidebar ──────────────────────────────────────────── */}
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-container mx-auto px-6 py-14 flex gap-10 items-start">

          {/* Article */}
          <article className="flex-1 min-w-0 bg-white rounded-2xl shadow-sm border border-gray-100 px-8 md:px-12 py-10">

            {/* Introduction */}
            <p className="text-[16px] text-gray-700 leading-[1.85] mb-5">
              En 2025, la prospection manuelle est devenue un gouffre à temps. Les commerciaux passent
              en moyenne <strong className="font-bold text-se-navy">4h par jour</strong> à des tâches répétitives
              — recherche de contacts, personnalisation d'emails, relances — alors qu'un système automatisé
              peut faire tout ça en arrière-plan, 24h/24.
            </p>

            <blockquote className="border-l-4 border-se-orange pl-5 py-1 my-6 bg-se-orange/5 rounded-r-xl">
              <p className="text-se-navy/80 text-[15px] italic leading-relaxed">
                "Le meilleur commercial, c'est celui qui prospecte uniquement les gens qui ont déjà levé la main."
              </p>
            </blockquote>

            {/* H2 */}
            <h2 id="pourquoi-automatiser-sa-prospection"
              className="font-display font-extrabold text-[26px] text-se-navy mt-12 mb-4 leading-tight scroll-mt-28">
              Pourquoi automatiser sa prospection ?
            </h2>

            <h3 id="le-probleme-de-la-prospection-manuelle"
              className="font-display font-bold text-[20px] text-se-navy mt-8 mb-3 leading-snug scroll-mt-28">
              Le problème de la prospection manuelle
            </h3>

            <p className="text-[16px] text-gray-700 leading-[1.85] mb-5">
              La prospection manuelle souffre de trois problèmes fondamentaux : elle est lente, non scalable,
              et dépendante de l'humeur du commercial. Un bon jour, il envoie 30 messages. Un mauvais jour, 5.
              Le pipeline s'en ressent immédiatement.
            </p>

            <ul className="my-5 space-y-2 pl-5">
              {[
                'Volume limité : 20 à 50 contacts/jour maximum',
                'Personnalisation approximative : copier-coller légèrement modifié',
                'Relances oubliées ou trop tardives',
                'Aucune scalabilité sans recruter',
              ].map((item) => (
                <li key={item} className="text-[15px] text-gray-700 leading-relaxed flex gap-2">
                  <span className="text-se-orange mt-1.5 flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h3 id="ce-que-change-lautomatisation"
              className="font-display font-bold text-[20px] text-se-navy mt-8 mb-3 leading-snug scroll-mt-28">
              Ce que change l'automatisation
            </h3>

            <p className="text-[16px] text-gray-700 leading-[1.85] mb-5">
              Avec un système comme <strong className="font-bold text-se-navy">DeepSignal</strong>, vous ne
              prospectez plus à l'aveugle. Vous détectez d'abord les signaux d'intention — un commentaire LinkedIn,
              un recrutement actif, une levée de fonds — puis vous contactez uniquement ces prospects chauds,
              avec un message personnalisé par l'IA.
            </p>

            {/* H2 */}
            <h2 id="les-3-briques-du-systeme"
              className="font-display font-extrabold text-[26px] text-se-navy mt-12 mb-4 leading-tight scroll-mt-28">
              Les 3 briques du système
            </h2>

            <h3 id="brique-1-la-detection-de-signaux"
              className="font-display font-bold text-[20px] text-se-navy mt-8 mb-3 leading-snug scroll-mt-28">
              Brique 1 — La détection de signaux
            </h3>

            <p className="text-[16px] text-gray-700 leading-[1.85] mb-5">
              Un workflow n8n surveille en continu LinkedIn, les offres d'emploi et les actualités de vos
              cibles. Dès qu'un signal correspond à votre ICP, il est capturé et qualifié automatiquement.
            </p>

            <h3 id="brique-2-la-personnalisation-ia"
              className="font-display font-bold text-[20px] text-se-navy mt-8 mb-3 leading-snug scroll-mt-28">
              Brique 2 — La personnalisation IA
            </h3>

            <p className="text-[16px] text-gray-700 leading-[1.85] mb-5">
              Claude AI analyse le profil du prospect et le signal détecté pour rédiger un message
              d'approche contextualisé. Pas un template — un vrai message qui fait référence à ce que
              le prospect vient de faire ou de publier.
            </p>

            <h3 id="brique-3-le-nurturing-automatise"
              className="font-display font-bold text-[20px] text-se-navy mt-8 mb-3 leading-snug scroll-mt-28">
              Brique 3 — Le nurturing automatisé
            </h3>

            <p className="text-[16px] text-gray-700 leading-[1.85] mb-5">
              Si le prospect ne répond pas, une séquence de relance adaptée se déclenche via Brevo.
              Si il ouvre sans répondre, le message suivant est différent. Le système apprend du comportement.
            </p>

            {/* H2 */}
            <h2 id="combien-ca-coute-vraiment"
              className="font-display font-extrabold text-[26px] text-se-navy mt-12 mb-4 leading-tight scroll-mt-28">
              Combien ça coûte vraiment ?
            </h2>

            <p className="text-[16px] text-gray-700 leading-[1.85] mb-5">
              Le coût de la mise en place varie selon la complexité de votre ICP et le volume de prospects.
              En général, on parle d'un investissement unique + un abonnement aux outils (n8n cloud, Brevo,
              Claude API) qui tourne entre <strong className="font-bold text-se-navy">150 et 400€/mois</strong> pour
              un système qui prospecte en continu.
            </p>

            {/* H2 */}
            <h2 id="conclusion"
              className="font-display font-extrabold text-[26px] text-se-navy mt-12 mb-4 leading-tight scroll-mt-28">
              Conclusion
            </h2>

            <p className="text-[16px] text-gray-700 leading-[1.85] mb-5">
              Automatiser sa prospection n'est plus réservé aux grandes entreprises. Avec les bons outils
              et une bonne architecture, une PME peut avoir un système qui génère 10 à 30 rendez-vous
              qualifiés par mois, sans y passer ses journées.
            </p>

            {/* Pied d'article */}
            <div className="mt-14 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <Link href="/blog"
                className="flex items-center gap-2 text-[14px] text-se-navy/50 hover:text-se-orange transition-colors font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Tous les articles
              </Link>
              <div className="flex flex-wrap gap-2">
                {['Automatisation', 'Prospection'].map((cat) => (
                  <Link key={cat} href={`/blog?category=${encodeURIComponent(cat)}`}
                    className={`text-[11px] font-bold px-3 py-1 rounded-full ${CATEGORY_COLORS[cat]}`}>
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar sticky — se déclenche après le hero */}
          <ArticleSidebar toc={DEMO_TOC} heroId="article-hero" />
        </div>

        {/* Blocs de fin — pleine largeur sous l'article */}
        <div className="max-w-container mx-auto px-6 pb-16">
          <ArticleFooterBlocks />
        </div>
      </div>

      <SocialBlock />
      <Footer />
    </>
  )
}
