import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email, prenom } = await req.json()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
  }

  const body: Record<string, unknown> = {
    email,
    listIds: [21],
    updateEnabled: true,
  }
  if (prenom) body.attributes = { PRENOM: prenom }

  const res = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.BREVO_API_KEY!,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok && res.status !== 204) {
    const err = await res.text()
    console.error('Brevo error:', err)
    return NextResponse.json({ error: 'Erreur Brevo' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
