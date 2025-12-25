# Random DaFont — Project Documentation

A single-page web application for discovering random fonts from DaFont.com.

---

## Project Structure

```
randomdafont/
├── index.html          # Main page
├── style.css           # Styles
├── app.js              # Client-side logic
├── api/
│   └── proxy.js        # Vercel Serverless function for CORS bypass
├── vercel.json         # Vercel configuration
└── package.json        # Dependencies (empty, for Vercel)
```

---

## Design Features

### Visual Design
- **Color Scheme**: Red (#c00) primary color, light gray background (#f5f5f5)
- **Typography**: Arial Narrow for clean, condensed look
- **Layout**: Centered design with floating refresh button and control buttons
- **Animations**: Smooth transitions (0.15s-0.2s) for hover effects
- **Cards**: Transparent cards with red hover state, showing font preview and details

### Layout Specifications
- **Main Wrapper**:
  - Max width: 1200px
  - Padding top: 14%
  - Positioned with negative body offset (-15vh) for unique vertical centering
- **Gallery Grid**:
  - 3 columns on desktop
  - 24px gap between cards
  - Max width: 1200px
- **Controls**:
  - Refresh button: 64px circle, centered, bottom: 24px
  - Undo/Redo buttons: 40px circles, left side, bottom: 24px
  - Count buttons (3/6): 40px circles, right side, bottom: 24px
- **Responsive**:
  - 2 columns at 1024px
  - 1 column at 768px
  - Smaller controls on mobile (36px buttons, 56px refresh)

### User Interactions
- **Click on font preview/name**: Opens font page on DaFont.com in new tab
- **Refresh button**: Loads new random fonts
- **Undo/Redo**: Navigate through history (max 10 states)
- **Count buttons**: Switch between 3 or 6 fonts per load
- **Skeleton loading**: Shows gray placeholders while fonts load

---

## vercel.json

```json
{
  "rewrites": [
    { "source": "/api/proxy", "destination": "/api/proxy" }
  ]
}
```

---

## package.json

```json
{
  "name": "randomdafont",
  "version": "1.0.0",
  "private": true
}
```

---

## api/proxy.js

Serverless function for proxying requests to DaFont (CORS bypass).

```javascript
export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter required' });
  }

  // Check that URL leads to dafont.com
  if (!url.startsWith('https://www.dafont.com/')) {
    return res.status(403).json({ error: 'Only dafont.com URLs allowed' });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `DaFont returned ${response.status}` });
    }

    const html = await response.text();

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    res.status(200).send(html);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

---

## index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Random DaFont — Discover Random Fonts</title>
  <meta name="description" content="Discover random fonts from DaFont.com. Explore typography from 67 categories.">
  <link rel="stylesheet" href="style.css">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎲</text></svg>">
</head>
<body>
  <header class="header">
    <h1 class="logo">Random<span>DaFont</span></h1>
  </header>

  <div class="main-wrapper">
    <main id="gallery" class="gallery">
    </main>

    <button id="discover" class="btn-refresh" title="Refresh fonts">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
      </svg>
    </button>

    <div class="controls-left">
      <button id="undo" class="btn-icon" disabled title="Undo">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 7v6h6"/>
          <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/>
        </svg>
      </button>
      <button id="redo" class="btn-icon" disabled title="Redo">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 7v6h-6"/>
          <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"/>
        </svg>
      </button>
    </div>

    <div class="controls-right">
      <button class="count-btn active" data-count="3">3</button>
      <button class="count-btn" data-count="6">6</button>
    </div>
  </div>

  <div id="status" class="status"></div>

  <script src="app.js"></script>
</body>
</html>
```

---

## style.css

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Arial Narrow", Arial, sans-serif;
  font-size: 14px;
  color: #333;
  background: #f5f5f5;
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
  top: -15vh;
}

/* Header */
.header {
  text-align: center;
  padding: 32px 24px 24px;
  position: sticky;
  top: 0;
  background: #f5f5f5;
  z-index: 100;
}

.logo {
  font-size: 28px;
  font-weight: 700;
  color: #222;
  display: inline-block;
}

.logo span {
  color: #c00;
}

/* Main wrapper */
.main-wrapper {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 14%;
  min-height: 35vh;
}

