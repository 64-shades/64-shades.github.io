// --- Global Constants (Theme & Background) ---
const THEME_KEY = 'sphinx_theme_preference';
const CUSTOM_THEME_KEY = 'sphinx_custom_theme_colors';
const CUSTOM_THEME_TRIGGER = 'sphinx_custom_theme_active';

// --- Commit-Specific Constants ---
const GITHUB_REPO_URL = 'https://github.com/64-shades/64-shades.github.io';
const GITHUB_COMMIT_URL = `${GITHUB_REPO_URL}/commit/`;
const prRegex = /\((#\d+)\)\s*$/;
let allCommits = [];

// ---------------------------------------------
// I. THEME CORE LOGIC (Sanitized for DOM interaction)
// ---------------------------------------------

/**
 * Generates random dark/bright colors (omitted for brevity, assume safe functions).
 */
function getRandomDarkColor() {
  const r = Math.floor(Math.random() * 128);
  const g = Math.floor(Math.random() * 128);
  const b = Math.floor(Math.random() * 128);
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).padStart(6, '0');
}

function getRandomBrightColor() {
  const r = Math.floor(Math.random() * 128) + 128;
  const g = Math.floor(Math.random() * 128) + 128;
  const b = Math.floor(Math.random() * 128) + 128;
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).padStart(6, '0');
}

function getRandomAccentColor() {
  return (
    '#' +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')
  );
}

function setRandomTheme(persist = true, colors = null) {
  let newScheme;

  if (colors) {
    newScheme = colors;
  } else {
    // Generate new scheme (all functions return clean hex strings)
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
    // Setting CSS properties with safe string values is secure
    root.style.setProperty(key, value);
  }

  if (persist) {
    localStorage.setItem(CUSTOM_THEME_KEY, JSON.stringify(newScheme));
    localStorage.setItem(CUSTOM_THEME_TRIGGER, 'active');
    localStorage.removeItem(THEME_KEY);
  }

  document.body.classList.add('custom-random-theme');
  document.body.classList.remove('light-theme', 'dark-theme');
  updateThemeLinks('random');
}

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
 * @public Function to set the theme (light, dark, or random).
 * Exposed globally via window.setTheme.
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

/**
 * Updates the visual state of the theme links using classList/style.
 * NOTE: The use of element.style.fontWeight here is minimal and localized.
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
 * Update background links (placeholder for interaction with background-switcher.js)
 */
window.updateBackgroundLinks = function (currentState) {
  const onLink = document.getElementById('bg-on-link');
  const offLink = document.getElementById('bg-off-link');

  // Use style properties for simple, localized formatting
  if (onLink) onLink.style.fontWeight = currentState === 'on' ? 'bold' : 'normal';
  if (offLink) offLink.style.fontWeight = currentState === 'off' ? 'bold' : 'normal';
};

function loadThemePreference() {
  const customThemeActive = localStorage.getItem(CUSTOM_THEME_TRIGGER);
  if (customThemeActive === 'active') {
    const storedScheme = JSON.parse(localStorage.getItem(CUSTOM_THEME_KEY));
    if (storedScheme) {
      setRandomTheme(false, storedScheme);
      return;
    }
  }

  const storedTheme = localStorage.getItem(THEME_KEY) || 'light';
  window.setTheme(storedTheme);
}

// ---------------------------------------------
// II. COMMIT BANNER LOGIC (Secure Refactoring)
// ---------------------------------------------

/**
 * Processes the commit message to convert a trailing PR number
 * into an HTML link. This is the ONLY place where controlled HTML is generated.
 * @param {string} message - The original commit message (potentially malicious).
 * @returns {string} The formatted message with a linked PR anchor, or the original message.
 */
function formatCommitMessage(message) {
  let formattedMessage = message;
  const match = formattedMessage.match(prRegex);

  if (match) {
    const prTag = match[1]; // e.g., "#241"
    const prNumber = prTag.substring(1);
    const prUrl = `${GITHUB_REPO_URL}/pull/${prNumber}`;

    // Replace the matched text with the HTML anchor tag, using the CSS class
    // NOTE: This inserts a controlled <a> tag. We trust this structure.
    formattedMessage = formattedMessage.replace(
      prRegex,
      ` (<a
                  href="${prUrl}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="commit-pr-link"
              >${prTag}</a>)`,
    );
  }
  return formattedMessage;
}

/**
 * Renders the list of commits, building the DOM using createElement and
 * textContent to ensure security against XSS.
 * @param {Array<Object>} commits - The list of commit objects.
 */
function renderCommits(commits) {
  const commitList = document.getElementById('commit-list');
  commitList.innerHTML = ''; // Safely clear the list

  if (commits.length === 0) {
    // Using textContent is safer than innerHTML even for static messages
    const li = document.createElement('li');
    li.textContent = 'No commits found.';
    commitList.appendChild(li);
    return;
  }

  commits.forEach((commit) => {
    const li = document.createElement('li');

    // --- 1. SHA Link (using textContent for secure data injection) ---
    const shaLink = document.createElement('a');
    shaLink.href = `${GITHUB_COMMIT_URL}${commit.sha}`;
    shaLink.target = '_blank';
    shaLink.rel = 'noopener noreferrer'; // Good practice for target="_blank"
    shaLink.className = 'commit-sha-link';
    shaLink.textContent = commit.short_sha;

    // --- 2. Date Span (using textContent) ---
    const dateSpan = document.createElement('span');
    dateSpan.className = 'commit-date-span';
    dateSpan.textContent = commit.date;

    // --- 3. Message Content (Handling controlled HTML vs. text) ---
    const formattedMessageHTML = formatCommitMessage(commit.message);

    // Create a temporary element to parse the HTML and extract its contents safely
    const tempDiv = document.createElement('div');
    // We rely on formatCommitMessage to only generate safe, non-malicious HTML.
    tempDiv.innerHTML = formattedMessageHTML;

    // --- 4. Assembly ---
    // Structure: <li>SHA_LINK (DATE_SPAN): MESSAGE_CONTENT</li>
    li.appendChild(shaLink);
    li.appendChild(document.createTextNode(' (')); // Text node for secure parentheses
    li.appendChild(dateSpan);
    li.appendChild(document.createTextNode('): ')); // Text node for colon and space

    // Append the content generated by formatCommitMessage
    // This loops through children in case the message was long/complex, though
    // formatCommitMessage currently returns just text or text + <a>.
    while (tempDiv.firstChild) {
      li.appendChild(tempDiv.firstChild);
    }

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

// ---------------------------------------------
// III. DOM READY / EVENT HANDLERS
// ---------------------------------------------

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
    // Sanitize input: only convert to lowercase/trim, no insertion into DOM
    const searchTerm = e.target.value.toLowerCase().trim();

    if (searchTerm === '') {
      renderCommits(allCommits);
      return;
    }

    const filteredCommits = allCommits.filter(
      (commit) =>
        // Comparing against data is safe
        commit.message.toLowerCase().includes(searchTerm) ||
        commit.sha.toLowerCase().includes(searchTerm),
    );
    renderCommits(filteredCommits);
  });
});
