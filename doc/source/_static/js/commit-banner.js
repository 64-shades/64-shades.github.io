// --- Global Constants (Moved from Theme Switcher) ---
const THEME_KEY = 'sphinx_theme_preference';
const CUSTOM_THEME_KEY = 'sphinx_custom_theme_colors';
const CUSTOM_THEME_TRIGGER = 'sphinx_custom_theme_active';

// --- Commit-Specific Constants ---
const GITHUB_REPO_URL = 'https://github.com/64-shades/64-shades.github.io';
const GITHUB_COMMIT_URL = `${GITHUB_REPO_URL}/commit/`;
const prRegex = /\((#\d+)\)\s*$/;
let allCommits = [];

// --- Theme Randomization Functions (Moved from Theme Switcher) ---

/**
 * Generates a random dark hex color (good for backgrounds).
 * @returns {string} A hex color string.
 */
function getRandomDarkColor() {
  const r = Math.floor(Math.random() * 128);
  const g = Math.floor(Math.random() * 128);
  const b = Math.floor(Math.random() * 128);
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).padStart(6, '0');
}

/**
 * Generates a random bright hex color (good for text/headings).
 * @returns {string} A hex color string.
 */
function getRandomBrightColor() {
  const r = Math.floor(Math.random() * 128) + 128;
  const g = Math.floor(Math.random() * 128) + 128;
  const b = Math.floor(Math.random() * 128) + 128;
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).padStart(6, '0');
}

/**
 * Generates a completely random hex color for accents/links.
 * @returns {string} A hex color string.
 */
function getRandomAccentColor() {
  return (
    '#' +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')
  );
}

// --- Theme Core Logic (Moved from Theme Switcher) ---

/**
 * Generates and applies a full random color scheme to the custom-theme CSS variables.
 * @param {boolean} persist - Whether to save the generated scheme to localStorage.
 * @param {object} [colors] - Optional pre-generated colors to use (for loading from storage).
 */
function setRandomTheme(persist = true, colors = null) {
  let newScheme;

  if (colors) {
    newScheme = colors;
  } else {
    const mainBg = getRandomDarkColor();
    const accentColor = getRandomAccentColor();
    const textColor = getRandomBrightColor();
    const headingColor = getRandomBrightColor();

    newScheme = {
      '--random-main-bg-color': mainBg,
      '--random-text-color': textColor,
      '--random-heading-color': headingColor,
      '--random-link-color': accentColor,
      '--random-link-hover-color': accentColor,
      '--random-sidebar-bg-color': mainBg + 'dd',
      '--random-border-color': getRandomDarkColor(),
      '--random-footer-bg-color': getRandomDarkColor(),
    };
  }

  const root = document.documentElement;
  for (const [key, value] of Object.entries(newScheme)) {
    root.style.setProperty(key, value);
  }

  if (persist) {
    localStorage.setItem(CUSTOM_THEME_KEY, JSON.stringify(newScheme));
    localStorage.setItem(CUSTOM_THEME_TRIGGER, 'active');
    localStorage.removeItem(THEME_KEY);
  }

  document.body.classList.add('custom-random-theme');
  document.body.classList.remove('light-theme', 'dark-theme');
  updateThemeLinks('random'); // Update link state
}

/**
 * Updates the visual state of the theme links in the new dropdown.
 * @param {string} currentTheme - 'light', 'dark', or 'random'
 */
function updateThemeLinks(currentTheme) {
  const lightLink = document.getElementById('theme-light-link');
  const darkLink = document.getElementById('theme-dark-link');
  const randomLink = document.getElementById('theme-random-link');

  // Reset all to normal
  if (lightLink) lightLink.style.fontWeight = 'normal';
  if (darkLink) darkLink.style.fontWeight = 'normal';
  if (randomLink) randomLink.style.fontWeight = 'normal';

  // Set the current one to bold
  if (currentTheme === 'light' && lightLink) lightLink.style.fontWeight = 'bold';
  if (currentTheme === 'dark' && darkLink) darkLink.style.fontWeight = 'bold';
  if (currentTheme === 'random' && randomLink) randomLink.style.fontWeight = 'bold';
}

/**
 * Updates the visual state of the background links in the new dropdown.
 * NOTE: This relies on the links being present in the HTML (which they are now).
 * @param {string} currentState - 'on' or 'off'
 */
function updateBackgroundLinks(currentState) {
  const onLink = document.getElementById('bg-on-link');
  const offLink = document.getElementById('bg-off-link');

  if (onLink) onLink.style.fontWeight = currentState === 'on' ? 'bold' : 'normal';
  if (offLink) offLink.style.fontWeight = currentState === 'off' ? 'bold' : 'normal';
}

/**
 * Clears the custom theme settings and styles.
 */
