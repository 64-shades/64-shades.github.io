
// Map page IDs to their corresponding background image URLs
const BG_MAP = {
    "welcome-to-the-official-64-shades-world-chess-team-and-games-club": "the-big-issue",
    "first-event":          "first-event-second-game",
    "harmegedo":            "harmegedo",
    "second-event":         "second-event",
    "quaternity":           "quaternity-wooden-set",
    "the-first-challenger": "first-event-first-game",
    // Add more page IDs and their image paths here
};

document.addEventListener('DOMContentLoaded', function() {
    // 1. Find the main content section element
    // This targets the first <section> inside the element with role="main" (the body content area)
    const mainSection = document.querySelector('[role="main"] > section:first-child');

    if (mainSection) {
        // 2. Get the unique ID (e.g., "first-event")
        const pageId = mainSection.id;

        // 3. Look up the background image URL
        const bgUrl = BG_MAP[pageId];

        if (bgUrl) {
            // 4. Apply the background style to the <body> tag
            document.body.style.backgroundImage = `url('_static/images/backgrounds/${bgUrl}.jpg')`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundAttachment = 'fixed';
            // Optional: You might need to set the background of the main content wrapper to transparent
            // document.querySelector('.bodywrapper').style.background = 'transparent';
        }
    }
});
