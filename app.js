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
    previewUrl,
    slug: font.slug
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

    const downloadSlug = font.slug.replace(/-/g, '_');
    const downloadUrl = `https://dl.dafont.com/dl/?f=${downloadSlug}`;

    card.innerHTML = `
      <div class="font-preview-container">
        <img class="font-preview" src="${previewSrc}" alt="${font.name}">
      </div>
      <div class="font-info">
        <div class="font-details">
          <div class="font-name">${font.name}</div>
          <div class="font-category">${font.category}</div>
        </div>
        <a class="btn-download" href="${downloadUrl}" target="_blank" rel="nofollow noreferrer noopener" title="Download font">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
        </a>
      </div>
    `;

    // Click handlers - separate for preview and details
    card.querySelector('.font-preview-container').onclick = () => window.open(font.url, '_blank');
    card.querySelector('.font-details').onclick = () => window.open(font.url, '_blank');

    // Prevent download button click from bubbling to card
    card.querySelector('.btn-download').onclick = (e) => e.stopPropagation();

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