function clearCustomTheme() {
  document.body.classList.remove('custom-random-theme');
  localStorage.removeItem(CUSTOM_THEME_TRIGGER);
  localStorage.removeItem(CUSTOM_THEME_KEY);

  const root = document.documentElement;
  root.style.removeProperty('--random-main-bg-color');
  root.style.removeProperty('--random-text-color');
  root.style.removeProperty('--random-heading-color');
  root.style.removeProperty('--random-link-color');
  root.style.removeProperty('--random-link-hover-color');
  root.style.removeProperty('--random-sidebar-bg-color');
  root.style.removeProperty('--random-border-color');
  root.style.removeProperty('--random-footer-bg-color');
}

/**
 * Public function to set the theme (light, dark, or random).
 * Defined globally so the HTML `href="javascript:setTheme(...)` works.
 * @param {string} theme - 'light', 'dark', or 'random'
 */
window.setTheme = function (theme) {
  const body = document.body;

  if (theme === 'random') {
    setRandomTheme(true);
    return;
  }

  clearCustomTheme();

  if (theme === 'dark') {
    body.classList.add('dark-theme');
    body.classList.remove('light-theme');
  } else {
    body.classList.add('light-theme');
    body.classList.remove('dark-theme');
  }

  localStorage.setItem(THEME_KEY, theme);
  updateThemeLinks(theme);
};

// --- Initialization Logic (Combined) ---

function loadThemePreference() {
  const customThemeActive = localStorage.getItem(CUSTOM_THEME_TRIGGER);
  if (customThemeActive === 'active') {
    const storedScheme = JSON.parse(localStorage.getItem(CUSTOM_THEME_KEY));
    if (storedScheme) {
      setRandomTheme(false, storedScheme);
      // We still need to call updateBackgroundLinks() later, but theme links are updated here.
      return;
    }
  }

  const storedTheme = localStorage.getItem(THEME_KEY) || 'light';
  window.setTheme(storedTheme); // Use the global function
}

// --- Commit-Specific Functions (Copied from previous response) ---

function formatCommitMessage(message) {
  let formattedMessage = message;
  const match = formattedMessage.match(prRegex);

  if (match) {
    const prTag = match[1];
    const prNumber = prTag.substring(1);
    const prUrl = `${GITHUB_REPO_URL}/pull/${prNumber}`;

    formattedMessage = formattedMessage.replace(
      prRegex,
      ` (<a href="${prUrl}" target="_blank" rel="noopener noreferrer" class="commit-pr-link">${prTag}</a>)`,
    );
  }
  return formattedMessage;
}

function renderCommits(commits) {
  const commitList = document.getElementById('commit-list');
  commitList.innerHTML = '';
  if (commits.length === 0) {
    commitList.innerHTML = '<li>No commits found.</li>';
    return;
  }
  commits.forEach((commit) => {
    const li = document.createElement('li');
    const formattedMessage = formatCommitMessage(commit.message);
    li.innerHTML = `
              <a
                  href="${GITHUB_COMMIT_URL}${commit.sha}"
                  target="_blank"
                  class="commit-sha-link"
              >
                  ${commit.short_sha}
              </a>
              (<span class="commit-date-span">${commit.date}</span>):
              ${formattedMessage}
          `;
    commitList.appendChild(li);
  });
}

function loadCommitData() {
  const commitList = document.getElementById('commit-list');
  fetch('commits.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      allCommits = data;
      renderCommits(allCommits);
    })
    .catch((error) => {
      commitList.innerHTML =
        '<li>Error loading static commit data. Check build process and file path.</li>';
      console.error('Error loading static commits.json:', error);
    });
}

// --- DOM Ready Event Listener (Combined Initialization & Event Handlers) ---

document.addEventListener('DOMContentLoaded', () => {
  // Commit Elements
  const commitButton = document.getElementById('commit-dropdown-button');
  const commitContent = document.getElementById('commit-dropdown-content');
  const searchBar = document.getElementById('commit-search');

  // Theme Elements
  const themeButton = document.getElementById('theme-toggle-button');
  const themeContent = document.getElementById('theme-options-content');

  // 1. Initial Load
  loadThemePreference();
  // Note: loadBackgroundPreference will be called from background-switcher.js

  // 2. Commit Dropdown Toggle
  commitButton.addEventListener('click', () => {
    const wasHidden = commitContent.classList.toggle('commit-dropdown-hidden');

    if (!wasHidden && allCommits.length === 0) {
      loadCommitData();
    }
  });

  // 3. Theme Dropdown Toggle
  themeButton.addEventListener('click', () => {
    themeContent.classList.toggle('commit-dropdown-hidden');
  });

  // 4. Commit Search and Filter
  searchBar.addEventListener('keyup', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();

    if (searchTerm === '') {
      renderCommits(allCommits);
      return;
    }

    const filteredCommits = allCommits.filter(
      (commit) =>
        commit.message.toLowerCase().includes(searchTerm) ||
        commit.sha.toLowerCase().includes(searchTerm),
    );
    renderCommits(filteredCommits);
  });
});