/* Gallery */
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  width: 100%;
  max-width: 1200px;
  position: relative;
  z-index: 1;
  margin-bottom: 80px;
}

.gallery.grid-6 {
  grid-template-columns: repeat(3, 1fr);
}

/* Font Card */
.font-card {
  border-radius: 10px;
  overflow: hidden;
  background: transparent;
  border: 1px solid #CECECE;
  transition: background 0.15s, color 0.15s;
  cursor: pointer;
  min-height: 200px;
  position: relative;
}

.font-card:hover {
  background: #c00;
}

.font-card:hover .font-name,
.font-card:hover .font-category {
  color: #fff;
}

.font-preview-container {
  width: 100%;
  height: 140px;
  overflow: hidden;
  background: #fafafa;
  cursor: pointer;
  transition: background 0.15s;
}

.font-card:hover .font-preview-container {
  background: #b00;
}

.font-preview {
  width: 100%;
  height: auto;
  display: block;
  margin-top: -20px;
}

.font-info {
  padding: 12px 16px;
  border-top: 1px solid #CECECE;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  transition: border-color 0.15s;
}

.font-card:hover .font-info {
  border-top-color: rgba(255, 255, 255, 0.3);
}

.font-details {
  flex: 1;
  cursor: pointer;
  min-width: 0;
}

.font-name {
  font-weight: 600;
  font-size: 15px;
  color: #222;
  margin-bottom: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.15s;
}

.font-category {
  font-size: 12px;
  color: #888;
  transition: color 0.15s;
}

/* Skeleton Loading - Simplified */
.font-card.skeleton {
  pointer-events: none;
  background: #e8e8e8;
  border-color: #d5d5d5;
}

/* Refresh Button */
.btn-refresh {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #c00;
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, transform 0.2s;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(204, 0, 0, 0.3);
}

.btn-refresh:hover {
  background: #a00;
  transform: translateX(-50%) scale(1.05);
}

.btn-refresh:active {
  transform: translateX(-50%) scale(0.95);
}

.btn-refresh:disabled {
  background: #999;
  cursor: not-allowed;
  box-shadow: none;
}

.btn-refresh svg {
  flex-shrink: 0;
}

/* Icon buttons (undo/redo) */
.controls-left {
  position: absolute;
  bottom: 24px;
  left: 0;
  display: flex;
  gap: 8px;
  z-index: 5;
}

.btn-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #CECECE;
  color: #555;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}

.btn-icon:hover:not(:disabled) {
  background: #c00;
  color: #fff;
  border-color: #c00;
}

.btn-icon:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.btn-icon svg {
  width: 18px;
  height: 18px;
}

/* Count buttons (3/6) */
.controls-right {
  position: absolute;
  bottom: 24px;
  right: 0;
  display: flex;
  gap: 8px;
  z-index: 5;
}

.count-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #CECECE;
  color: #555;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}

.count-btn:hover {
  background: #f5f5f5;
}

.count-btn.active {
  background: #c00;
  color: #fff;
  border-color: #c00;
}

/* Empty State */
.empty {
  grid-column: 1 / -1;
  text-align: center;
  padding: 80px 20px;
  color: #888;
  font-size: 16px;
}

/* Status - Hidden */
.status {
  display: none;
}

/* Responsive */
@media (max-width: 1024px) {
  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }

  .gallery.grid-6 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  body {
    top: -10vh;
  }

  .main-wrapper {
    padding: 0 16px;
    padding-top: 8vh;
    min-height: 65vh;
  }

  .header {
    padding: 24px 16px 20px;
  }

  .logo {
    font-size: 24px;
  }

  .gallery {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 60px;
  }

  .gallery.grid-6 {
    grid-template-columns: 1fr;
  }

  .controls-left {
    bottom: 20px;
  }

  .controls-right {
    bottom: 20px;
  }

  .btn-icon,
  .count-btn {
    width: 36px;
    height: 36px;
  }

  .btn-icon svg {
    width: 16px;
    height: 16px;
  }

  .count-btn {
    font-size: 14px;
  }

  .btn-refresh {
    width: 56px;
    height: 56px;
    bottom: 20px;
  }
}
```

---

## app.js

```javascript
// ============================================
// CATEGORIES (67 DaFont subcategories)
// ============================================

