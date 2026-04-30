/**
 * fix-liens-externes.mjs
 * Phase 3 : Remplacement des liens externes cassés via Claude API
 *
 * Pour chaque lien externe cassé :
 *   1. Trouve l'article Sanity + texte d'ancre + contexte
 *   2. Demande à Claude une URL de remplacement pertinente
 *   3. Vérifie que l'URL suggérée répond (HTTP 2xx/3xx)
 *   4. Patch Sanity si validé
 *
 * Usage :
 *   ANTHROPIC_API_KEY=sk-ant-... node scripts/fix-liens-externes.mjs --dry-run
 *   ANTHROPIC_API_KEY=sk-ant-... node scripts/fix-liens-externes.mjs
 */

import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@sanity/client'
import { toPlainText } from '@portabletext/toolkit'
import { writeFile } from 'fs/promises'

// ─── Config ──────────────────────────────────────────────────────────────────

const DRY_RUN = process.argv.includes('--dry-run')
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY

if (!ANTHROPIC_KEY) {
  console.error('❌  ANTHROPIC_API_KEY manquant.')
  console.error('    Lance : ANTHROPIC_API_KEY=sk-ant-... node scripts/fix-liens-externes.mjs')
  process.exit(1)
}

const TIMEOUT_MS = 10_000
const DELAY_BETWEEN_CALLS = 800   // ms entre chaque appel Claude

const sanity = createClient({
  projectId: '0wgbhtrw',
  dataset: 'production',
  token: 'sk2SCaOIjrTY8dDVlwRuxYVo3Wd6jK48qU04EiyFz3gPiCTMJsKRTAs3KuO6SSAKEWBn6wK9H2AOhWTGoFR16IvtX6mltPUfSqhyPXFFn7DSI9yOttQo1tcUK61T7xT1MznUKtMmP3NEn2K9E2y4RL6Wlcun3423IRMfBb1oPFjhzEgqvIMD',
  apiVersion: '2026-04-12',
  useCdn: false,
})

const anthropic = new Anthropic({ apiKey: ANTHROPIC_KEY })

// ─── URLs cassées à traiter ───────────────────────────────────────────────────
// (status 404/500/0 — ni faux positifs 403/999, ni forrester 502 temporaire)

const BROKEN_URLS = [
  'https://blog.hubspot.com/marketing/importance-of-marketing-automation',
  'https://blog.hubspot.fr/marketing/structurer-iterations-prospection-commerciale',
  'https://buffer.com/library/social-media-automation/',
  'https://developers.google.com/search/docs/beginner/robots-txt',
  'https://hbr.org/2006/10/the-coaching-habit',
  'https://hbr.org/2010/10/column-to-raise-productivity-let-more-employees-work-from-home',
  'https://hbr.org/2016/03/the-new-sales-imperative',
  'https://hbr.org/2018/07/what-everyones-getting-wrong-about-the-to-do-list',
  'https://hbr.org/2018/09/the-metrics-that-marketers-should-and-shouldnt-focus-on',
  'https://hbr.org/2019/04/why-salespeople-need-to-develop-machine-intelligence',
  'https://moz.com/blog/34-ways-to-promote-your-content-5766',
  'https://moz.com/blog/content-workflow-systems',
  'https://moz.com/blog/seo-checklist',
  'https://moz.com/learn/seo/content-audit',
  'https://status.co/blog/automating-your-business-welcome-to-the-21st-century',
  'https://www.cmswire.com/marketing/what-is-linkedins-sales-navigator-really-good-for/',
  'https://www.digitalmarketinginstitute.com/blog/how-to-improve-seo',
  'https://www.hootsuite.com/blog/social-media-automation/',
  'https://www.hubspot.fr/blog-marketing/guide-automation-marketing',
  'https://www.hubspot.fr/crm',
  'https://www.hubspot.fr/marketing/ia-marketing-contenu',
  'https://www.hubspot.fr/social-media-marketing',
  'https://www.ladn.eu/media-mutants/ecoute-active-cle-communication/',
  'https://www.lefigaro.fr/secteur/high-tech/l-intelligence-artificielle-va-bouleverser-la-prospection-commerciale-20231205',
  'https://www.marketingdonut.co.uk/',
  'https://www.mobilemarketingassociationfrance.com/',
  'https://www.salesforce.com/blog/5-ways-marketing-automation-can-improve-roi/',
  'https://www.salesforce.com/eu/blog/2021/05/how-to-use-automation-tools.html',
  'https://www.salesforce.com/fr/blog/',
  'https://www.salesforce.com/fr/learning-centre/tech/what-is-automation/',
  'https://www.salesforce.com/products/marketing-cloud/best-practices/email-efficiency/',
  'https://www.salesforce.com/resources/articles/sales-prospecting/',
  'https://www.searchenginejournal.com/artificial-intelligence-the-future-of-content-creation/391521/',
  'https://www.searchenginejournal.com/digital-marketing-strategy-guide/',
  'https://www.searchenginejournal.com/mobile-seo/checklist-ranked/',
  'https://www.searchenginejournal.com/seo-content-guide/',
  'https://www.shopify.fr/blog/automatiser-relations-clients',
  'https://www.techradar.com/best/best-seo-tools',
  'https://www.techradar.com/best/best-workflow-management-software',
  'https://www.zdnet.com/article/implementing-automation-for-business-efficiency/',
  'https://www.ladn.eu/media-mutants/ecoute-active-cle-communication/',
]

