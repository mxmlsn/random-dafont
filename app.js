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
let logoAnimationInterval = null;

// ============================================
// UTILITIES
// ============================================

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ============================================
// LOGO ANIMATION
// ============================================

function startLogoAnimation() {
  const logoLetters = document.querySelectorAll('.logo-random span');
  const totalVariations = 10; // font-var-0 to font-var-9

  // Clear any existing interval
  if (logoAnimationInterval) {
    clearInterval(logoAnimationInterval);
  }

  // Function to change fonts
  const changeFonts = () => {
    logoLetters.forEach(letter => {
      // Remove all existing font variation classes
      for (let i = 0; i < totalVariations; i++) {
        letter.classList.remove(`font-var-${i}`);
      }
      // Add a random font variation class
      const randomVariation = randInt(0, totalVariations - 1);
      letter.classList.add(`font-var-${randomVariation}`);
    });
  };

  // Start immediately
  changeFonts();

  // Then continue with interval
  logoAnimationInterval = setInterval(changeFonts, 200); // Change fonts every 200ms
}

function stopLogoAnimation() {
  if (logoAnimationInterval) {
    clearInterval(logoAnimationInterval);
    logoAnimationInterval = null;
  }
  // Letters freeze in their current state (keep the last applied class)
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
          <svg width="18" height="18" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 13.2188L12.9674 25.1862L24.9371 13.2165" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M12.9683 1.61304L12.9683 25.2298" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
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
      btn.disabled = true;
    } else {
      btn.classList.remove('active');
      btn.disabled = false;
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
  startLogoAnimation(); // Start logo animation while loading

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

  stopLogoAnimation(); // Stop logo animation when loading is complete
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
    const icon = discoverBtn.querySelector('.refresh-icon');
    if (icon) {
      icon.classList.remove('spinning');
      void icon.offsetWidth; // Force reflow
      icon.classList.add('spinning');
      setTimeout(() => icon.classList.remove('spinning'), 800);
    }
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

  // Initialize poster gallery
  initPosterGallery();
});

// ============================================
// POSTER GALLERY
// ============================================

let selectedFile = null;
let awaitingAnonConfirmation = false;

