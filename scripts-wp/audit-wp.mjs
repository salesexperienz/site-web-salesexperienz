/**
 * audit-wp.mjs
 * Audit de tous les liens cassés d'un site WordPress
 * Auto-découverte des URLs via /sitemap.xml (gère sitemap index + sitemaps imbriqués)
 *
 * Usage  : node scripts-wp/audit-wp.mjs
 * Config : modifier SITE_URL ci-dessous
 * Sorties: scripts-wp/rapport-wp.json + scripts-wp/rapport-wp.md
 */

import { writeFile } from 'fs/promises'
import * as htmlparser2 from 'htmlparser2'

// ─── Config ───────────────────────────────────────────────────────────────────

const SITE_URL      = 'https://www.client-site.com'   // ← à modifier
const TIMEOUT_MS    = 12_000
const CONCURRENCY   = 4
const DELAY_BETWEEN_PAGES = 1200

// ─── Parsing sitemap ──────────────────────────────────────────────────────────

async function fetchText(url) {
  const ctrl = new AbortController()
  setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  const res = await fetch(url, {
    signal: ctrl.signal,
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; WPLinkAudit/1.0)' },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.text()
}

function extractLocs(xml) {
  const locs = []
  const re = /<loc>(.*?)<\/loc>/gs
  let m
  while ((m = re.exec(xml)) !== null) locs.push(m[1].trim())
  return locs
}

async function discoverUrls() {
  console.log(`🗺️  Lecture du sitemap : ${SITE_URL}/sitemap.xml`)
  let xml
  try {
    xml = await fetchText(`${SITE_URL}/sitemap.xml`)
  } catch (e) {
    console.error(`❌ Impossible de lire /sitemap.xml : ${e.message}`)
    process.exit(1)
  }

  const locs = extractLocs(xml)
  if (locs.length === 0) { console.error('❌ Aucune URL dans le sitemap'); process.exit(1) }

  // Sitemap index ? (contient d'autres .xml)
  if (xml.includes('<sitemapindex') || locs.some(l => l.endsWith('.xml'))) {
    const subSitemaps = locs.filter(l => l.endsWith('.xml'))
    console.log(`📂 Sitemap index — ${subSitemaps.length} sous-sitemaps`)
    const allUrls = []
    for (const sub of subSitemaps) {
      try {
        const subXml = await fetchText(sub)
        const subLocs = extractLocs(subXml).filter(l => !l.endsWith('.xml'))
        console.log(`   → ${sub} : ${subLocs.length} URLs`)
        allUrls.push(...subLocs)
      } catch (e) {
        console.warn(`   ⚠️  Erreur ${sub} : ${e.message}`)
      }
    }
    return [...new Set(allUrls)]
  }

  const pageUrls = locs.filter(l => !l.endsWith('.xml'))
  console.log(`📋 ${pageUrls.length} URLs trouvées`)
  return [...new Set(pageUrls)]
}

// ─── Extraction des liens + contexte ──────────────────────────────────────────

function resolveHref(href, pageUrl) {
  if (!href) return null
  const h = href.trim()
  if (h.startsWith('#') || h.startsWith('mailto:') || h.startsWith('tel:') || h.startsWith('javascript:')) return null
  try { return new URL(h, pageUrl).href } catch { return null }
}

function extractContext(html, href) {
  const escaped = href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const re = new RegExp(`.{0,200}<a[^>]*href=["']${escaped}["'][^>]*>[\\s\\S]{0,100}<\\/a>.{0,200}`, 'i')
  const m = html.match(re)
  if (!m) return ''
  return m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 400)
}

function extractLinks(html, pageUrl) {
  const links = []
  let currentHref = null
  let currentText = []

  const parser = new htmlparser2.Parser({
    onopentag(name, attrs) {
      if (name === 'a' && attrs.href) {
        const resolved = resolveHref(attrs.href, pageUrl)
        if (resolved) { currentHref = resolved; currentText = [] }
      }
    },
    ontext(text) { if (currentHref) currentText.push(text) },
    onclosetag(name) {
      if (name === 'a' && currentHref) {
        links.push({ href: currentHref, text: currentText.join('').trim().slice(0, 120) })
        currentHref = null; currentText = []
      }
    },
  }, { decodeEntities: true })

  parser.write(html)
  parser.end()

  const seen = new Set()
  return links.filter(l => { if (seen.has(l.href)) return false; seen.add(l.href); return true })
}

// ─── Vérification HTTP ────────────────────────────────────────────────────────

async function checkLink(url) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  try {
    let res = await fetch(url, {
      method: 'HEAD', redirect: 'follow', signal: ctrl.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; WPLinkAudit/1.0)' },
    })
    if (res.status === 405) {
      res = await fetch(url, {
        method: 'GET', redirect: 'follow', signal: ctrl.signal,
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; WPLinkAudit/1.0)' },
      })
    }
    clearTimeout(timer)
    return { status: res.status, ok: res.status >= 200 && res.status < 400 }
  } catch (e) {
    clearTimeout(timer)
    return { status: 0, ok: false, error: e.message }
  }
}

async function pMap(items, fn, concurrency) {
  const results = new Array(items.length)
  let i = 0
  async function worker() { while (i < items.length) { const idx = i++; results[idx] = await fn(items[idx]) } }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker))
  return results
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

// ─── Audit d'une page ─────────────────────────────────────────────────────────

