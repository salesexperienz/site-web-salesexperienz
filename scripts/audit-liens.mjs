/**
 * audit-liens.mjs
 * Phase 1 : Détection de tous les liens cassés sur salesexperienz.fr
 * Usage : node scripts/audit-liens.mjs
 * Sorties : scripts/rapport-liens.json + scripts/rapport-liens.md
 */

import { writeFile } from 'fs/promises'
import * as htmlparser2 from 'htmlparser2'

// ─── Config ───────────────────────────────────────────────────────────────────

const TIMEOUT_MS = 12_000
const CONCURRENCY = 4    // vérifications de liens en parallèle
const DELAY_BETWEEN_PAGES = 1000 // ms entre chaque page (évite le rate-limit)

// ─── Liste des pages à auditer ────────────────────────────────────────────────

const PAGES = [
  'https://www.salesexperienz.fr',
  'https://www.salesexperienz.fr/services/seo-geo-machine',
  'https://www.salesexperienz.fr/services/deepsignal',
  'https://www.salesexperienz.fr/agence-marketing-automatisation-sete',
  'https://www.salesexperienz.fr/blog',
  'https://www.salesexperienz.fr/expert-automatisation-commerciale-paris',
  'https://www.salesexperienz.fr/expert-automatisation-commerciale-lyon',
  'https://www.salesexperienz.fr/expert-automatisation-commerciale-marseille',
  'https://www.salesexperienz.fr/expert-automatisation-commerciale-toulouse',
  'https://www.salesexperienz.fr/expert-automatisation-commerciale-nantes',
  'https://www.salesexperienz.fr/expert-automatisation-commerciale-nice',
  'https://www.salesexperienz.fr/blog/conquete-commerciale-fail',
  'https://www.salesexperienz.fr/blog/strategie-distribution-marketing',
  'https://www.salesexperienz.fr/blog/politique-commerciale-marketing',
  'https://www.salesexperienz.fr/blog/strategies-commerciales-efficaces',
  'https://www.salesexperienz.fr/blog/strategie-vente-pdf-echec',
  'https://www.salesexperienz.fr/blog/strategie-prospection-commerciale',
  'https://www.salesexperienz.fr/blog/strategie-marketing-commerciale',
  'https://www.salesexperienz.fr/blog/ameliorer-efficacite-commerciale',
  'https://www.salesexperienz.fr/blog/strategie-acquisition-b2b',
  'https://www.salesexperienz.fr/blog/difference-strategies-marketing-commerciale',
  'https://www.salesexperienz.fr/blog/strategie-d-animation-commerciale-entre-competition-saine-et-gamification',
  'https://www.salesexperienz.fr/blog/strategie-animation-commerciale',
  'https://www.salesexperienz.fr/blog/strategie-communication-commerciale',
  'https://www.salesexperienz.fr/blog/strategie-approche-commerciale-2',
  'https://www.salesexperienz.fr/blog/strategie-approche-commerciale',
  'https://www.salesexperienz.fr/blog/master-manager-strategie-performance-commerciale',
  'https://www.salesexperienz.fr/blog/plan-action-commercial-exemple-pdf',
  'https://www.salesexperienz.fr/blog/strategie-developpement-commercial',
  'https://www.salesexperienz.fr/blog/strategie-commercialisation',
  'https://www.salesexperienz.fr/blog/definition-strategie-commerciale',
  'https://www.salesexperienz.fr/blog/redacteur-seo',
  'https://www.salesexperienz.fr/blog/plan-action-commerciale-exemple-2',
  'https://www.salesexperienz.fr/blog/plan-action-commerciale-exemple',
  'https://www.salesexperienz.fr/blog/strategie-crm',
  'https://www.salesexperienz.fr/blog/redaction-seo-conversion',
  'https://www.salesexperienz.fr/blog/4-p-marketing-depasses',
  'https://www.salesexperienz.fr/blog/gagner-argent-seo',
  'https://www.salesexperienz.fr/blog/augmentez-visibilite-seo',
  'https://www.salesexperienz.fr/blog/texte-seo-essentiel-strategie',
  'https://www.salesexperienz.fr/blog/secrets-automatisation-workflows-contenu',
  'https://www.salesexperienz.fr/blog/quel-sont-4-piliers-seo',
  'https://www.salesexperienz.fr/blog/comment-optimiser-seo-site-web-2',
  'https://www.salesexperienz.fr/blog/comment-creer-workflow-n8n',
  'https://www.salesexperienz.fr/blog/automatiser-prospection-linkedin',
  'https://www.salesexperienz.fr/blog/exemple-automatisation-commerciale',
  'https://www.salesexperienz.fr/blog/pourquoi-automatiser-process-commercial',
  'https://www.salesexperienz.fr/blog/automatisation-commerciale-definition-usage',
  'https://www.salesexperienz.fr/blog/automatiser-prospection-commerciale-2',
  'https://www.salesexperienz.fr/blog/guide-workflow-vente-automatique',
  'https://www.salesexperienz.fr/blog/solution-automatisation-pme',
  'https://www.salesexperienz.fr/blog/automatisation-commerciale-ia-efficacite',
  'https://www.salesexperienz.fr/blog/elements-essentiels-workflow-automatise',
  'https://www.salesexperienz.fr/blog/n8n-automatisation-marketing',
  'https://www.salesexperienz.fr/blog/automatisation-publication-reseaux-sociaux',
  'https://www.salesexperienz.fr/blog/outil-automatisation-commerciale-le-guide',
  'https://www.salesexperienz.fr/blog/automatiser-prospection-commerciale',
  'https://www.salesexperienz.fr/blog/automatiser-relation-client',
  'https://www.salesexperienz.fr/blog/automatisation-commerciale-strategie-b2b',
  'https://www.salesexperienz.fr/blog/automatisation-prospection-linkedin',
  'https://www.salesexperienz.fr/blog/automatisation-reseaux-sociaux-strategie',
  'https://www.salesexperienz.fr/blog/optimiser-automatisation-b2b',
  'https://www.salesexperienz.fr/blog/automatisation-contenu-seo',
  'https://www.salesexperienz.fr/blog/automatiser-strategie-contenu-seo',
  'https://www.salesexperienz.fr/blog/automatiser-strategies-contenu-seo',
  'https://www.salesexperienz.fr/blog/automatiser-prospection-seo-ecosysteme',
  'https://www.salesexperienz.fr/blog/generer-leads-automatiquement-techno',
  'https://www.salesexperienz.fr/blog/automatisation-marketing-digital-resultats',
  'https://www.salesexperienz.fr/blog/automatiser-prospection-linkedin-booster',
  'https://www.salesexperienz.fr/blog/guide-ultime-article-seo',
  'https://www.salesexperienz.fr/blog/creer-optimiser-vos-articles-blog',
  'https://www.salesexperienz.fr/blog/comment-ecrire-article-optimise-google',
  'https://www.salesexperienz.fr/blog/erreurs-redaction-seo',
  'https://www.salesexperienz.fr/blog/quatre-piliers-article-seo',
  'https://www.salesexperienz.fr/blog/article-seo-secrets',
  'https://www.salesexperienz.fr/blog/comment-optimiser-seo-site-web',
  'https://www.salesexperienz.fr/blog/strategies-referencement-google-optimal',
  'https://www.salesexperienz.fr/blog/maitriser-referencement-naturel',
  'https://www.salesexperienz.fr/blog/automatiser-son-blog-seo',
  'https://www.salesexperienz.fr/blog/coaching-commercial-performance',
  'https://www.salesexperienz.fr/blog/art-redaction-contenus-seo',
  'https://www.salesexperienz.fr/blog/guide-redaction-seo-b2b',
  'https://www.salesexperienz.fr/blog/ia-generation-contenu-web',
  'https://www.salesexperienz.fr/blog/automatiser-prospection-n8n-blog',
  'https://www.salesexperienz.fr/blog/redaction-seo-automatique-guide',
  'https://www.salesexperienz.fr/blog/ia-redaction-seo',
  'https://www.salesexperienz.fr/blog/ia-redaction-seo-transformation',
  'https://www.salesexperienz.fr/blog/impact-ia-copywriting',
  'https://www.salesexperienz.fr/blog/gagner-temps-redaction-blog',
  'https://www.salesexperienz.fr/blog/automatisation-seo-entreprises',
  'https://www.salesexperienz.fr/blog/comment-automatiser-blog-wordpress',
  'https://www.salesexperienz.fr/blog/automatiser-publication-blog',
  'https://www.salesexperienz.fr/blog/structurer-demarche-commerciale',
  'https://www.salesexperienz.fr/blog/signaux-dachat',
  'https://www.salesexperienz.fr/blog/methode-pilotage-commercial',
  'https://www.salesexperienz.fr/blog/guide-approche-commerciale',
  'https://www.salesexperienz.fr/blog/guide-prospection-commerciale',
  'https://www.salesexperienz.fr/blog/le-guide-complet-du-coaching-commercial-b2b',
]