function initPosterGallery() {
  const submitPosterBtn = document.getElementById('submitPosterBtn');
  const modal = document.getElementById('submitModal');
  const modalBackdrop = modal.querySelector('.modal-backdrop');
  const modalAnonMessage = document.getElementById('modalAnonMessage');
  const posterForm = document.getElementById('posterForm');
  const fileInput = document.getElementById('posterImage');
  const fileUpload = document.getElementById('fileUpload');
  const fileUploadContent = fileUpload.querySelector('.file-upload-content');
  const filePreview = document.getElementById('filePreview');
  const previewImg = document.getElementById('previewImg');
  const fileRemove = document.getElementById('fileRemove');
  const submitBtn = document.getElementById('submitBtn');
  const submitSuccess = document.getElementById('submitSuccess');
  const submitAnother = document.getElementById('submitAnother');

  // Open modal
  submitPosterBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('active');
  });

  // Close modal functions
  function closeModal() {
    modal.classList.remove('active');
    resetForm();
  }

  modalBackdrop.addEventListener('click', closeModal);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Prevent Enter from submitting the form
  posterForm.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  });

  // Font inputs logic
  initFontInputs();

  // File handling
  fileInput.addEventListener('change', handleFileSelect);

  function handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Please select a JPG, PNG, or WebP image.');
      fileInput.value = '';
      return;
    }

    // Validate file size (3MB)
    if (file.size > 3 * 1024 * 1024) {
      alert('Image must be less than 3MB.');
      fileInput.value = '';
      return;
    }

    selectedFile = file;

    // Enable submit button
    submitBtn.disabled = false;

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImg.src = e.target.result;
      fileUploadContent.style.display = 'none';
      filePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }

  // Remove file
  fileRemove.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    clearFileSelection();
  });

  function clearFileSelection() {
    selectedFile = null;
    fileInput.value = '';
    previewImg.src = '';
    filePreview.style.display = 'none';
    fileUploadContent.style.display = 'block';
    submitBtn.disabled = true;
  }

  // Form submission
  posterForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('Please select an image.');
      return;
    }

    let instagram = document.getElementById('instagram').value.trim();
    // Remove @ if user entered it
    if (instagram.startsWith('@')) {
      instagram = instagram.substring(1);
    }

    const instagramWrapper = document.querySelector('.instagram-input-wrapper');

    // Check if Instagram is empty and awaiting confirmation
    if (!instagram && !awaitingAnonConfirmation) {
      // Show anonymous confirmation
      modalAnonMessage.classList.add('visible');
      instagramWrapper.classList.add('highlight-green');
      submitBtn.classList.add('highlight-green');
      submitBtn.querySelector('.btn-text').textContent = 'yes';
      awaitingAnonConfirmation = true;

      // Remove green highlight after 5 seconds
      setTimeout(() => {
        modalAnonMessage.classList.remove('visible');
        instagramWrapper.classList.remove('highlight-green');
        submitBtn.classList.remove('highlight-green');
      }, 5000);

      return;
    }

    // Collect font names
    const fontInputs = document.querySelectorAll('.font-name-input');
    const fonts = Array.from(fontInputs)
      .map(input => input.value.trim())
      .filter(font => font !== '');

    const usedSvg = document.getElementById('usedSvg').checked;

    // Disable submit button and show loading
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').style.display = 'none';
    submitBtn.querySelector('.btn-loading').style.display = 'inline';

    try {
      // Convert file to base64
      const base64 = await fileToBase64(selectedFile);

      const response = await fetch('/api/submit-poster', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          instagram,
          fonts,
          usedSvg,
          imageBase64: base64,
          fileName: selectedFile.name,
          fileType: selectedFile.type
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit poster');
      }

      // Show success state
      posterForm.style.display = 'none';
      submitSuccess.style.display = 'block';

    } catch (error) {
      console.error('Submit error:', error);
      alert(error.message || 'Failed to submit poster. Please try again.');
    } finally {
      // Re-enable submit button
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').style.display = 'inline';
      submitBtn.querySelector('.btn-loading').style.display = 'none';
    }
  });

  // Submit another
  submitAnother.addEventListener('click', () => {
    resetForm();
    posterForm.style.display = 'flex';
    submitSuccess.style.display = 'none';
  });

  function resetForm() {
    posterForm.reset();
    clearFileSelection();
    posterForm.style.display = 'flex';
    submitSuccess.style.display = 'none';
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').style.display = 'inline';
    submitBtn.querySelector('.btn-text').textContent = 'submit';
    submitBtn.querySelector('.btn-loading').style.display = 'none';

    // Reset anonymous confirmation state
    awaitingAnonConfirmation = false;
    modalAnonMessage.classList.remove('visible');
    document.querySelector('.instagram-input-wrapper').classList.remove('highlight-green');
    submitBtn.classList.remove('highlight-green');

    // Reset font inputs to single empty field
    resetFontInputs();
  }

  // Load posters
  loadPosters();
}

// ============================================
// FONT INPUTS MANAGEMENT
// ============================================

function initFontInputs() {
  const fontInputsContainer = document.getElementById('fontInputs');

  // Delegate event handling to container
  fontInputsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-add-font')) {
      addFontInput();
    }
  });

  // Show add button when font input is focused
  fontInputsContainer.addEventListener('focus', (e) => {
    if (e.target.classList.contains('font-name-input')) {
      fontInputsContainer.classList.add('show-add-btn');
    }
  }, true);

  // Auto-resize font inputs on typing
  fontInputsContainer.addEventListener('input', (e) => {
    if (e.target.classList.contains('font-name-input')) {
      autoResizeFontInput(e.target);
    }
  });

  // Initial resize for any existing inputs
  document.querySelectorAll('.font-name-input').forEach(autoResizeFontInput);
}

function autoResizeFontInput(input) {
  // Create a temporary span to measure text width
  const span = document.createElement('span');
  span.style.visibility = 'hidden';
  span.style.position = 'absolute';
  span.style.whiteSpace = 'pre';
  span.style.font = window.getComputedStyle(input).font;
  span.textContent = input.value || input.placeholder;
  document.body.appendChild(span);

  const textWidth = span.offsetWidth;
  document.body.removeChild(span);

  // Set minimum width and add padding (12px each side)
  const minWidth = 85;
  const maxWidth = 300;
  const newWidth = Math.min(Math.max(textWidth + 24, minWidth), maxWidth);
  input.style.width = newWidth + 'px';
}

