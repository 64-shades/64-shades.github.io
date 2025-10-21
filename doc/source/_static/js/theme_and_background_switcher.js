// Map page IDs to their corresponding background image URLs
const BG_MAP = {
    "welcome-to-the-official-64-shades-world-chess-team-and-games-club": "the-big-issue",
    "first-event":          "first-event-second-game",
    "harmegedo":            "harmegedo",
    "history-of-64-shades": "history",
    "second-event":         "second-event",
    "quaternity":           "quaternity-wooden-set",
    "the-first-challenger": "first-event-first-game",
    "third-event":          "third-event-beers-in-play"
};

const THEME_KEY = 'sphinx_theme_preference';
const BACKGROUND_KEY = 'sphinx_background_preference';

/**
 * Updates the visual state of the theme links in the sidebar.
 * @param {string} currentTheme - 'light' or 'dark'
 */
function updateThemeLinks(currentTheme) {
    const lightLink = document.getElementById('theme-light-link');
    const darkLink = document.getElementById('theme-dark-link');

    if (lightLink) lightLink.style.fontWeight = currentTheme === 'light' ? 'bold' : 'normal';
    if (darkLink) darkLink.style.fontWeight = currentTheme === 'dark' ? 'bold' : 'normal';
}

/**
 * Updates the visual state of the background links in the sidebar.
 * @param {string} currentState - 'on' or 'off'
 */
function updateBackgroundLinks(currentState) {
    const onLink = document.getElementById('bg-on-link');
    const offLink = document.getElementById('bg-off-link');

    if (onLink) onLink.style.fontWeight = currentState === 'on' ? 'bold' : 'normal';
    if (offLink) offLink.style.fontWeight = currentState === 'off' ? 'bold' : 'normal';
}

function loadThemePreference() {
    const storedTheme = localStorage.getItem(THEME_KEY) || 'light';
    setTheme(storedTheme);
}

function loadBackgroundPreference() {
    const storedBackground = localStorage.getItem(BACKGROUND_KEY) || 'on';
    setBackground(storedBackground);
}

/**
 * Public function to set the theme (light or dark).
 * @param {string} theme - 'light' or 'dark'
 */
function setTheme(theme) {
    const body = document.body;
    if (theme === 'dark') {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
    } else {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
    }
    localStorage.setItem(THEME_KEY, theme);
    updateThemeLinks(theme); // Call the new function to update the links
}

/**
 * Public function to turn the background image on or off.
 * @param {string} state - 'on' or 'off'
 */
function setBackground(state) {
    const mainSection = document.querySelector('[role="main"] > section:first-child');
    if (!mainSection) return;

    const pageId = mainSection.id;
    const bgUrl = BG_MAP[pageId];
    const body = document.body;

    if (state === 'on' && bgUrl) {
        body.style.backgroundImage = `url('_static/images/backgrounds/${bgUrl}.jpg')`;
        body.style.backgroundSize = 'cover';
        body.style.backgroundAttachment = 'fixed';
        body.classList.add('background-on');
    } else {
        body.style.backgroundImage = 'none';
        body.style.backgroundSize = '';
        body.style.backgroundAttachment = '';
        body.classList.remove('background-on');
    }

    const bodyWrapper = document.querySelector('.bodywrapper');
    if (bodyWrapper) {
        // bodywrapper is transparent when background is 'on', or uses theme color when 'off'
        bodyWrapper.style.background = state === 'on' ? 'transparent' : 'var(--main-bg-color)';
    }

    localStorage.setItem(BACKGROUND_KEY, state);
    updateBackgroundLinks(state); // Call the new function to update the links
}


// Wait for the document to fully load
document.addEventListener('DOMContentLoaded', function() {
    // 1. Load and apply stored preferences
    loadThemePreference();
    loadBackgroundPreference();
});