const ALL_CATEGORIES = [
  // Fancy (18)
  { name: 'Fancy > Cartoon', url: 'https://www.dafont.com/theme.php?cat=101' },
  { name: 'Fancy > Comic', url: 'https://www.dafont.com/theme.php?cat=102' },
  { name: 'Fancy > Groovy', url: 'https://www.dafont.com/theme.php?cat=103' },
  { name: 'Fancy > Old School', url: 'https://www.dafont.com/theme.php?cat=104' },
  { name: 'Fancy > Curly', url: 'https://www.dafont.com/theme.php?cat=105' },
  { name: 'Fancy > Western', url: 'https://www.dafont.com/theme.php?cat=106' },
  { name: 'Fancy > Eroded', url: 'https://www.dafont.com/theme.php?cat=107' },
  { name: 'Fancy > Distorted', url: 'https://www.dafont.com/theme.php?cat=108' },
  { name: 'Fancy > Destroy', url: 'https://www.dafont.com/theme.php?cat=109' },
  { name: 'Fancy > Horror', url: 'https://www.dafont.com/theme.php?cat=110' },
  { name: 'Fancy > Fire, Ice', url: 'https://www.dafont.com/theme.php?cat=111' },
  { name: 'Fancy > Decorative', url: 'https://www.dafont.com/theme.php?cat=112' },
  { name: 'Fancy > Typewriter', url: 'https://www.dafont.com/theme.php?cat=113' },
  { name: 'Fancy > Stencil, Army', url: 'https://www.dafont.com/theme.php?cat=114' },
  { name: 'Fancy > Retro', url: 'https://www.dafont.com/theme.php?cat=115' },
  { name: 'Fancy > Initials', url: 'https://www.dafont.com/theme.php?cat=116' },
  { name: 'Fancy > Grid', url: 'https://www.dafont.com/theme.php?cat=117' },
  { name: 'Fancy > Various', url: 'https://www.dafont.com/theme.php?cat=118' },

  // Foreign look (6)
  { name: 'Foreign > Chinese, Jpn', url: 'https://www.dafont.com/theme.php?cat=201' },
  { name: 'Foreign > Arabic', url: 'https://www.dafont.com/theme.php?cat=202' },
  { name: 'Foreign > Mexican', url: 'https://www.dafont.com/theme.php?cat=203' },
  { name: 'Foreign > Roman, Greek', url: 'https://www.dafont.com/theme.php?cat=204' },
  { name: 'Foreign > Russian', url: 'https://www.dafont.com/theme.php?cat=205' },
  { name: 'Foreign > Various', url: 'https://www.dafont.com/theme.php?cat=206' },

  // Techno (4 + Bitmap)
  { name: 'Techno > Square', url: 'https://www.dafont.com/theme.php?cat=301' },
  { name: 'Techno > LCD', url: 'https://www.dafont.com/theme.php?cat=302' },
  { name: 'Techno > Sci-fi', url: 'https://www.dafont.com/theme.php?cat=303' },
  { name: 'Techno > Various', url: 'https://www.dafont.com/theme.php?cat=304' },
  { name: 'Bitmap', url: 'https://www.dafont.com/bitmap.php' },

  // Gothic (5)
  { name: 'Gothic > Medieval', url: 'https://www.dafont.com/theme.php?cat=401' },
  { name: 'Gothic > Modern', url: 'https://www.dafont.com/theme.php?cat=402' },
  { name: 'Gothic > Celtic', url: 'https://www.dafont.com/theme.php?cat=403' },
  { name: 'Gothic > Initials', url: 'https://www.dafont.com/theme.php?cat=404' },
  { name: 'Gothic > Various', url: 'https://www.dafont.com/theme.php?cat=405' },

  // Basic (4)
  { name: 'Basic > Sans serif', url: 'https://www.dafont.com/theme.php?cat=501' },
  { name: 'Basic > Serif', url: 'https://www.dafont.com/theme.php?cat=502' },
  { name: 'Basic > Fixed width', url: 'https://www.dafont.com/theme.php?cat=503' },
  { name: 'Basic > Various', url: 'https://www.dafont.com/theme.php?cat=504' },

  // Script (8)
  { name: 'Script > Calligraphy', url: 'https://www.dafont.com/theme.php?cat=601' },
  { name: 'Script > School', url: 'https://www.dafont.com/theme.php?cat=602' },
  { name: 'Script > Handwritten', url: 'https://www.dafont.com/theme.php?cat=603' },
  { name: 'Script > Brush', url: 'https://www.dafont.com/theme.php?cat=604' },
  { name: 'Script > Trash', url: 'https://www.dafont.com/theme.php?cat=605' },
  { name: 'Script > Graffiti', url: 'https://www.dafont.com/theme.php?cat=606' },
  { name: 'Script > Old School', url: 'https://www.dafont.com/theme.php?cat=607' },
  { name: 'Script > Various', url: 'https://www.dafont.com/theme.php?cat=608' },

  // Dingbats (21)
  { name: 'Dingbats > Alien', url: 'https://www.dafont.com/theme.php?cat=701' },
  { name: 'Dingbats > Animals', url: 'https://www.dafont.com/theme.php?cat=702' },
  { name: 'Dingbats > Asian', url: 'https://www.dafont.com/theme.php?cat=703' },
  { name: 'Dingbats > Ancient', url: 'https://www.dafont.com/theme.php?cat=704' },
  { name: 'Dingbats > Runes, Elvish', url: 'https://www.dafont.com/theme.php?cat=705' },
  { name: 'Dingbats > Esoteric', url: 'https://www.dafont.com/theme.php?cat=706' },
  { name: 'Dingbats > Fantastic', url: 'https://www.dafont.com/theme.php?cat=707' },
  { name: 'Dingbats > Horror', url: 'https://www.dafont.com/theme.php?cat=708' },
  { name: 'Dingbats > Games', url: 'https://www.dafont.com/theme.php?cat=709' },
  { name: 'Dingbats > Shapes', url: 'https://www.dafont.com/theme.php?cat=710' },
  { name: 'Dingbats > Bar Code', url: 'https://www.dafont.com/theme.php?cat=711' },
  { name: 'Dingbats > Nature', url: 'https://www.dafont.com/theme.php?cat=712' },
  { name: 'Dingbats > Sport', url: 'https://www.dafont.com/theme.php?cat=713' },
  { name: 'Dingbats > Heads', url: 'https://www.dafont.com/theme.php?cat=714' },
  { name: 'Dingbats > Kids', url: 'https://www.dafont.com/theme.php?cat=715' },
  { name: 'Dingbats > TV, Movie', url: 'https://www.dafont.com/theme.php?cat=716' },
  { name: 'Dingbats > Logos', url: 'https://www.dafont.com/theme.php?cat=717' },
  { name: 'Dingbats > Sexy', url: 'https://www.dafont.com/theme.php?cat=718' },
  { name: 'Dingbats > Army', url: 'https://www.dafont.com/theme.php?cat=719' },
  { name: 'Dingbats > Music', url: 'https://www.dafont.com/theme.php?cat=720' },
  { name: 'Dingbats > Various', url: 'https://www.dafont.com/theme.php?cat=721' },

  // Holiday (5)
  { name: 'Holiday > Valentine', url: 'https://www.dafont.com/theme.php?cat=801' },
  { name: 'Holiday > Easter', url: 'https://www.dafont.com/theme.php?cat=802' },
  { name: 'Holiday > Halloween', url: 'https://www.dafont.com/theme.php?cat=803' },
  { name: 'Holiday > Christmas', url: 'https://www.dafont.com/theme.php?cat=804' },
  { name: 'Holiday > Various', url: 'https://www.dafont.com/theme.php?cat=805' }
];

