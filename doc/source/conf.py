# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = "64 Shades"
copyright = "2025, 64 Shades"
author = "64 Shades"

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = [
    "notfound.extension",
]  # type: ignore

# NOTE: We keep templates_path to ensure our new template is found
templates_path = ["_templates"]
exclude_patterns = []  # type: ignore

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = "alabaster"
html_static_path = ["_static"]

html_logo = "_static/images/logo.jpeg"

# Add your custom CSS file (updated to use the new CSS variables)
html_css_files = ["css/custom.css"]

# NEW: Rename and update the JS file to handle both background and theme switching
html_js_files = [
    "js/theme_and_background_switcher.js",
]

# NEW: This includes the theme switcher controls in the sidebar
html_sidebars = {
    "**": [
        "about.html",  # Default: About section
        "navigation.html",  # Default: Table of contents
        "relations.html",  # Default: Next/Previous links
        "searchbox.html",  # Default: Search box
        "sidebar_theme_switcher.html",  # CUSTOM: Our new template for the switcher
    ]
}

html_theme_options = {
    "github_user": "64-shades",
    "github_repo": "64-shades.github.io",
    "github_button": True,  # This enables the GitHub button feature
    "github_type": "fork",  # Use 'watch' for the Star button
    # REMOVED: The extra_nav_links are now placed directly via the template file
}