function addFontInput() {
  const fontInputsContainer = document.getElementById('fontInputs');
  const currentRows = fontInputsContainer.querySelectorAll('.font-input-row');

  if (currentRows.length >= 10) {
    return; // Max 10 font inputs
  }

  // Check if the last input has text - can't add new until previous is filled
  const lastRow = currentRows[currentRows.length - 1];
  const lastInput = lastRow.querySelector('.font-name-input');
  if (!lastInput.value.trim()) {
    lastInput.focus();
    return; // Can't add new font until current one has text
  }

  // Remove the add button from the current last row
  const addBtn = lastRow.querySelector('.btn-add-font');
  if (addBtn) {
    addBtn.remove();
  }

  const newRow = document.createElement('div');
  newRow.className = 'font-input-row';
  newRow.innerHTML = `
    <input type="text" class="font-name-input" placeholder="font name" maxlength="50">
    <button type="button" class="btn-add-font" title="add another font">+</button>
  `;

  fontInputsContainer.appendChild(newRow);

  // Auto-resize the new input
  const newInput = newRow.querySelector('.font-name-input');
  autoResizeFontInput(newInput);
  newInput.focus();
}


function resetFontInputs() {
  const fontInputsContainer = document.getElementById('fontInputs');
  fontInputsContainer.classList.remove('show-add-btn');
  fontInputsContainer.innerHTML = `
    <div class="font-input-row">
      <input type="text" class="font-name-input" placeholder="font name" maxlength="50">
      <button type="button" class="btn-add-font" title="add another font">+</button>
    </div>
  `;
}


function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

let currentPosters = [];

