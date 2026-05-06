import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const GAMBLING_KEYWORDS = [
  'casino', 'machine-à-sous', 'machines-à-sous', 'slot', 'slots',
  'roulette', 'keno', 'jackpot', 'blackjack', 'bingo', 'rami',
  'jeux-de-casino', 'jeu-casino', 'bitcoin-casino', 'free-spins',
  'no-deposit', 'tirage-loto', 'tirage-keno',
]

// Anciennes pages WordPress supprimées (issues des exports GSC)
const DELETED_PATHS = [
  '/croissance',
  '/diagnostic-commercial',
  '/coaching-commercial',
  '/coaching-commercial-performance',
  '/coaching-commercial-croissance',
  '/pilotage-commercial',
  '/strategie-commercialisation',
  '/cas-clients-sales-experienz',
  '/ressources-gratuites',
  '/campagnes-commerciales',
  '/solution-automatisation-pme',
  '/sitemap_index.xml',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // WordPress post IDs (?p=XXXX) et paramètres parasites
  const params = request.nextUrl.searchParams
  if (params.has('p') || params.has('wordfence_lh') || params.has('trk')) {
    return new NextResponse('Gone', { status: 410 })
  }

  // WordPress legacy paths
  if (pathname.startsWith('/wp-content') || pathname.startsWith('/author/')) {
    return new NextResponse('Gone', { status: 410 })
  }

  // Anciennes pages WP supprimées
  if (DELETED_PATHS.some(p => pathname === p || pathname === p + '/')) {
    return new NextResponse('Gone', { status: 410 })
  }

  // Gambling/casino spam slugs
  if (GAMBLING_KEYWORDS.some(kw => pathname.includes(kw))) {
    return new NextResponse('Gone', { status: 410 })
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|studio).*)'],
}
