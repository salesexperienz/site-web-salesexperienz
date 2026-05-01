<?php
/**
 * fix-wp-liens.php
 * Corrige les liens cassés dans la base de données WordPress via REPLACE SQL
 *
 * Upload via FTP à la racine du site WordPress (à côté de wp-config.php)
 * Accès : https://votre-site.com/fix-wp-liens.php?key=VOTRE_CLE
 *
 * Étapes :
 *   1. Renseigner SECRET_KEY, les credentials DB et les PATTERNS
 *   2. Ouvrir https://votre-site.com/fix-wp-liens.php?key=VOTRE_CLE   (dry-run)
 *   3. Vérifier le tableau de résultats
 *   4. Ajouter &apply=1 à l'URL pour appliquer les modifications
 *   5. Supprimer ce fichier du serveur après utilisation
 */

// ─── Sécurité ─────────────────────────────────────────────────────────────────

define('SECRET_KEY', 'changez-cette-cle-secrete-maintenant');  // ← OBLIGATOIRE

if (!isset($_GET['key']) || $_GET['key'] !== SECRET_KEY) {
    http_response_code(403);
    die('403 — Accès refusé. URL correcte : ?key=VOTRE_CLE');
}

// ─── Mode ─────────────────────────────────────────────────────────────────────

$DRY_RUN = !isset($_GET['apply']);   // dry-run par défaut

// ─── Credentials DB ───────────────────────────────────────────────────────────
// Copier exactement depuis wp-config.php

define('WP_DB_HOST',   'localhost');          // DB_HOST dans wp-config.php
define('WP_DB_NAME',   'nom_de_la_base');     // DB_NAME dans wp-config.php
define('WP_DB_USER',   'utilisateur_db');     // DB_USER dans wp-config.php
define('WP_DB_PASS',   'mot_de_passe_db');    // DB_PASSWORD dans wp-config.php
define('WP_DB_PREFIX', 'wp_');               // table_prefix dans wp-config.php (souvent wp_)

// ─── Patterns de correction ───────────────────────────────────────────────────
// Format : 'ancienne_url' => 'nouvelle_url'
// Les patterns sont appliqués dans l'ordre — du plus spécifique au plus général.
// Les URLs sont cherchées dans post_content des articles publiés ET brouillons.

$PATTERNS = [

    // === REDIRECTIONS D'ARTICLES INTERNES ===
    // (slug renommé, page supprimée → nouvelle URL)
    // 'https://www.votre-site.com/ancien-slug' => 'https://www.votre-site.com/nouveau-slug',

    // === CHANGEMENT DE DOMAINE ===
    // 'https://ancien-domaine.com' => 'https://nouveau-domaine.com',

    // === LIENS EXTERNES SIMPLES ===
    // (quand l'URL a juste changé de chemin)
    // 'https://www.exemple.com/page-supprimee' => 'https://www.exemple.com/nouvelle-page',

    // === EXEMPLES À REMPLACER ===
    // À compléter depuis rapport-analyse.md (section liens internes cassés)

];

// ─── Connexion DB ─────────────────────────────────────────────────────────────

$db = new mysqli(WP_DB_HOST, WP_DB_USER, WP_DB_PASS, WP_DB_NAME);
if ($db->connect_error) {
    die('❌ Connexion DB impossible : ' . htmlspecialchars($db->connect_error));
}
$db->set_charset('utf8mb4');

$table = WP_DB_PREFIX . 'posts';
$statuses = "'publish', 'draft'";