async function loadPosters() {
  const gallery = document.getElementById('posterGallery');
  const emptyState = document.getElementById('posterEmpty');

  try {
    const response = await fetch('/api/posters');

    if (!response.ok) {
      throw new Error('Failed to load posters');
    }

    const posters = await response.json();

    if (posters.length === 0) {
      // Keep gallery visible for info card, just hide empty state
      gallery.style.display = 'block';
      emptyState.style.display = 'none';
      // Remove any existing poster cards but keep info card
      gallery.querySelectorAll('.poster-card').forEach(card => card.remove());
      return;
    }

    currentPosters = posters;

    gallery.style.display = 'block';
    emptyState.style.display = 'none';

    // Keep the info card and add posters after it
    const infoCard = gallery.querySelector('.info-card');
    const postersHtml = posters.map((poster, index) => `
      <div class="poster-card" data-poster-index="${index}">
        <img class="poster-image" src="${poster.image_url}" alt="${poster.instagram ? `Poster by @${poster.instagram}` : 'Anonymous poster'}" loading="lazy">
        <div class="poster-info">
          ${poster.instagram ? `<a class="poster-instagram" href="https://instagram.com/${poster.instagram}" target="_blank" rel="noopener noreferrer">@${escapeHtml(poster.instagram)}</a>` : '<span class="poster-anonymous"></span>'}
        </div>
      </div>
    `).join('');

    // Remove old poster cards but keep info card and mobile instagram card
    gallery.querySelectorAll('.poster-card').forEach(card => card.remove());
    // Add new posters after mobile-instagram-card (or after info card if not found)
    const mobileInstagramCard = gallery.querySelector('.mobile-instagram-card');
    if (mobileInstagramCard) {
      mobileInstagramCard.insertAdjacentHTML('afterend', postersHtml);
    } else if (infoCard) {
      infoCard.insertAdjacentHTML('afterend', postersHtml);
    } else {
      gallery.innerHTML = postersHtml;
    }

    // Add click handlers to poster cards
    const posterCards = gallery.querySelectorAll('.poster-card');
    posterCards.forEach(card => {
      card.addEventListener('click', (e) => {
        // Prevent opening lightbox if clicking on Instagram link
        if (e.target.classList.contains('poster-instagram')) {
          return;
        }
        const index = parseInt(card.dataset.posterIndex);
        openLightbox(index);
      });
    });

  } catch (error) {
    console.error('Error loading posters:', error);
    // Keep gallery visible for info card even on error
    gallery.style.display = 'block';
    emptyState.style.display = 'none';
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ============================================
// LIGHTBOX FUNCTIONALITY
// ============================================

let currentLightboxIndex = 0;

function openLightbox(index) {
  const lightbox = document.getElementById('posterLightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxAuthor = document.getElementById('lightboxAuthor');
  const lightboxInstagram = document.getElementById('lightboxInstagram');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  currentLightboxIndex = index;

  // Set image and info
  updateLightboxContent();

  // Show lightbox
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Update nav buttons
  lightboxPrev.disabled = currentLightboxIndex === 0;
  lightboxNext.disabled = currentLightboxIndex === currentPosters.length - 1;
}

function updateLightboxContent() {
  const poster = currentPosters[currentLightboxIndex];
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxInstagram = document.getElementById('lightboxInstagram');
  const lightboxFonts = document.getElementById('lightboxFonts');
  const lightboxSvgBadge = document.getElementById('lightboxSvgBadge');
  const lightboxDate = document.getElementById('lightboxDate');

  lightboxImage.src = poster.image_url;
  lightboxImage.alt = poster.instagram ? `Poster by @${poster.instagram}` : 'Anonymous poster';

  // Instagram (with "author:" label and tab indentation)
  if (poster.instagram) {
    lightboxInstagram.textContent = `author:\t@${poster.instagram}`;
    lightboxInstagram.href = `https://instagram.com/${poster.instagram}`;
    lightboxInstagram.style.display = 'block';
  } else {
    lightboxInstagram.style.display = 'none';
  }

  // Fonts (with "fonts:" label and tab indentation)
  if (poster.fonts && poster.fonts.length > 0) {
    const fontsHTML = poster.fonts
      .map((font, index) => {
        if (index === 0) {
          return `<div class="lightbox-font-item">fonts:\t${escapeHtml(font)}</div>`;
        } else {
          return `<div class="lightbox-font-item">\t\t${escapeHtml(font)}</div>`;
        }
      })
      .join('');
    lightboxFonts.innerHTML = fontsHTML;
    lightboxFonts.style.display = 'flex';
  } else {
    lightboxFonts.style.display = 'none';
  }

  // SVG badge (entire text is clickable link with line break after "random")
  if (poster.used_svg) {
    lightboxSvgBadge.innerHTML = '<a href="https://random-svg-three.vercel.app/" target="_blank" rel="noopener noreferrer">include assets from\nrandom-svg.com</a>';
    lightboxSvgBadge.style.display = 'block';
  } else {
    lightboxSvgBadge.style.display = 'none';
  }

  // Approval date (dd.mm.yyyy format)
  if (poster.created_at) {
    const date = new Date(poster.created_at);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;
    lightboxDate.textContent = formattedDate;
    lightboxDate.style.display = 'block';
  } else {
    lightboxDate.style.display = 'none';
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('posterLightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function navigateLightbox(direction) {
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  if (direction === 'prev' && currentLightboxIndex > 0) {
    currentLightboxIndex--;
    updateLightboxContent();
  } else if (direction === 'next' && currentLightboxIndex < currentPosters.length - 1) {
    currentLightboxIndex++;
    updateLightboxContent();
  }

  // Update nav buttons
  lightboxPrev.disabled = currentLightboxIndex === 0;
  lightboxNext.disabled = currentLightboxIndex === currentPosters.length - 1;
}

// Initialize lightbox event listeners
document.addEventListener('DOMContentLoaded', () => {
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBackdrop = document.querySelector('#posterLightbox .lightbox-backdrop');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  // Close lightbox
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxBackdrop.addEventListener('click', closeLightbox);

  // Navigation buttons
  lightboxPrev.addEventListener('click', () => navigateLightbox('prev'));
  lightboxNext.addEventListener('click', () => navigateLightbox('next'));

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('posterLightbox');
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      navigateLightbox('prev');
    } else if (e.key === 'ArrowRight') {
      navigateLightbox('next');
    }
  });

  // Info card parallax scroll effect
  const infoCard = document.querySelector('.info-card');
  if (infoCard) {
    let scrollOffset = 0;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const maxScroll = 48;
      scrollOffset = Math.min(scrollY * 0.2, maxScroll);

      infoCard.style.setProperty('--scroll-offset', `${scrollOffset}px`);
    });
  }
});
