/**
 * fix-wp-externes.mjs
 * Remplace les liens externes cassés via Claude API
 * Produit un fichier SQL à importer dans phpMyAdmin
 *
 * Usage :
 *   ANTHROPIC_API_KEY=sk-ant-... node scripts-wp/fix-wp-externes.mjs --dry-run
 *   ANTHROPIC_API_KEY=sk-ant-... node scripts-wp/fix-wp-externes.mjs
 *
 * Prérequis : scripts-wp/rapport-analyse.json (généré par analyse-rapport.mjs)
 * Sortie    : scripts-wp/fix-wp-externes.sql  (à importer dans phpMyAdmin)
 *             scripts-wp/rapport-externes.json (log des propositions)
 */

import Anthropic from '@anthropic-ai/sdk'
import { readFile, writeFile } from 'fs/promises'

// ─── Config ───────────────────────────────────────────────────────────────────

const DRY_RUN      = process.argv.includes('--dry-run')
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY

if (!ANTHROPIC_KEY) {
  console.error('❌  ANTHROPIC_API_KEY manquant.')
  console.error('    Lance : ANTHROPIC_API_KEY=sk-ant-... node scripts-wp/fix-wp-externes.mjs')
  process.exit(1)
}

const TIMEOUT_MS          = 10_000
const DELAY_BETWEEN_CALLS = 800
const DB_PREFIX           = 'wp_'   // ← vérifier dans wp-config.php

const anthropic = new Anthropic({ apiKey: ANTHROPIC_KEY })

// ─── Vérification HTTP ────────────────────────────────────────────────────────

