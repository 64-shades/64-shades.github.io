// Map page IDs to their corresponding background image URLs
const BG_MAP = {
    "shades-games-club":    "the-big-issue",
    "first-event":          "first-event-second-game",
    "second-event":         "second-event",
    "third-event":          "third-event-beers-in-play",
    "fourth-event":         "fourth-event",
    "fifth-event":          "fifth-event",
    "sixth-event":          "sixth-event",
    "catan":                "catan",
    "chess":                "chess",
    "c-o-o-l-chess":        "cool-chess",
    "harmegedo":            "harmegedo",
    "history-of-64-shades": "history",
    "quaternity":           "quaternity-wooden-set",
    "the-first-challenger": "first-event-first-game",
    "top-pitfalls":         "top-pitfalls",
    "uno-show-em-no-mercy": "uno-show-em-no-mercy"
};

const THEME_KEY = 'sphinx_theme_preference';
const BACKGROUND_KEY = 'sphinx_background_preference';
const CUSTOM_THEME_KEY = 'sphinx_custom_theme_colors';
const CUSTOM_THEME_TRIGGER = 'sphinx_custom_theme_active';

/**
 * Generates a random dark hex color (good for backgrounds).
 * @returns {string} A hex color string.
 */
function getRandomDarkColor() {
    // Generate a random number up to 127 (to ensure a darker shade)
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
    // Generate a random number from 128 to 255 (to ensure a lighter shade)
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
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
}

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
            // Add transparency to sidebar background to let the body background show through a bit
            '--random-sidebar-bg-color': mainBg + 'dd',
            '--random-border-color': getRandomDarkColor(),
            '--random-footer-bg-color': getRandomDarkColor(),
        };
    }

    const root = document.documentElement;

    // Apply the colors to the root element for immediate effect
    for (const [key, value] of Object.entries(newScheme)) {
        root.style.setProperty(key, value);
    }

    if (persist) {
        localStorage.setItem(CUSTOM_THEME_KEY, JSON.stringify(newScheme));
        localStorage.setItem(CUSTOM_THEME_TRIGGER, 'active');
        // Deactivate light/dark theme preference when using random
        localStorage.removeItem(THEME_KEY);
    }

    // Set the body class to trigger the custom theme CSS block
    document.body.classList.add('custom-random-theme');
    // Ensure light/dark classes are removed
    document.body.classList.remove('light-theme', 'dark-theme');
    updateThemeLinks('random'); // Update link state
}

/**
 * Updates the visual state of the theme links in the sidebar.
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
 * Updates the visual state of the background links in the sidebar.
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
    // Clear the custom properties
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
 * @param {string} theme - 'light', 'dark', or 'random'
 */
function setTheme(theme) {
    const body = document.body;

    // 1. Handle the 'random' case
    if (theme === 'random') {
        setRandomTheme(true); // Generates new colors and saves them
        return; // Exit as setRandomTheme handles the rest
    }

    // 2. Clear custom theme settings before applying light/dark
    clearCustomTheme();

    // 3. Handle 'light'/'dark' cases
    if (theme === 'dark') {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
    } else {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
    }

    localStorage.setItem(THEME_KEY, theme);
    updateThemeLinks(theme);
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
    const bodyWrapper = document.querySelector('.bodywrapper');

    if (state === 'on' && bgUrl) {
        body.style.backgroundImage = `url('_static/images/backgrounds/${bgUrl}.jpg')`;
        body.style.backgroundSize = 'cover';
        body.style.backgroundAttachment = 'fixed';
        body.classList.add('background-on');

        if (bodyWrapper) {
             // bodywrapper must be transparent to show body background image
            bodyWrapper.style.background = 'transparent';
        }
    } else {
        body.style.backgroundImage = 'none';
        body.style.backgroundSize = '';
        body.style.backgroundAttachment = '';
        body.classList.remove('background-on');

        if (bodyWrapper) {
            // bodywrapper uses the theme-specific background color
            bodyWrapper.style.background = 'var(--main-bg-color)';
        }
    }

    localStorage.setItem(BACKGROUND_KEY, state);
    updateBackgroundLinks(state);
}

function loadThemePreference() {
    // Check if a custom theme was active first
    const customThemeActive = localStorage.getItem(CUSTOM_THEME_TRIGGER);
    if (customThemeActive === 'active') {
        const storedScheme = JSON.parse(localStorage.getItem(CUSTOM_THEME_KEY));
        if (storedScheme) {
            // Apply saved custom scheme without re-generating new random colors
            setRandomTheme(false, storedScheme);
            updateThemeLinks('random');
            return;
        }
    }

    // If no custom theme, load light/dark
    const storedTheme = localStorage.getItem(THEME_KEY) || 'light';
    setTheme(storedTheme);
}

function loadBackgroundPreference() {
    const storedBackground = localStorage.getItem(BACKGROUND_KEY) || 'on';
    setBackground(storedBackground);
}


// Wait for the document to fully load
document.addEventListener('DOMContentLoaded', function() {
    // 1. Load and apply stored preferences
    loadThemePreference();
    loadBackgroundPreference();
});
