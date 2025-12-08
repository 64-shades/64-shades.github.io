const BG_MAP = {
  'shades-games-club': 'the-big-issue',
  'first-event': 'first-event-second-game',
  'second-event': 'second-event',
  'third-event': 'third-event-beers-in-play',
  'fourth-event': 'fourth-event',
  'fifth-event': 'fifth-event',
  'sixth-event': 'sixth-event',
  catan: 'catan',
  chess: 'chess',
  'c-o-o-l-chess': 'cool-chess',
  harmegedo: 'harmegedo',
  'history-of-64-shades': 'history',
  quaternity: 'quaternity-wooden-set',
  'the-first-challenger': 'first-event-first-game',
  'top-pitfalls': 'top-pitfalls',
  'uno-show-em-no-mercy': 'uno-show-em-no-mercy',
};

const BACKGROUND_KEY = 'sphinx_background_preference';

/**
 * Load the background map from a JSON file.
 * Returns a Promise that resolves when BG_MAP is populated.
 */
function loadBackgroundMap() {
  // Assuming the JSON file is located relative to the static assets.
  const jsonUrl = '_static/data/backgrounds.json';
  return fetch(jsonUrl)
    .then((response) => {
      if (!response.ok) {
        console.warn('Failed to load background map JSON, using fallback map.');
        return null;
      }
      return response.json();
    })
    .then((data) => {
      if (data) {
        Object.assign(BG_MAP, data);
      }
    })
    .catch((err) => {
      console.error('Error loading background map JSON:', err);
    });
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

document.addEventListener('DOMContentLoaded', function () {
  loadBackgroundMap().then(() => {
    loadBackgroundPreference();
  });
});
