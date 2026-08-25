#!/usr/bin/env node
/*
 * Embeds a fresh copy of assets/style.css into brand-experience.html's
 * #fallbackCss <script type="text/plain"> tag, so the customizer still
 * works when opened directly as a file:// URL (no server), where
 * cross-origin fetch() of assets/style.css is blocked by the browser.
 *
 * Run this after any edit to assets/style.css that you want reflected
 * when brand-experience.html is opened by double-clicking the file:
 *
 *   node tools/sync-theme-fallback.js
 *
 * On http(s):// (a local dev server, or GitHub Pages) the customizer
 * always fetches the real assets/style.css directly instead — this
 * embedded copy is only ever used as the file:// fallback.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const cssPath = path.join(root, 'assets', 'style.css');
const htmlPath = path.join(root, 'brand-experience.html');

const css = fs.readFileSync(cssPath, 'utf8');
if (!/:root\s*\{/.test(css)) {
  console.error('assets/style.css does not contain a :root block — aborting.');
  process.exit(1);
}

// text/plain script content is read verbatim via .textContent, so the only
// character that needs escaping is a literal "</script>" sequence.
const safe = css.replace(/<\/script>/gi, '<\\/script>');

let html = fs.readFileSync(htmlPath, 'utf8');
const re = /(<script type="text\/plain" id="fallbackCss">)([\s\S]*?)(<\/script>)/;
if (!re.test(html)) {
  console.error('Could not find the #fallbackCss <script> tag in brand-experience.html — aborting.');
  process.exit(1);
}
html = html.replace(re, (_, open, _old, close) => open + safe + close);

fs.writeFileSync(htmlPath, html);
console.log(`Embedded ${css.length} bytes from assets/style.css into brand-experience.html's #fallbackCss.`);
