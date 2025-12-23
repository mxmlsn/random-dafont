# ТЗ: randomdafont.com

Одностраничное веб-приложение для случайного поиска шрифтов с DaFont.com.

---

## Часть 1: Структура проекта

```
randomdafont/
├── index.html          # Главная страница
├── style.css           # Стили
├── app.js              # Клиентская логика
├── api/
│   └── proxy.js        # Vercel Serverless функция для обхода CORS
├── vercel.json         # Конфигурация Vercel
└── package.json        # Зависимости (пустой, для Vercel)
```

---

## Часть 2: vercel.json

```json
{
  "rewrites": [
    { "source": "/api/proxy", "destination": "/api/proxy" }
  ]
}
```

---

## Часть 3: package.json

```json
{
  "name": "randomdafont",
  "version": "1.0.0",
  "private": true
}
```

---

## Часть 4: api/proxy.js

Serverless функция для проксирования запросов к DaFont (обход CORS).

```javascript
export default async function handler(req, res) {
  const { url } = req.query;
  
  if (!url) {
    return res.status(400).json({ error: 'URL parameter required' });
  }
  
  // Проверка что URL ведёт на dafont.com
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

## Часть 5: index.html

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
  <div class="container">
    <header class="header">
      <h1 class="logo">Random<span>DaFont</span></h1>
      <div class="controls">
        <div class="slider-container">
          <label for="count">Fonts:</label>
          <input type="range" id="count" min="1" max="6" value="3" step="1">
          <span id="count-value">3</span>
        </div>
        <button id="discover" class="btn-primary">Discover</button>
        <button id="undo" class="btn-secondary" disabled>Undo</button>
      </div>
      <div id="status" class="status"></div>
    </header>
    
    <main id="gallery" class="gallery">
      <div class="empty">Click "Discover" to find random fonts</div>
    </main>
  </div>
  
  <script src="app.js"></script>
</body>
</html>
```

---

## Часть 6: style.css

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-size: 14px;
  color: #333;
  background: #f5f5f5;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

/* Header */
.header {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 24px;
  padding: 20px 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.logo {
  font-size: 24px;
  font-weight: 700;
  color: #222;
}

.logo span {
  color: #c00;
}

/* Controls */
.controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.slider-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.slider-container label {
  font-weight: 500;
  color: #555;
}

#count {
  width: 120px;
  height: 6px;
  -webkit-appearance: none;
  appearance: none;
  background: #ddd;
  border-radius: 3px;
  cursor: pointer;
}

#count::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: #c00;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.15s;
}

#count::-webkit-slider-thumb:hover {
  transform: scale(1.15);
}

#count::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #c00;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

#count-value {
  font-weight: 600;
  font-size: 16px;
  color: #c00;
  min-width: 20px;
  text-align: center;
}

/* Buttons */
.btn-primary, .btn-secondary {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
}

.btn-primary {
  background: #c00;
  color: #fff;
}

.btn-primary:hover {
  background: #a00;
}

.btn-primary:active {
  transform: scale(0.97);
}

.btn-primary:disabled {
  background: #999;
  cursor: not-allowed;
}

.btn-secondary {
  background: #e0e0e0;
  color: #333;
}

.btn-secondary:hover:not(:disabled) {
  background: #d0d0d0;
}

.btn-secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Status */
.status {
  margin-left: auto;
  font-size: 13px;
  color: #666;
}

.status.error {
  color: #c00;
}

/* Gallery */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 20px;
}

/* Font Card */
.font-card {
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: box-shadow 0.2s, transform 0.2s;
}

.font-card:hover {
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  transform: translateY(-3px);
}

.font-preview-container {
  width: 100%;
  height: 140px;
  overflow: hidden;
  background: #fafafa;
  cursor: pointer;
}

.font-preview {
  width: 100%;
  height: auto;
  display: block;
  margin-top: -20px;
}

.font-info {
  padding: 12px 16px;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
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
}

.font-category {
  font-size: 12px;
  color: #888;
}

.download-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  background: #f0f0f0;
  color: #555;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
  flex-shrink: 0;
}

.download-btn:hover {
  background: #c00;
  color: #fff;
}

/* Loading */
.loading {
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px;
  color: #888;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #eee;
  border-top-color: #c00;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Empty State */
.empty {
  grid-column: 1 / -1;
  text-align: center;
  padding: 80px 20px;
  color: #888;
  background: #fff;
  border-radius: 10px;
  font-size: 16px;
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 16px;
  }
  
  .header {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
    padding: 16px;
  }
  
  .controls {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .status {
    margin-left: 0;
    text-align: center;
    width: 100%;
  }
  
  .gallery {
    grid-template-columns: 1fr;
  }
}
```

---

## Часть 7: app.js

```javascript
// ============================================
// КАТЕГОРИИ (67 подкатегорий DaFont)
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
// СОСТОЯНИЕ
// ============================================

let history = []; // История выдач для Undo
const MAX_HISTORY = 10;

// ============================================
// УТИЛИТЫ
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
// ПАРСИНГ
// ============================================

function parseMaxPage(html) {
  // Ищем последнюю страницу в пагинации
  // Паттерн: page=237">237</a> или page=237)[![]
  const match = html.match(/page=(\d+)[^>]*>\s*\d+\s*<\/a>\s*<a[^>]*page_suivante/i);
  if (match) {
    return parseInt(match[1]);
  }
  
  // Альтернатива: ищем все page= и берём максимум
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
  
  // Ищем ссылки на шрифты: href="font-name.font"
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
    
    const downloadMatch = html.match(/href="(\/\/dl\.dafont\.com\/dl\/\?f=[^"]+)"/);
    const downloadUrl = downloadMatch ? 'https:' + downloadMatch[1] : null;
    
    // Попробуем извлечь нормальное название
    const nameMatch = html.match(/<title>([^<]+) Font/i);
    const name = nameMatch ? nameMatch[1].trim() : null;
    
    return { previewUrl, downloadUrl, name };
  } catch (e) {
    return { previewUrl: null, downloadUrl: null, name: null };
  }
}