// ─── Utilitaires ──────────────────────────────────────────────────────────────

function resolveHref(href, pageUrl) {
  if (!href) return null
  const h = href.trim()
  if (h.startsWith('#')) return null
  if (h.startsWith('mailto:') || h.startsWith('tel:') || h.startsWith('javascript:')) return null
  try {
    return new URL(h, pageUrl).href
  } catch {
    return null
  }
}

function extractLinks(html, pageUrl) {
  const links = []
  let currentHref = null
  let currentText = []

  const parser = new htmlparser2.Parser({
    onopentag(name, attrs) {
      if (name === 'a' && attrs.href) {
        const resolved = resolveHref(attrs.href, pageUrl)
        if (resolved) {
          currentHref = resolved
          currentText = []
        }
      }
    },
    ontext(text) {
      if (currentHref) currentText.push(text)
    },
    onclosetag(name) {
      if (name === 'a' && currentHref) {
        links.push({ href: currentHref, text: currentText.join('').trim().slice(0, 120) })
        currentHref = null
        currentText = []
      }
    },
  }, { decodeEntities: true })

  parser.write(html)
  parser.end()

  // Dédoublonnage par href
  const seen = new Set()
  return links.filter(l => {
    if (seen.has(l.href)) return false
    seen.add(l.href)
    return true
  })
}

