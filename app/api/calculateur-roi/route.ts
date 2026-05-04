import { NextRequest, NextResponse } from 'next/server'

const TAILLE_LABELS: Record<string, string> = {
  solo:    'Solo (1 pers.)',
  petite:  '2–10 pers.',
  moyenne: '10–50 pers.',
  grande:  '50+ pers.',
}

export async function POST(req: NextRequest) {
  const { email, prenom, taille, coutEstime, gainPotentiel } = await req.json()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
  }

  const attributes: Record<string, string | number> = {}
  if (prenom)         attributes.PRENOM         = prenom
  if (taille)         attributes.TAILLE_EQUIPE  = TAILLE_LABELS[taille] ?? taille
  if (coutEstime)     attributes.COUT_ESTIME     = coutEstime
  if (gainPotentiel)  attributes.GAIN_POTENTIEL  = gainPotentiel

  const res = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.BREVO_API_KEY!,
    },
    body: JSON.stringify({
      email,
      listIds: [21],
      updateEnabled: true,
      attributes,
    }),
  })

  if (!res.ok && res.status !== 204) {
    const err = await res.text()
    console.error('Brevo calculateur error:', err)
    return NextResponse.json({ error: 'Erreur Brevo' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
