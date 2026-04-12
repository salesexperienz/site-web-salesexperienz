'use client'
import { motion } from 'framer-motion'
import { DISCOVERY_URL } from '@/lib/constants'
import WorkflowStack from './WorkflowStack'

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] },
})

interface HeroProps {
  settings?: {
    heroPreTitle?: string
    heroTitleMain?: string
    heroTitleAccent?: string
    heroBadge?: string
    heroSubtitle1?: string
    heroSubtitle2?: string
    heroCTA?: string
    heroCTASub?: string
  }
}

export default function Hero({ settings }: HeroProps) {
  const preTitle   = settings?.heroPreTitle   || 'SALESEXPERIENZ · AUTOMATISATION IA'
  const titleMain  = settings?.heroTitleMain  || 'Faites exploser votre croissance avec des'
  const titleAccent= settings?.heroTitleAccent|| 'automatisations sur mesure'
  const badge      = settings?.heroBadge      || 'AUTOMATISATION N8N ET IA'
  const subtitle1  = settings?.heroSubtitle1  || 'La plupart des entreprises ont un goulot d\'étranglement qui plafonne leur chiffre d\'affaires. On commence par le trouver.'
  const subtitle2  = settings?.heroSubtitle2  || 'Chaque heure passée sur des tâches répétitives est une heure que vous n\'avez pas consacrée à votre croissance.'
  const ctaText    = settings?.heroCTA        || 'Je veux accélérer ma croissance'
  const ctaSub     = settings?.heroCTASub     || 'Sans engagement — 45 minutes'
  return (
    <section className="relative bg-white overflow-hidden">

      {/* ── Glow blobs ── */}
      <div className="absolute -top-20 -right-10 w-[700px] h-[700px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(74,191,176,0.08) 0%, transparent 65%)' }} />
      <div className="absolute bottom-0 -left-20 w-[600px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(232,98,26,0.06) 0%, transparent 65%)' }} />

      {/* Trait décoratif top */}
      <div className="absolute top-0 left-0 right-0 h-[3px] pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, #E8621A 40%, #4ABFB0 60%, transparent 100%)' }} />

      <div className="relative z-10 max-w-container mx-auto px-6 lg:px-20 w-full pt-[160px] pb-20">

        {/* ── Grille 2 colonnes ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-8 items-center mb-12">

          {/* ── Colonne texte ── */}
          <div className="flex flex-col gap-5">

            {/* Pré-titre */}
            <motion.p
              {...fade(0.1)}
              className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-teal"
            >
              {preTitle}
            </motion.p>

            {/* H1 */}
            <motion.h1
              {...fade(0.2)}
              className="font-display font-extrabold text-[28px] md:text-[44px] leading-[1.15] text-se-navy"
            >
              {titleMain}{' '}
              <span className="text-se-orange"><span className="underline decoration-2 underline-offset-4">{titleAccent}</span></span>
            </motion.h1>

            {/* Badge tag */}
            <motion.p
              {...fade(0.3)}
              className="font-body text-[11px] font-semibold uppercase tracking-[0.25em] text-se-navy/50"
            >
              {badge}
            </motion.p>

            {/* Sous-titre 1 */}
            <motion.p {...fade(0.4)} className="font-body text-[17px] leading-[1.7] text-se-navy mt-1">
              {subtitle1}
            </motion.p>

            {/* Sous-titre 2 */}
            <motion.p {...fade(0.45)} className="font-body text-[15px] leading-[1.7] text-se-navy">
              {subtitle2}
            </motion.p>

          </div>

          {/* ── Colonne image — card stack ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="hidden lg:flex items-center justify-center"
          >
            <WorkflowStack />
          </motion.div>

        </div>

        {/* ── CTA centré ── */}
        <motion.div {...fade(0.6)} className="flex flex-col items-center gap-3">
          <a
            href={DISCOVERY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-se-orange text-white border-2 border-se-orange rounded-full px-10 py-[14px] text-[16px] font-medium font-body transition-all duration-200 hover:bg-se-orange-h hover:border-se-orange-h hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(232,98,26,0.5)] active:translate-y-0"
          >
            {ctaText}
          </a>
          <span className="font-body text-[13px] text-se-navy/50">
            {ctaSub}
          </span>
        </motion.div>

      </div>

      {/* ── Diaporama logos — bordure bas du hero ── */}
      <div className="relative overflow-hidden py-6 border-t border-se-navy/[0.07]">
        <div className="absolute left-0 top-0 bottom-0 w-[6%] z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, white, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-[6%] z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, white, transparent)' }} />
        <div className="flex gap-12 items-center"
          style={{ animation: 'marquee 28s linear infinite', width: 'max-content' }}>
          {[
            { src: '/claude_logo.jpeg',        alt: 'Claude AI' },
            { src: '/logo-n8n.png',            alt: 'n8n' },
            { src: '/Chat GPT.png',            alt: 'ChatGPT' },
            { src: '/Google_Gemini_logo.png',  alt: 'Gemini' },
            { src: '/Perplexity.png',          alt: 'Perplexity' },
            { src: '/Vercel.png',              alt: 'Vercel' },
            { src: '/Next.js.png',             alt: 'Next.js' },
            { src: '/Remotion.png',            alt: 'Remotion' },
            { src: '/Wordpress.png',           alt: 'WordPress' },
            { src: '/Brevo.png',               alt: 'Brevo' },
            { src: '/Data for SEO.png',        alt: 'DataForSEO' },
            { src: '/Unipile.png',             alt: 'Unipile' },
            { src: '/Apify.png',               alt: 'Apify' },
            { src: '/claude_logo.jpeg',        alt: 'Claude AI 2' },
            { src: '/logo-n8n.png',            alt: 'n8n 2' },
            { src: '/Chat GPT.png',            alt: 'ChatGPT 2' },
            { src: '/Google_Gemini_logo.png',  alt: 'Gemini 2' },
            { src: '/Perplexity.png',          alt: 'Perplexity 2' },
            { src: '/Vercel.png',              alt: 'Vercel 2' },
            { src: '/Next.js.png',             alt: 'Next.js 2' },
            { src: '/Remotion.png',            alt: 'Remotion 2' },
            { src: '/Wordpress.png',           alt: 'WordPress 2' },
            { src: '/Brevo.png',               alt: 'Brevo 2' },
            { src: '/Data for SEO.png',        alt: 'DataForSEO 2' },
            { src: '/Unipile.png',             alt: 'Unipile 2' },
            { src: '/Apify.png',               alt: 'Apify 2' },
          ].map((logo) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={logo.alt} src={logo.src} alt={logo.alt}
              style={{ height: '32px', width: 'auto', objectFit: 'contain', flexShrink: 0, opacity: 0.75 }} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

    </section>
  )
}