async function checkLink(url) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    let res = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SalesExperienzLinkAudit/1.0)' },
    })
    // Certains serveurs rejettent HEAD → fallback GET
    if (res.status === 405) {
      res = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SalesExperienzLinkAudit/1.0)' },
      })
    }
    clearTimeout(timer)
    return { status: res.status, ok: res.status >= 200 && res.status < 400 }
  } catch (e) {
    clearTimeout(timer)
    return { status: 0, ok: false, error: e.message }
  }
}

// File d'attente avec concurrence limitée
async function pMap(items, fn, concurrency) {
  const results = new Array(items.length)
  let i = 0
  async function worker() {
    while (i < items.length) {
      const idx = i++
      results[idx] = await fn(items[idx], idx)
    }
  }
  const workers = Array.from({ length: Math.min(concurrency, items.length) }, worker)
  await Promise.all(workers)
  return results
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

// ─── Audit d'une page ─────────────────────────────────────────────────────────

async function auditPage(pageUrl) {
  process.stdout.write(`\n📄 ${pageUrl}\n`)

  const controller = new AbortController()
  setTimeout(() => controller.abort(), TIMEOUT_MS)

  let html
  try {
    const res = await fetch(pageUrl, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SalesExperienzLinkAudit/1.0)' },
    })
    if (!res.ok) {
      process.stdout.write(`   ⚠️  Page inaccessible (${res.status})\n`)
      return { pageUrl, pageStatus: res.status, totalLinks: 0, brokenLinks: [] }
    }
    html = await res.text()
  } catch (e) {
    process.stdout.write(`   ⚠️  Erreur fetch : ${e.message}\n`)
    return { pageUrl, pageStatus: 0, pageError: e.message, totalLinks: 0, brokenLinks: [] }
  }

  const links = extractLinks(html, pageUrl)
  process.stdout.write(`   → ${links.length} liens extraits\n`)

  const checked = await pMap(links, async (link) => {
    const result = await checkLink(link.href)
    if (!result.ok) {
      const isInternal = link.href.includes('salesexperienz.fr')
      const type = isInternal ? '🔴 interne' : '🟠 externe'
      process.stdout.write(`   ❌ [${result.status || 'ERR'}] ${type} — ${link.href}\n`)
    }
    return { ...link, ...result, isInternal: link.href.includes('salesexperienz.fr') }
  }, CONCURRENCY)

  const brokenLinks = checked.filter(l => !l.ok)
  process.stdout.write(`   → ${brokenLinks.length} lien(s) cassé(s)\n`)

  return {
    pageUrl,
    pageStatus: 200,
    totalLinks: links.length,
    brokenLinks: brokenLinks.map(({ href, text, status, error, isInternal }) => ({
      href, text, status: status || 0, error, isInternal,
    })),
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🔍 Audit des liens — SalesExperienz')
  console.log(`📋 ${PAGES.length} pages à analyser`)
  console.log('─'.repeat(60))

  const start = Date.now()
  const allResults = []

  for (const url of PAGES) {
    const result = await auditPage(url)
    allResults.push(result)
    await sleep(DELAY_BETWEEN_PAGES)
  }

  const elapsed = Math.round((Date.now() - start) / 1000)
  const pagesWithBroken = allResults.filter(r => r.brokenLinks.length > 0)
  const totalBroken = allResults.reduce((s, r) => s + r.brokenLinks.length, 0)
  const internalBroken = allResults.flatMap(r => r.brokenLinks.filter(l => l.isInternal))
  const externalBroken = allResults.flatMap(r => r.brokenLinks.filter(l => !l.isInternal))

  // ── Rapport JSON ──
  const report = {
    auditDate: new Date().toISOString(),
    durationSeconds: elapsed,
    totalPages: PAGES.length,
    pagesWithBrokenLinks: pagesWithBroken.length,
    totalBrokenLinks: totalBroken,
    brokenInternalLinks: internalBroken.length,
    brokenExternalLinks: externalBroken.length,
    results: allResults.filter(r => r.brokenLinks.length > 0 || r.pageError),
  }

  await writeFile('scripts/rapport-liens.json', JSON.stringify(report, null, 2))

  // ── Rapport Markdown ──
  const d = new Date().toLocaleDateString('fr-FR')
  let md = `# Rapport audit des liens — ${d}\n\n`
  md += `| Métrique | Valeur |\n|---|---|\n`
  md += `| Pages analysées | ${report.totalPages} |\n`
  md += `| Pages avec liens cassés | ${report.pagesWithBrokenLinks} |\n`
  md += `| Total liens cassés | ${report.totalBrokenLinks} |\n`
  md += `| Liens internes cassés | ${report.brokenInternalLinks} |\n`
  md += `| Liens externes cassés | ${report.brokenExternalLinks} |\n`
  md += `| Durée | ${elapsed}s |\n\n`

  for (const page of report.results) {
    if (page.pageError) {
      md += `## ⚠️ ${page.pageUrl}\n**Erreur :** \`${page.pageError}\`\n\n`
      continue
    }
    md += `## ${page.pageUrl}\n`
    md += `${page.brokenLinks.length} lien(s) cassé(s) sur ${page.totalLinks} total\n\n`
    for (const link of page.brokenLinks) {
      const type = link.isInternal ? '🔴 interne' : '🟠 externe'
      md += `- ${type} **[${link.status}]** \`${link.href}\`\n`
      if (link.text) md += `  Texte ancre : "${link.text}"\n`
    }
    md += '\n'
  }

  await writeFile('scripts/rapport-liens.md', md)

  // ── Résumé console ──
  console.log('\n' + '═'.repeat(60))
  console.log(`✅ Audit terminé en ${elapsed}s`)
  console.log(`📊 ${pagesWithBroken.length}/${PAGES.length} pages avec des liens cassés`)
  console.log(`   🔴 ${internalBroken.length} liens internes cassés`)
  console.log(`   🟠 ${externalBroken.length} liens externes cassés`)
  console.log('─'.repeat(60))
  console.log('💾 scripts/rapport-liens.json')
  console.log('📝 scripts/rapport-liens.md')
}

main().catch(console.error)
