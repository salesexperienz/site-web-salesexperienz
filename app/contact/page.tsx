import type { Metadata } from 'next'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Réserver un appel — Sales Experienz',
  description: 'Réservez votre appel découverte de 45 minutes avec Laurent Guyonvarch — automatisation, prospection B2B, systèmes IA.',
  robots: { index: false, follow: false },
}

export default function ContactPage() {
  return <ContactForm />
}