// ============================================
// STATE
// ============================================

let history = [];
let currentHistoryIndex = -1;
const MAX_HISTORY = 10;
let currentCount = 3;

// ============================================
// UTILITIES
// ============================================

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function fetchHTML(url) {
  const proxyUrl = '/api/proxy?url=' + encodeURIComponent(url);
  const resp = await fetch(proxyUrl);
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  return await resp.text();
}

// ============================================
// PARSING
// ============================================

function parseMaxPage(html) {
  const match = html.match(/page=(\d+)[^>]*>\s*\d+\s*<\/a>\s*<a[^>]*page_suivante/i);
  if (match) {
    return parseInt(match[1]);
  }

  const pageMatches = [...html.matchAll(/[?&]page=(\d+)/g)];
  let maxPage = 1;
  for (const m of pageMatches) {
    const p = parseInt(m[1]);
    if (p > maxPage) maxPage = p;
  }

  return maxPage;
}

function parseFontsFromPage(html) {
  const fonts = [];
  const seen = new Set();

  const regex = /href="([a-z0-9_-]+)\.font"/gi;
  let match;

  while ((match = regex.exec(html)) !== null) {
    const slug = match[1];
    if (seen.has(slug)) continue;
    seen.add(slug);

    fonts.push({
      name: slug.replace(/[-_]/g, ' '),
      url: 'https://www.dafont.com/' + slug + '.font',
      slug: slug
    });
  }
  return fonts;
}

