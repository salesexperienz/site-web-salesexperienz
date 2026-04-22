'use client'

import { useState } from 'react'

export default function NewsletterForm() {
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, prenom }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-4">
        <p className="text-white font-semibold text-[15px]">Bienvenue {prenom} ! Vous êtes bien inscrit.</p>
      </div>
    )
  }

  return (
    <div className="mt-10 max-w-2xl mx-auto">
      <p className="text-center text-white font-bold text-[15px] mb-4 uppercase tracking-[0.12em]">
        Recevez nos conseils chaque semaine
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Votre prénom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          required
          className="flex-1 px-4 py-3 rounded-full text-[14px] text-se-navy placeholder-gray-400 outline-none focus:ring-2 focus:ring-se-orange bg-white"
        />
        <input
          type="email"
          placeholder="Votre adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-4 py-3 rounded-full text-[14px] text-se-navy placeholder-gray-400 outline-none focus:ring-2 focus:ring-se-orange bg-white"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="flex-shrink-0 bg-se-orange text-white font-semibold text-[14px] px-7 py-3 rounded-full hover:bg-se-orange-h hover:shadow-[0_6px_20px_rgba(232,98,26,0.45)] transition-all duration-200 disabled:opacity-60"
        >
          {status === 'loading' ? 'Envoi…' : "S'inscrire"}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-center text-red-200 text-[13px] mt-2">Une erreur est survenue, réessayez.</p>
      )}
      <p className="text-center text-white/45 text-[11px] mt-3 leading-relaxed">
        Pas de spam. Désinscription en un clic.{' '}
        <a href="/politique-de-confidentialite" className="underline underline-offset-2 hover:text-white/70 transition-colors">
          Politique de confidentialité
        </a>
      </p>
    </div>
  )
}