// ============================================
// ОСНОВНАЯ ЛОГИКА
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
  const { previewUrl, downloadUrl, name } = await getFontData(font.url);
  
  return {
    name: name || font.name,
    url: font.url,
    category: category.name,
    previewUrl,
    downloadUrl
  };
}

// ============================================
// РЕНДЕРИНГ
// ============================================

function renderGallery(fonts) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';
  
  if (fonts.length === 0) {
    gallery.innerHTML = '<div class="empty">No fonts found. Try again.</div>';
    return;
  }
  
  fonts.forEach(font => {
    const card = document.createElement('div');
    card.className = 'font-card';
    
    const previewSrc = font.previewUrl || 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 60%22><text x=%2210%22 y=%2240%22 font-size=%2216%22 fill=%22%23999%22>No preview</text></svg>';
    
    const downloadBtn = font.downloadUrl 
      ? `<a class="download-btn" href="${font.downloadUrl}" title="Download" onclick="event.stopPropagation()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
        </a>`
      : '';
    
    card.innerHTML = `
      <div class="font-preview-container">
        <img class="font-preview" src="${previewSrc}" alt="${font.name}">
      </div>
      <div class="font-info">
        <div class="font-details">
          <div class="font-name">${font.name}</div>
          <div class="font-category">${font.category}</div>
        </div>
        ${downloadBtn}
      </div>
    `;
    
    // Клик по карточке (кроме кнопки скачивания)
    card.querySelector('.font-preview-container').onclick = () => window.open(font.url, '_blank');
    card.querySelector('.font-details').onclick = () => window.open(font.url, '_blank');
    
    gallery.appendChild(card);
  });
}

function showLoading() {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = `
    <div class="loading">
      <div class="loading-spinner"></div>
      <div>Discovering fonts...</div>
    </div>
  `;
}

function updateUndoButton() {
  const undoBtn = document.getElementById('undo');
  undoBtn.disabled = history.length < 2;
}

// ============================================
// ИНИЦИАЛИЗАЦИЯ
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const countSlider = document.getElementById('count');
  const countValue = document.getElementById('count-value');
  const discoverBtn = document.getElementById('discover');
  const undoBtn = document.getElementById('undo');
  const status = document.getElementById('status');

  // Загрузка сохранённого значения
  const savedCount = localStorage.getItem('fontCount');
  if (savedCount) {
    countSlider.value = savedCount;
    countValue.textContent = savedCount;
  }

  // Слайдер
  countSlider.addEventListener('input', () => {
    countValue.textContent = countSlider.value;
    localStorage.setItem('fontCount', countSlider.value);
  });

  // Discover
  discoverBtn.addEventListener('click', async () => {
    const count = parseInt(countSlider.value);
    discoverBtn.disabled = true;
    status.textContent = '';
    status.className = 'status';
    showLoading();

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
          const font = await getRandomFontFromCategory(category, (msg) => {
            status.textContent = `(${i + 1}/${count}) ${msg}`;
          });
          fonts.push(font);
          renderGallery(fonts);
        } catch (e) {
          console.error(`Error with ${category.name}:`, e);
        }
      }
      
      if (fonts.length === 0) {
        throw new Error('Could not load any fonts');
      }
      
      // Сохраняем в историю
      history.push(fonts);
      if (history.length > MAX_HISTORY) {
        history.shift();
      }
      updateUndoButton();
      
      status.textContent = `Found ${fonts.length} font(s)`;
    } catch (e) {
      status.textContent = 'Error: ' + e.message;
      status.className = 'status error';
      document.getElementById('gallery').innerHTML = '<div class="empty">Failed to load fonts. Try again.</div>';
    }
    
    discoverBtn.disabled = false;
  });

  // Undo
  undoBtn.addEventListener('click', () => {
    if (history.length < 2) return;
    
    history.pop(); // Удаляем текущую
    const prevFonts = history[history.length - 1];
    renderGallery(prevFonts);
    updateUndoButton();
    status.textContent = 'Restored previous results';
  });
});
```

---

## Часть 8: Деплой на Vercel

### Шаг 1: Создать репозиторий на GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/randomdafont.git
git push -u origin main
```

### Шаг 2: Подключить к Vercel

1. Зайти на vercel.com
2. Import Git Repository
3. Выбрать репозиторий randomdafont
4. Framework Preset: Other
5. Deploy

### Шаг 3: Настроить домен

1. В настройках проекта на Vercel → Domains
2. Добавить randomdafont.com
3. Настроить DNS у регистратора домена

---

## Чеклист

- [ ] Создать структуру файлов
- [ ] Написать api/proxy.js
- [ ] Написать index.html
- [ ] Написать style.css
- [ ] Написать app.js
- [ ] Создать репозиторий GitHub
- [ ] Задеплоить на Vercel
- [ ] Подключить домен
