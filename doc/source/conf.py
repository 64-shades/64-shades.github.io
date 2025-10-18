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

templates_path = ["_templates"]
exclude_patterns = []  # type: ignore

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = "alabaster"
html_static_path = ["_static"]

html_logo = "_static/images/logo.jpeg"

# Add your custom CSS file
html_css_files = ["css/custom.css"]

html_js_files = [
    "js/page_background.js",
    # Keep any other JS files here
]

html_theme_options = {
    "github_user": "64-shades",
    "github_repo": "64-shades.github.io",
    "github_button": True,  # This enables the GitHub button feature
    "github_type": "fork",  # Use 'watch' for the Star button
}