async function getFontData(fontUrl) {
  try {
    const html = await fetchHTML(fontUrl);

    const previewMatch = html.match(/src="(\/img\/charmap\/[^"]+)"/);
    const previewUrl = previewMatch ? 'https://www.dafont.com' + previewMatch[1] : null;

    const nameMatch = html.match(/<title>([^<]+) Font/i);
    const name = nameMatch ? nameMatch[1].trim() : null;

    return { previewUrl, name };
  } catch (e) {
    return { previewUrl: null, name: null };
  }
}

// ============================================
// MAIN LOGIC
// ============================================

async function getRandomFontFromCategory(category, statusCallback) {
  statusCallback(`Scanning ${category.name}...`);

  const catHTML = await fetchHTML(category.url);
  const maxPage = parseMaxPage(catHTML);
  const randomPage = randInt(1, maxPage);

  let pageUrl = category.url;
  if (randomPage > 1) {
    pageUrl += (pageUrl.includes('?') ? '&' : '?') + 'page=' + randomPage;
  }

  const pageHTML = randomPage === 1 ? catHTML : await fetchHTML(pageUrl);
  const fonts = parseFontsFromPage(pageHTML);

  if (fonts.length === 0) {
    throw new Error('No fonts found');
  }

  const font = fonts[randInt(0, fonts.length - 1)];

  statusCallback(`Loading ${font.name}...`);
  const { previewUrl, name } = await getFontData(font.url);

  return {
    name: name || font.name,
    url: font.url,
    category: category.name,
    previewUrl
  };
}

// ============================================
// RENDERING
// ============================================

function renderGallery(fonts, totalCount) {
  const gallery = document.getElementById('gallery');

  // Update grid class based on total count
  if (totalCount === 6) {
    gallery.classList.add('grid-6');
  } else {
    gallery.classList.remove('grid-6');
  }

  if (fonts.length === 0 && totalCount === 0) {
    gallery.innerHTML = '<div class="empty">No fonts found. Try again.</div>';
    return;
  }

  // Get existing cards
  const existingCards = gallery.querySelectorAll('.font-card');

  // Replace skeletons with loaded fonts
  fonts.forEach((font, index) => {
    const card = document.createElement('div');
    card.className = 'font-card';

    const previewSrc = font.previewUrl || 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 60%22><text x=%2210%22 y=%2240%22 font-size=%2216%22 fill=%22%23999%22>No preview</text></svg>';

    card.innerHTML = `
      <div class="font-preview-container">
        <img class="font-preview" src="${previewSrc}" alt="${font.name}">
      </div>
      <div class="font-info">
        <div class="font-details">
          <div class="font-name">${font.name}</div>
          <div class="font-category">${font.category}</div>
        </div>
      </div>
    `;

    // Click handlers - separate for preview and details
    card.querySelector('.font-preview-container').onclick = () => window.open(font.url, '_blank');
    card.querySelector('.font-details').onclick = () => window.open(font.url, '_blank');

    // Replace skeleton at this index
    if (existingCards[index]) {
      existingCards[index].replaceWith(card);
    } else {
      gallery.appendChild(card);
    }
  });
}

function showLoading(count) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';

  // Update grid class
  if (count === 6) {
    gallery.classList.add('grid-6');
  } else {
    gallery.classList.remove('grid-6');
  }

  // Create skeleton cards
  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement('div');
    skeleton.className = 'font-card skeleton';
    gallery.appendChild(skeleton);
  }
}