// ─── HTML ─────────────────────────────────────────────────────────────────────
?>
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Fix WP Liens</title>
<style>
  body  { font-family: system-ui, sans-serif; max-width: 960px; margin: 40px auto; padding: 20px; color: #333; }
  h1    { font-size: 1.4em; }
  .banner { padding: 12px 16px; border-left: 5px solid; margin-bottom: 24px; border-radius: 2px; }
  .dry  { background: #fff3cd; border-color: #f0a500; }
  .live { background: #d4edda; border-color: #28a745; }
  .warn { background: #f8d7da; border-color: #dc3545; }
  table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 13px; }
  th,td { border: 1px solid #dee2e6; padding: 8px 12px; text-align: left; vertical-align: top; }
  th    { background: #f8f9fa; font-weight: 600; }
  code  { background: #f1f3f5; padding: 2px 5px; border-radius: 3px; font-size: 12px; word-break: break-all; }
  .zero { color: #999; }
  .hit  { color: #28a745; font-weight: 600; }
  .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #dee2e6; font-size: 13px; color: #666; }
</style>
</head>
<body>
<h1>🔧 Fix WP Liens</h1>

<?php if ($DRY_RUN): ?>
<div class="banner dry">
  ⚠️ <strong>Mode DRY-RUN</strong> — Aucune modification en base. Ajoutez <code>&amp;apply=1</code> à l'URL pour appliquer.
</div>
<?php else: ?>
<div class="banner live">
  ✅ <strong>Mode ÉCRITURE</strong> — Les corrections sont appliquées en base de données.
</div>
<?php endif; ?>

<?php if (empty($PATTERNS)): ?>
<div class="banner warn">
  ⚠️ Aucun pattern configuré dans <code>$PATTERNS</code>. Remplir la liste des patterns en haut du fichier.
</div>
<?php else: ?>

<table>
  <thead>
    <tr>
      <th>#</th>
      <th>URL à remplacer</th>
      <th>Remplacée par</th>
      <th>Posts trouvés</th>
      <th>Statut</th>
    </tr>
  </thead>
  <tbody>
<?php

$totalPatterns = 0;
$totalPosts = 0;

foreach ($PATTERNS as $oldUrl => $newUrl) {
    $totalPatterns++;
    $like = '%' . $db->real_escape_string($oldUrl) . '%';

    // Compte les posts concernés
    $stmt = $db->prepare("SELECT COUNT(*), GROUP_CONCAT(post_title ORDER BY ID SEPARATOR ' | ') FROM {$table} WHERE post_content LIKE ? AND post_status IN ({$statuses})");
    $stmt->bind_param('s', $like);
    $stmt->execute();
    $stmt->bind_result($count, $titles);
    $stmt->fetch();
    $stmt->close();

    $affected = 0;
    if (!$DRY_RUN && $count > 0 && $newUrl) {
        $stmt2 = $db->prepare("UPDATE {$table} SET post_content = REPLACE(post_content, ?, ?) WHERE post_content LIKE ? AND post_status IN ({$statuses})");
        $stmt2->bind_param('sss', $oldUrl, $newUrl, $like);
        $stmt2->execute();
        $affected = $stmt2->affected_rows;
        $stmt2->close();
        $totalPosts += $affected;
    } elseif (!$DRY_RUN && $count > 0 && !$newUrl) {
        // URL vide : pas appliqué automatiquement — corriger manuellement
        $affected = -1;
    }

    $countClass = $count > 0 ? 'hit' : 'zero';
    $newDisplay = $newUrl ?: '<em style="color:#dc3545">— URL vide, correction manuelle requise</em>';
    $status = $DRY_RUN ? ($count > 0 ? '⏳ En attente' : '—') : ($affected > 0 ? "✅ {$affected} modifié(s)" : ($affected === -1 ? '⚠️ Manuel' : '— Aucun'));

    echo "<tr>";
    echo "<td>{$totalPatterns}</td>";
    echo "<td><code>" . htmlspecialchars($oldUrl) . "</code></td>";
    echo "<td>{$newDisplay}</td>";
    echo "<td class='{$countClass}'>{$count}" . ($titles ? "<br><small style='color:#666'>" . htmlspecialchars(mb_substr($titles, 0, 200)) . "</small>" : '') . "</td>";
    echo "<td>{$status}</td>";
    echo "</tr>";
}

?>
  </tbody>
</table>

<?php if (!$DRY_RUN): ?>
<p style="margin-top:16px; color:#28a745; font-weight:600;">✅ Terminé — ~<?= $totalPosts ?> posts modifiés.</p>
<?php endif; ?>

<?php endif; ?>

<div class="footer">
  <?php if ($DRY_RUN): ?>
    <p><strong>Prochaine étape :</strong> si les résultats sont corrects, ajoutez <code>&amp;apply=1</code> à l'URL.</p>
  <?php else: ?>
    <p>⚠️ <strong>Pensez à :</strong> vider le cache WordPress (W3 Total Cache, WP Super Cache, LiteSpeed…) et à <strong>supprimer ce fichier du serveur via FTP</strong>.</p>
  <?php endif; ?>
  <p style="color:#999">fix-wp-liens.php — à supprimer après utilisation</p>
</div>
</body>
</html>
<?php
$db->close();