// ─── Extraction du contexte depuis Sanity ────────────────────────────────────

function extractLinkContext(post, href) {
  const body = post.body || []
  const hits = []

  for (let i = 0; i < body.length; i++) {
    const block = body[i]
    if (block._type !== 'block') continue

    const def = block.markDefs?.find(d => d._type === 'link' && d.href === href)
    if (!def) continue

    const anchorSpans = (block.children || []).filter(c => c.marks?.includes(def._key))
    const anchorText = anchorSpans.map(s => s.text || '').join('').trim()
    const paragraphText = (block.children || []).map(s => s.text || '').join('').trim()

    // Contexte étendu (blocs adjacents)
    const prevBlock = i > 0 ? body[i - 1] : null
    const nextBlock = i < body.length - 1 ? body[i + 1] : null
    const prevText = prevBlock?._type === 'block'
      ? (prevBlock.children || []).map(s => s.text || '').join('').trim()
      : ''
    const nextText = nextBlock?._type === 'block'
      ? (nextBlock.children || []).map(s => s.text || '').join('').trim()
      : ''

    hits.push({ anchorText, paragraphText, prevText, nextText, defKey: def._key, blockIndex: i })
  }

  return hits
}

// ─── Vérification HTTP d'une URL ─────────────────────────────────────────────

async function checkUrl(url) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  try {
    let res = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: ctrl.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; LinkVerifier/1.0)' },
    })
    if (res.status === 405) {
      res = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: ctrl.signal,
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; LinkVerifier/1.0)' },
      })
    }
    clearTimeout(timer)
    return { status: res.status, ok: res.status >= 200 && res.status < 400 }
  } catch (e) {
    clearTimeout(timer)
    return { status: 0, ok: false, error: e.message }
  }
}

// ─── Appel Claude pour suggestion d'URL ──────────────────────────────────────

