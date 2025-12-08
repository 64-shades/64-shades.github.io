const BG_MAP = {};

const BACKGROUND_KEY = 'sphinx_background_preference';

/**
 * Load the background map from a JSON file using async/await.
 */
async function loadBackgroundMap() {
  const jsonUrl = (window.DOCUMENTATION_OPTIONS?.URL_ROOT || '') + '_static/data/backgrounds.json';
  try {
    const response = await fetch(jsonUrl);
    if (!response.ok) {
      console.warn('Failed to load background map JSON; background images will be disabled.');
      return;
    }
    const data = await response.json();
    if (data) {
      Object.assign(BG_MAP, data);
    }
  } catch (err) {
    console.error('Error loading background map JSON:', err);
  }
}

/**
 * Load user's background preference and apply it.
 */
function loadBackgroundPreference() {
  const storedBackground = localStorage.getItem(BACKGROUND_KEY) || 'on';
  window.setBackground(storedBackground);
}

/**
 * Public function to turn the background image on or off.
 * Defined globally so the HTML `href="javascript:setBackground(...)` works.
 * @param {string} state - 'on' or 'off'
 */
window.setBackground = function (state) {
  const mainSection = document.querySelector('[role="main"] > section:first-child');
  if (!mainSection) return;

  const pageId = mainSection.id;
  const bgUrl = BG_MAP[pageId];
  const body = document.body;
  const bodyWrapper = document.querySelector('.bodywrapper');

  // The updateBackgroundLinks function is now in commit-banner.js,
  // but since that file is loaded first, we can rely on it being available.
  const updateBackgroundLinks = window.updateBackgroundLinks || function () { }; // Fallback

  if (state === 'on' && bgUrl) {
    body.style.backgroundImage = `url('_static/images/backgrounds/${bgUrl}.jpg')`;
    body.style.backgroundSize = 'cover';
    body.style.backgroundAttachment = 'fixed';
    body.classList.add('background-on');

    if (bodyWrapper) {
      bodyWrapper.style.background = 'transparent';
    }
  } else {
    body.style.backgroundImage = 'none';
    body.style.backgroundSize = '';
    body.style.backgroundAttachment = '';
    body.classList.remove('background-on');

    if (bodyWrapper) {
      bodyWrapper.style.background = 'var(--main-bg-color)';
    }
  }

  localStorage.setItem(BACKGROUND_KEY, state);
  updateBackgroundLinks(state);
};


// Wait for the document to fully load, load the map, then apply preference.

document.addEventListener('DOMContentLoaded', async function () {
  await loadBackgroundMap();
  loadBackgroundPreference();
});