async function auditPage(pageUrl) {
  process.stdout.write(`\n📄 ${pageUrl}\n`)
  const ctrl = new AbortController()
  setTimeout(() => ctrl.abort(), TIMEOUT_MS)

  let html
  try {
    const res = await fetch(pageUrl, {
      signal: ctrl.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; WPLinkAudit/1.0)' },
    })
    if (!res.ok) {
      process.stdout.write(`   ⚠️  Page inaccessible (${res.status})\n`)
      return { pageUrl, pageStatus: res.status, totalLinks: 0, brokenLinks: [] }
    }
    html = await res.text()
  } catch (e) {
    process.stdout.write(`   ⚠️  Erreur : ${e.message}\n`)
    return { pageUrl, pageStatus: 0, pageError: e.message, totalLinks: 0, brokenLinks: [] }
  }

  const links = extractLinks(html, pageUrl)
  process.stdout.write(`   → ${links.length} liens extraits\n`)

  const siteHost = new URL(SITE_URL).host

  const checked = await pMap(links, async (link) => {
    const result = await checkLink(link.href)
    let isInternal
    try { isInternal = new URL(link.href).host === siteHost } catch { isInternal = false }
    if (!result.ok) {
      const type = isInternal ? '🔴 interne' : '🟠 externe'
      process.stdout.write(`   ❌ [${result.status || 'ERR'}] ${type} — ${link.href}\n`)
    }
    return { ...link, ...result, isInternal }
  }, CONCURRENCY)

  const brokenLinks = checked
    .filter(l => !l.ok)
    .map(l => ({
      href: l.href,
      text: l.text,
      status: l.status || 0,
      error: l.error,
      isInternal: l.isInternal,
      context: extractContext(html, l.href),
    }))

  process.stdout.write(`   → ${brokenLinks.length} lien(s) cassé(s)\n`)
  return { pageUrl, pageStatus: 200, totalLinks: links.length, brokenLinks }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🔍 Audit WordPress — liens cassés')
  console.log(`🌐 Site : ${SITE_URL}`)
  console.log('─'.repeat(60))

  const urls = await discoverUrls()
  console.log(`\n📋 ${urls.length} pages à analyser`)
  console.log('─'.repeat(60))

  const start = Date.now()
  const allResults = []

  for (const url of urls) {
    allResults.push(await auditPage(url))
    await sleep(DELAY_BETWEEN_PAGES)
  }

  const elapsed = Math.round((Date.now() - start) / 1000)
  const pagesWithBroken = allResults.filter(r => r.brokenLinks.length > 0)
  const internalBroken  = allResults.flatMap(r => r.brokenLinks.filter(l => l.isInternal))
  const externalBroken  = allResults.flatMap(r => r.brokenLinks.filter(l => !l.isInternal))

  const report = {
    auditDate: new Date().toISOString(),
    siteUrl: SITE_URL,
    durationSeconds: elapsed,
    totalPages: urls.length,
    pagesWithBrokenLinks: pagesWithBroken.length,
    totalBrokenLinks: internalBroken.length + externalBroken.length,
    brokenInternalLinks: internalBroken.length,
    brokenExternalLinks: externalBroken.length,
    results: allResults.filter(r => r.brokenLinks.length > 0 || r.pageError),
  }

  await writeFile('scripts-wp/rapport-wp.json', JSON.stringify(report, null, 2))

  const d = new Date().toLocaleDateString('fr-FR')
  let md = `# Rapport audit WordPress — ${d}\n\n**Site :** ${SITE_URL}\n\n`
  md += `| Métrique | Valeur |\n|---|---|\n`
  md += `| Pages analysées | ${report.totalPages} |\n`
  md += `| Pages avec liens cassés | ${report.pagesWithBrokenLinks} |\n`
  md += `| Total liens cassés | ${report.totalBrokenLinks} |\n`
  md += `| Liens internes cassés | ${report.brokenInternalLinks} |\n`
  md += `| Liens externes cassés | ${report.brokenExternalLinks} |\n`
  md += `| Durée | ${elapsed}s |\n\n`

  for (const page of report.results) {
    if (page.pageError) { md += `## ⚠️ ${page.pageUrl}\n**Erreur :** \`${page.pageError}\`\n\n`; continue }
    md += `## ${page.pageUrl}\n${page.brokenLinks.length} lien(s) cassé(s)\n\n`
    for (const link of page.brokenLinks) {
      const type = link.isInternal ? '🔴 interne' : '🟠 externe'
      md += `- ${type} **[${link.status}]** \`${link.href}\`\n`
      if (link.text) md += `  Ancre : "${link.text}"\n`
    }
    md += '\n'
  }

  await writeFile('scripts-wp/rapport-wp.md', md)

  console.log('\n' + '═'.repeat(60))
  console.log(`✅ Audit terminé en ${elapsed}s`)
  console.log(`📊 ${pagesWithBroken.length}/${urls.length} pages avec des liens cassés`)
  console.log(`   🔴 ${internalBroken.length} liens internes cassés`)
  console.log(`   🟠 ${externalBroken.length} liens externes cassés`)
  console.log('─'.repeat(60))
  console.log('💾 scripts-wp/rapport-wp.json')
  console.log('📝 scripts-wp/rapport-wp.md')
  console.log('\n→ Étape suivante : node scripts-wp/analyse-rapport.mjs')
}

main().catch(console.error)
