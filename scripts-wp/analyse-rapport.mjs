/**
 * analyse-rapport.mjs
 * Lit rapport-wp.json et produit une liste priorisée des liens à corriger
 * Groupe les occurrences par URL cible et trie par fréquence
 *
 * Usage  : node scripts-wp/analyse-rapport.mjs
 * Sortie : scripts-wp/rapport-analyse.json + scripts-wp/rapport-analyse.md
 */

import { readFile, writeFile } from 'fs/promises'

const raw = await readFile('scripts-wp/rapport-wp.json', 'utf-8').catch(() => {
  console.error('❌ scripts-wp/rapport-wp.json introuvable. Lance d\'abord audit-wp.mjs')
  process.exit(1)
})

const report = JSON.parse(raw)

// Agréger par URL cible
const linkMap = new Map()

for (const page of report.results) {
  for (const link of (page.brokenLinks || [])) {
    if (!linkMap.has(link.href)) {
      linkMap.set(link.href, {
        href: link.href,
        status: link.status,
        isInternal: link.isInternal,
        count: 0,
        pages: [],
        anchors: new Set(),
        contexts: [],
      })
    }
    const e = linkMap.get(link.href)
    e.count++
    e.pages.push(page.pageUrl)
    if (link.text) e.anchors.add(link.text)
    if (link.context) e.contexts.push(link.context)
  }
}

const all = [...linkMap.values()].map(e => ({
  ...e,
  anchors: [...e.anchors],
  contexts: [...new Set(e.contexts)],
}))

const internal = all.filter(l => l.isInternal).sort((a, b) => b.count - a.count)
const external = all.filter(l => !l.isInternal).sort((a, b) => b.count - a.count)

const output = {
  generatedAt: new Date().toISOString(),
  siteUrl: report.siteUrl,
  summary: {
    uniqueInternalBroken: internal.length,
    uniqueExternalBroken: external.length,
    totalOccurrences: all.reduce((s, l) => s + l.count, 0),
  },
  internalBroken: internal,
  externalBroken: external,
}

await writeFile('scripts-wp/rapport-analyse.json', JSON.stringify(output, null, 2))

// Markdown
const d = new Date().toLocaleDateString('fr-FR')
let md = `# Analyse priorisée — liens cassés WordPress\n\n`
md += `Généré le ${d} — Site : ${report.siteUrl}\n\n`
md += `## Résumé\n`
md += `- Liens internes cassés (uniques) : **${internal.length}**\n`
md += `- Liens externes cassés (uniques) : **${external.length}**\n`
md += `- Occurrences totales : **${output.summary.totalOccurrences}**\n\n`

md += `## 🔴 Liens internes cassés — à corriger en priorité\n\n`
if (internal.length === 0) {
  md += `_Aucun lien interne cassé._\n\n`
} else {
  md += `| # | URL cassée | Code | Occurrences | Pages (extrait) |\n|---|---|---|---|---|\n`
  internal.forEach((l, i) => {
    const pages = l.pages.slice(0, 2).join(', ') + (l.pages.length > 2 ? '…' : '')
    md += `| ${i + 1} | \`${l.href}\` | ${l.status} | ${l.count} | ${pages} |\n`
  })
  md += '\n'
  md += `### Comment corriger les liens internes\n`
  md += `1. WordPress admin → Articles → ouvrir chaque article concerné\n`
  md += `2. Rechercher l'URL cassée avec Ctrl+F dans l'éditeur\n`
  md += `3. Remplacer par la bonne URL (slug correct ou page existante)\n`
  md += `4. **Ou** : configurer une redirection 301 dans le plugin Redirection\n\n`
}

md += `## 🟠 Liens externes cassés — à corriger via Claude\n\n`
if (external.length === 0) {
  md += `_Aucun lien externe cassé._\n\n`
} else {
  md += `| # | URL cassée | Code | Occurrences | Ancre principale |\n|---|---|---|---|---|\n`
  external.forEach((l, i) => {
    md += `| ${i + 1} | \`${l.href}\` | ${l.status} | ${l.count} | ${l.anchors[0] || '—'} |\n`
  })
  md += '\n'
}

await writeFile('scripts-wp/rapport-analyse.md', md)

console.log('✅ Analyse terminée')
console.log(`   🔴 ${internal.length} liens internes uniques cassés`)
console.log(`   🟠 ${external.length} liens externes uniques cassés`)
console.log(`   📊 ${output.summary.totalOccurrences} occurrences totales`)
console.log('─'.repeat(60))
console.log('💾 scripts-wp/rapport-analyse.json')
console.log('📝 scripts-wp/rapport-analyse.md')
console.log('\n→ Étapes suivantes :')
console.log('  1. Liens internes → fix-wp-liens.php (upload FTP) ou correction manuelle WP')
console.log('  2. Liens externes → ANTHROPIC_API_KEY=sk-... node scripts-wp/fix-wp-externes.mjs --dry-run')
