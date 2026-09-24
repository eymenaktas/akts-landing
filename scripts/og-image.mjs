// Discord, X, WhatsApp gibi yerlerde bağlantı önizlemesi için 1200x630 görsel üretir.
// Düzen cpvp.io'daki kartla aynı: solda logo, sağda büyük başlık, renkli alt başlık,
// gri kısa açıklama, altta renk şeridi. Harness'in Playwright/Chromium kurulumunu kullanır.
//
//   node scripts/og-image.mjs ayar.json
//
// ayar.json: { "out": "public/og.png", "logo": "public/favicon.svg", "title": "...",
//   "subtitle": "...", "tagline": "...", "accent": "#bb2a2a", "accent2": "#8b6cff",
//   "bg": "#0a0a0a", "logoRadius": 0, "pixelated": false }
import { readFileSync } from 'node:fs';
import { resolve, dirname, extname } from 'node:path';
import { homedir } from 'node:os';
import { createRequire } from 'node:module';

const require = createRequire(resolve(homedir(), 'harness/tools/package.json'));
const { chromium } = require('playwright');

const cfgPath = resolve(process.argv[2]);
const cfg = JSON.parse(readFileSync(cfgPath, 'utf8'));
const base = dirname(cfgPath);
const logoFile = resolve(base, cfg.logo);
const mime = { '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp' };
const logo = `data:${mime[extname(logoFile).toLowerCase()]};base64,${readFileSync(logoFile).toString('base64')}`;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const accent = cfg.accent || '#bb2a2a';
const accent2 = cfg.accent2 || accent;
const bg = cfg.bg || '#0a0a0a';

const html = `<!doctype html><html lang="tr"><head><meta charset="utf-8"><style>
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; overflow: hidden; background: ${bg};
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif; color: #fff; -webkit-font-smoothing: antialiased; }
  .card { position: relative; width: 1200px; height: 630px; display: flex; align-items: center; gap: 64px; padding: 0 96px 12px; }
  .glow { position: absolute; inset: 0;
    background:
      radial-gradient(520px 420px at 250px 315px, color-mix(in srgb, ${accent} 30%, transparent), transparent 70%),
      radial-gradient(640px 520px at 1100px 80px, color-mix(in srgb, ${accent2} 18%, transparent), transparent 70%); }
  .grid { position: absolute; inset: 0; opacity: .5;
    background-image: linear-gradient(#ffffff0d 1px, transparent 1px), linear-gradient(90deg, #ffffff0d 1px, transparent 1px);
    background-size: 48px 48px; mask-image: radial-gradient(900px 500px at 60% 50%, #000, transparent); }
  .logo { position: relative; width: 300px; height: 300px; flex: none; display: grid; place-items: center; }
  .logo img { width: 100%; height: 100%; object-fit: contain; border-radius: ${cfg.logoRadius || 0}px;
    ${cfg.pixelated ? 'image-rendering: pixelated;' : ''} filter: drop-shadow(0 24px 48px #0009); }
  .text { position: relative; display: flex; flex-direction: column; gap: 18px; min-width: 0; }
  h1 { font-size: ${cfg.titleSize || 112}px; line-height: 1; font-weight: 800; letter-spacing: -.035em; }
  .sub { font-size: 30px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: ${accent}; }
  .tag { font-size: 27px; line-height: 1.35; color: #b8b8c0; }
  .bar { position: absolute; left: 0; right: 0; bottom: 0; height: 12px; background: linear-gradient(90deg, ${accent}, ${accent2}); }
</style></head><body><div class="card">
  <div class="glow"></div><div class="grid"></div>
  <div class="logo"><img src="${logo}" alt=""></div>
  <div class="text"><h1>${esc(cfg.title)}</h1><div class="sub">${esc(cfg.subtitle)}</div><div class="tag">${esc(cfg.tagline)}</div></div>
  <div class="bar"></div>
</div></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'load' });
await page.screenshot({ path: resolve(base, cfg.out), type: extname(cfg.out) === '.jpg' ? 'jpeg' : 'png', quality: extname(cfg.out) === '.jpg' ? 90 : undefined });
await browser.close();
console.log(resolve(base, cfg.out));