function updateHistoryButtons() {
  const undoBtn = document.getElementById('undo');
  const redoBtn = document.getElementById('redo');

  undoBtn.disabled = currentHistoryIndex <= 0;
  redoBtn.disabled = currentHistoryIndex >= history.length - 1;
}

function updateCountButtons() {
  const countBtns = document.querySelectorAll('.count-btn');
  countBtns.forEach(btn => {
    const count = parseInt(btn.dataset.count);
    if (count === currentCount) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// ============================================
// DISCOVER LOGIC
// ============================================

async function discoverFonts(count) {
  const discoverBtn = document.getElementById('discover');

  discoverBtn.disabled = true;
  showLoading(count);

  try {
    const fonts = [];
    const usedCategories = new Set();

    for (let i = 0; i < count; i++) {
      let category;
      if (usedCategories.size < ALL_CATEGORIES.length) {
        do {
          category = ALL_CATEGORIES[randInt(0, ALL_CATEGORIES.length - 1)];
        } while (usedCategories.has(category.url));
        usedCategories.add(category.url);
      } else {
        category = ALL_CATEGORIES[randInt(0, ALL_CATEGORIES.length - 1)];
      }

      try {
        const font = await getRandomFontFromCategory(category, () => {});
        fonts.push(font);
        renderGallery(fonts, count);
      } catch (e) {
        console.error(`Error with ${category.name}:`, e);
      }
    }

    if (fonts.length === 0) {
      throw new Error('Could not load any fonts');
    }

    // Save to history (clear forward history if we're not at the end)
    history = history.slice(0, currentHistoryIndex + 1);
    history.push(fonts);
    if (history.length > MAX_HISTORY) {
      history.shift();
    } else {
      currentHistoryIndex++;
    }

    updateHistoryButtons();
  } catch (e) {
    console.error('Error loading fonts:', e);
    document.getElementById('gallery').innerHTML = '<div class="empty">Failed to load fonts. Try again.</div>';
  }

  discoverBtn.disabled = false;
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const discoverBtn = document.getElementById('discover');
  const undoBtn = document.getElementById('undo');
  const redoBtn = document.getElementById('redo');
  const countBtns = document.querySelectorAll('.count-btn');

  // Load saved count
  const savedCount = localStorage.getItem('fontCount');
  if (savedCount && (savedCount === '3' || savedCount === '6')) {
    currentCount = parseInt(savedCount);
  }
  updateCountButtons();

  // Count buttons
  countBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentCount = parseInt(btn.dataset.count);
      localStorage.setItem('fontCount', currentCount);
      updateCountButtons();
      discoverFonts(currentCount);
    });
  });

  // Discover button
  discoverBtn.addEventListener('click', () => {
    discoverFonts(currentCount);
  });

  // Undo button
  undoBtn.addEventListener('click', () => {
    if (currentHistoryIndex > 0) {
      currentHistoryIndex--;
      const fonts = history[currentHistoryIndex];
      renderGallery(fonts, fonts.length);
      updateHistoryButtons();
    }
  });

  // Redo button
  redoBtn.addEventListener('click', () => {
    if (currentHistoryIndex < history.length - 1) {
      currentHistoryIndex++;
      const fonts = history[currentHistoryIndex];
      renderGallery(fonts, fonts.length);
      updateHistoryButtons();
    }
  });

  // Auto-load 3 fonts on page load
  discoverFonts(3);
});
```

---

## Deployment on Vercel

### Step 1: Create GitHub repository

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/randomdafont.git
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to vercel.com
2. Import Git Repository
3. Select randomdafont repository
4. Framework Preset: Other
5. Deploy

### Step 3: Configure domain

1. In Vercel project settings → Domains
2. Add randomdafont.com
3. Configure DNS at domain registrar

---

## Features Checklist

- [x] Responsive design (desktop, tablet, mobile)
- [x] 67 DaFont categories support
- [x] Random font discovery
- [x] Font preview images
- [x] Click to open font page on DaFont
- [x] Undo/Redo history (10 states)
- [x] Choose 3 or 6 fonts per load
- [x] Skeleton loading states
- [x] LocalStorage for count preference
- [x] CORS proxy via Vercel Serverless
- [x] Centered floating button layout
- [x] Smooth hover animations
- [x] Auto-load on page load