async function suggestReplacement(ctx) {
  const { slug, anchorText, paragraphText, originalUrl, previousAttempt } = ctx

  const retryNote = previousAttempt
    ? `\nATTENTION : tu as déjà suggéré "${previousAttempt}" mais cette URL renvoie une erreur. Propose une URL différente.\n`
    : ''

  const prompt = `Tu aides à corriger des liens cassés sur un blog B2B français sur l'automatisation commerciale et le SEO (salesexperienz.fr).

Un lien est cassé (HTTP 404/500). Propose une URL de remplacement valide et pertinente.
${retryNote}
Article : ${slug}
Texte d'ancre du lien : "${anchorText}"
Paragraphe contenant le lien : "${paragraphText.slice(0, 400)}"
URL cassée originale : ${originalUrl}

Règles :
- Réponds avec UNE SEULE URL, rien d'autre (pas d'explication, pas de markdown)
- L'URL doit exister et être accessible aujourd'hui
- Préfère les sources autoritaires : HubSpot, Salesforce, Google, McKinsey, Forrester, Gartner, Harvard Business Review, SEMrush, Ahrefs, Search Engine Journal, Moz
- Pour les URL HBR cassées, essaie le même chemin avec /2024/ ou /2023/ ou cherche le bon slug
- Pour Moz, préfère moz.com/learn/seo/ plutôt que des articles de blog qui changent
- Pour Salesforce FR, utilise https://www.salesforce.com/fr/resources/ ou https://www.salesforce.com/fr/blog/
- Si aucune URL valide ne te vient, réponds exactement : SUPPRIMER`

  const message = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 200,
    messages: [{ role: 'user', content: prompt }],
  })

  const raw = message.content[0]?.text?.trim() || ''
  // Extrait la première ligne et nettoie
  const url = raw.split('\n')[0].trim().replace(/[`'"]/g, '')
  return url
}

// ─── Application du patch Sanity ─────────────────────────────────────────────

function applyReplacement(body, defKey, newHref) {
  return body.map(block => {
    if (block._type !== 'block') return block
    const def = block.markDefs?.find(d => d._key === defKey)
    if (!def) return block
    return {
      ...block,
      markDefs: block.markDefs.map(d =>
        d._key === defKey ? { ...d, href: newHref } : d
      ),
    }
  })
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`🔧 Phase 3 — Remplacement liens externes cassés (${DRY_RUN ? 'DRY RUN' : 'ÉCRITURE SANITY'})`)
  console.log(`📋 ${BROKEN_URLS.length} URLs à traiter`)
  console.log('─'.repeat(60))

  // Charge tous les articles une seule fois
  const posts = await sanity.fetch(`*[_type == "post"]{_id, slug, body}`)
  console.log(`📚 ${posts.length} articles chargés\n`)

  // Déduplique la liste
  const uniqueUrls = [...new Set(BROKEN_URLS)]

  const proposals = []

  for (const brokenUrl of uniqueUrls) {
    // Trouve tous les articles contenant cette URL
    const matches = []
    for (const post of posts) {
      const hits = extractLinkContext(post, brokenUrl)
      hits.forEach(h => matches.push({ post, ...h }))
    }

    if (matches.length === 0) {
      console.log(`⚠️  Non trouvé en base : ${brokenUrl}`)
      continue
    }

    for (const match of matches) {
      const slug = match.post.slug?.current ?? match.post._id
      console.log(`\n📄 ${slug}`)
      console.log(`   🔗 Ancre : "${match.anchorText}"`)
      console.log(`   ❌ Cassé : ${brokenUrl}`)

      // Essai 1
      let suggestion = await suggestReplacement({
        slug,
        anchorText: match.anchorText,
        paragraphText: match.paragraphText,
        originalUrl: brokenUrl,
      })

      let verified = false
      let finalUrl = null

      if (suggestion === 'SUPPRIMER') {
        console.log(`   🗑️  Claude : suppression recommandée`)
        finalUrl = null
      } else {
        console.log(`   💡 Suggestion : ${suggestion}`)
        const check = await checkUrl(suggestion)
        console.log(`   ${check.ok ? '✅' : '❌'} Vérif HTTP : ${check.status}`)

        if (check.ok) {
          verified = true
          finalUrl = suggestion
        } else {
          // Essai 2 avec retour sur l'échec
          await sleep(500)
          suggestion = await suggestReplacement({
            slug,
            anchorText: match.anchorText,
            paragraphText: match.paragraphText,
            originalUrl: brokenUrl,
            previousAttempt: suggestion,
          })

          if (suggestion !== 'SUPPRIMER') {
            console.log(`   💡 Suggestion 2 : ${suggestion}`)
            const check2 = await checkUrl(suggestion)
            console.log(`   ${check2.ok ? '✅' : '❌'} Vérif HTTP : ${check2.status}`)
            if (check2.ok) {
              verified = true
              finalUrl = suggestion
            }
          }
        }
      }

      const proposal = {
        articleSlug: slug,
        originalUrl: brokenUrl,
        anchorText: match.anchorText,
        suggestedUrl: finalUrl,
        verified,
        action: finalUrl ? 'replace' : 'delete_link',
        defKey: match.defKey,
        postId: match.post._id,
      }
      proposals.push(proposal)

      if (!DRY_RUN && (finalUrl || proposal.action === 'delete_link')) {
        let newBody
        if (finalUrl) {
          newBody = applyReplacement(match.post.body, match.defKey, finalUrl)
        } else {
          // Supprime le markDef et retire la marque des spans
          newBody = match.post.body.map(block => {
            if (block._type !== 'block') return block
            const hasDef = block.markDefs?.some(d => d._key === match.defKey)
            if (!hasDef) return block
            return {
              ...block,
              markDefs: block.markDefs.filter(d => d._key !== match.defKey),
              children: block.children.map(span => ({
                ...span,
                marks: span.marks?.filter(m => m !== match.defKey) || [],
              })),
            }
          })
        }

        // Met à jour le post en mémoire pour les prochaines itérations
        match.post.body = newBody
        await sanity.patch(match.post._id).set({ body: newBody }).commit()
        console.log(`   → Sanity patché ✓`)
      }

      await sleep(DELAY_BETWEEN_CALLS)
    }
  }

  // Rapport final
  const reportPath = 'scripts/rapport-liens-externes.json'
  const report = {
    date: new Date().toISOString(),
    dryRun: DRY_RUN,
    total: proposals.length,
    replaced: proposals.filter(p => p.verified).length,
    deleted: proposals.filter(p => p.action === 'delete_link').length,
    unresolved: proposals.filter(p => !p.verified && p.action !== 'delete_link').length,
    proposals,
  }
  await writeFile(reportPath, JSON.stringify(report, null, 2))

  console.log('\n' + '═'.repeat(60))
  console.log(`✅ Terminé`)
  console.log(`   ✅ ${report.replaced} liens remplacés`)
  console.log(`   🗑️  ${report.deleted} liens supprimés`)
  console.log(`   ⚠️  ${report.unresolved} non résolus`)
  console.log(`💾 Rapport : ${reportPath}`)
  if (DRY_RUN) console.log('\n⚠️  Mode dry-run — relancer sans --dry-run pour appliquer.')
}

main().catch(console.error)