async function checkUrl(url) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  try {
    let res = await fetch(url, {
      method: 'HEAD', redirect: 'follow', signal: ctrl.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; LinkVerifier/1.0)' },
    })
    if (res.status === 405) {
      res = await fetch(url, {
        method: 'GET', redirect: 'follow', signal: ctrl.signal,
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

// ─── Appel Claude ─────────────────────────────────────────────────────────────

async function suggestReplacement({ siteUrl, pageUrl, anchorText, context, originalUrl, previousAttempt }) {
  const retryNote = previousAttempt
    ? `\nATTENTION : tu as déjà suggéré "${previousAttempt}" mais cette URL renvoie une erreur. Propose une URL différente.\n`
    : ''

  const prompt = `Tu aides à corriger des liens cassés sur un site WordPress (${siteUrl}).
Un lien est cassé (HTTP 404/500/0). Propose une URL de remplacement valide et pertinente.
${retryNote}
Page source : ${pageUrl}
Texte d'ancre : "${anchorText}"
Contexte autour du lien : "${context?.slice(0, 400) ?? ''}"
URL cassée originale : ${originalUrl}

Règles :
- Réponds avec UNE SEULE URL, rien d'autre (pas d'explication, pas de markdown)
- L'URL doit exister et être accessible aujourd'hui
- Préfère les sources autoritaires du secteur
- Si aucune URL valide ne te vient, réponds exactement : SUPPRIMER`

  const msg = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 200,
    messages: [{ role: 'user', content: prompt }],
  })

  return msg.content[0]?.text?.trim().split('\n')[0].trim().replace(/[`'"]/g, '') || 'SUPPRIMER'
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

// ─── Génération SQL ───────────────────────────────────────────────────────────

function sqlReplace(oldUrl, newUrl) {
  const table = `${DB_PREFIX}posts`
  const oldEsc = oldUrl.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
  const newEsc = newUrl.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
  return `UPDATE ${table} SET post_content = REPLACE(post_content, '${oldEsc}', '${newEsc}') WHERE post_content LIKE '%${oldEsc}%' AND post_status IN ('publish', 'draft');`
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`🔧 Liens externes — remplacement via Claude (${DRY_RUN ? 'DRY RUN — SQL généré seulement' : 'SQL GÉNÉRÉ'})`)

  let analyse
  try {
    analyse = JSON.parse(await readFile('scripts-wp/rapport-analyse.json', 'utf-8'))
  } catch {
    console.error('❌ scripts-wp/rapport-analyse.json introuvable. Lance d\'abord analyse-rapport.mjs')
    process.exit(1)
  }

  const externalBroken = analyse.externalBroken
  console.log(`📋 ${externalBroken.length} liens externes à traiter`)
  console.log('─'.repeat(60))

  const proposals = []
  const sqlLines = [
    `-- fix-wp-externes.sql`,
    `-- Généré le ${new Date().toISOString()}`,
    `-- Site : ${analyse.siteUrl}`,
    `--`,
    `-- Importer dans phpMyAdmin (onglet SQL) ou via SSH :`,
    `--   mysql -u USER -p NOM_BASE < fix-wp-externes.sql`,
    ``,
    `SET NAMES utf8mb4;`,
    ``,
  ]

  for (const link of externalBroken) {
    const { href: brokenUrl, anchors, contexts, pages } = link
    const anchorText = anchors[0] || ''
    const context = contexts[0] || ''
    const pageUrl = pages[0] || ''

    console.log(`\n🔗 ${brokenUrl}`)
    console.log(`   Ancre : "${anchorText}" | ${link.count} occurrence(s)`)

    // Essai 1
    let suggestion = await suggestReplacement({
      siteUrl: analyse.siteUrl, pageUrl, anchorText, context, originalUrl: brokenUrl,
    })

    let verified = false
    let finalUrl = null

    if (suggestion === 'SUPPRIMER') {
      console.log(`   🗑️  Claude : suppression recommandée`)
    } else {
      console.log(`   💡 Suggestion 1 : ${suggestion}`)
      const check = await checkUrl(suggestion)
      console.log(`   ${check.ok ? '✅' : '❌'} HTTP ${check.status}`)

      if (check.ok) {
        verified = true
        finalUrl = suggestion
      } else {
        // Essai 2
        await sleep(500)
        suggestion = await suggestReplacement({
          siteUrl: analyse.siteUrl, pageUrl, anchorText, context,
          originalUrl: brokenUrl, previousAttempt: suggestion,
        })

        if (suggestion !== 'SUPPRIMER') {
          console.log(`   💡 Suggestion 2 : ${suggestion}`)
          const check2 = await checkUrl(suggestion)
          console.log(`   ${check2.ok ? '✅' : '❌'} HTTP ${check2.status}`)
          if (check2.ok) { verified = true; finalUrl = suggestion }
        }
      }
    }

    proposals.push({
      originalUrl: brokenUrl,
      anchorText,
      suggestedUrl: finalUrl,
      verified,
      action: finalUrl ? 'replace' : 'delete',
      occurrences: link.count,
      pages,
    })

    if (finalUrl) {
      sqlLines.push(`-- Remplace : ${brokenUrl}`)
      sqlLines.push(`-- Par      : ${finalUrl}`)
      sqlLines.push(sqlReplace(brokenUrl, finalUrl))
      sqlLines.push('')
    } else {
      sqlLines.push(`-- SUPPRIMER (aucune URL valide) : ${brokenUrl}`)
      sqlLines.push(`-- Texte d'ancre : "${anchorText}"`)
      sqlLines.push(`-- Pages concernées : ${pages.slice(0, 3).join(', ')}`)
      sqlLines.push(`-- → Corriger manuellement dans l'éditeur WordPress`)
      sqlLines.push('')
    }

    await sleep(DELAY_BETWEEN_CALLS)
  }

  // Sorties
  const sqlPath    = 'scripts-wp/fix-wp-externes.sql'
  const reportPath = 'scripts-wp/rapport-externes.json'

  await writeFile(sqlPath, sqlLines.join('\n'))
  await writeFile(reportPath, JSON.stringify({
    date: new Date().toISOString(),
    siteUrl: analyse.siteUrl,
    total: proposals.length,
    replaced: proposals.filter(p => p.verified).length,
    toDeleteManually: proposals.filter(p => p.action === 'delete').length,
    proposals,
  }, null, 2))

  const replaced = proposals.filter(p => p.verified).length
  const toDelete = proposals.filter(p => p.action === 'delete').length

  console.log('\n' + '═'.repeat(60))
  console.log(`✅ Terminé`)
  console.log(`   ✅ ${replaced} liens → remplacements SQL générés`)
  console.log(`   🗑️  ${toDelete} liens → correction manuelle requise (commentés dans le SQL)`)
  console.log(`💾 ${sqlPath}  ← importer dans phpMyAdmin`)
  console.log(`📋 ${reportPath}`)

  if (DRY_RUN || true) {
    console.log('\n📌 Prochaine étape :')
    console.log('   1. Ouvrir fix-wp-externes.sql, vérifier les requêtes')
    console.log('   2. phpMyAdmin → onglet SQL → coller + exécuter')
    console.log('   3. Vider le cache WordPress')
    console.log('   4. Relancer audit-wp.mjs pour vérifier')
  }
}

main().catch(console.error)
