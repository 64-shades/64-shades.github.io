<div align="center">
  <h1>♠️ 🎮 🎴 👾 64 Shades 🀄 🃏 ♟️ 🎲 🕹️</h1>
</div>

[![View the project board](https://img.shields.io/badge/view_the_project_board-orange?style=for-the-badge)](https://github.com/orgs/64-shades/projects/1/views/1)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/jbampton?style=for-the-badge&label=Sponsor%20John%20Bampton&labelColor=red&color=cyan)](https://github.com/sponsors/jbampton)
[![Discord](https://img.shields.io/discord/1400571757554958437?label=Discord&style=for-the-badge)](https://discord.gg/a6qtB4csnk)
[![Read the Docs Documentation Status](https://img.shields.io/website?url=https%3A%2F%2F64-shades.readthedocs.io%2F&label=read-the-docs&style=for-the-badge)](https://64-shades.readthedocs.io/en/latest/)

[![CodeQL](https://github.com/64-shades/64-shades.github.io/actions/workflows/codeql.yml/badge.svg?branch=main)](https://github.com/64-shades/64-shades.github.io/actions/workflows/codeql.yml)
[![Dependabot Updates](https://github.com/64-shades/64-shades.github.io/actions/workflows/dependabot/dependabot-updates/badge.svg?branch=main)](https://github.com/64-shades/64-shades.github.io/actions/workflows/dependabot/dependabot-updates)
[![First Interaction](https://github.com/64-shades/64-shades.github.io/actions/workflows/first-interaction.yml/badge.svg)](https://github.com/64-shades/64-shades.github.io/actions/workflows/first-interaction.yml)
[![Git Clone Matrix](https://github.com/64-shades/64-shades.github.io/actions/workflows/git-clone-matrix.yml/badge.svg?branch=main)](https://github.com/64-shades/64-shades.github.io/actions/workflows/git-clone-matrix.yml)
[![ls-lint](https://github.com/64-shades/64-shades.github.io/actions/workflows/ls-lint.yml/badge.svg?branch=main)](https://github.com/64-shades/64-shades.github.io/actions/workflows/ls-lint.yml)
[![pre-commit](https://github.com/64-shades/64-shades.github.io/actions/workflows/pre-commit.yml/badge.svg?branch=main)](https://github.com/64-shades/64-shades.github.io/actions/workflows/pre-commit.yml)
[![Pages Build Deployment](https://github.com/64-shades/64-shades.github.io/actions/workflows/pages/pages-build-deployment/badge.svg?branch=main)](https://github.com/64-shades/64-shades.github.io/actions/workflows/pages/pages-build-deployment)

## About the Site Generator

This site is built using ...

## Technology Stack

### Hosting

- [Read the Docs](https://about.readthedocs.com/) is a Continuous Documentation Deployment platform designed to simplify the process of building,
  versioning, and hosting technical documentation, particularly for software projects. It operates on the principle of
  "docs as code," integrating with version control systems like Git (GitHub, GitLab, Bitbucket) to automatically build
  and update documentation whenever changes are committed to the repository.

### Framework

- [Alabaster](https://alabaster.readthedocs.io/) is a visually (c)lean, responsive, configurable theme for the Sphinx documentation system. It requires Python 3.10 or newer and Sphinx 6.2     or newer.
- [CSS](https://en.wikipedia.org/wiki/CSS), or Cascading Style Sheets, is a stylesheet language used to describe the presentation and styling
  of a document written in a markup language, most commonly HTML. It is a fundamental technology of the World Wide Web,
  working alongside HTML and JavaScript to create interactive and visually appealing websites.
- [HTML](https://en.wikipedia.org/wiki/HTML), or Hypertext Markup Language, is the standard language for creating web pages and structuring their content. It uses tags to define elements like headings, paragraphs, and images, telling a web browser how    to display them. HTML is the foundational building block of the internet, providing the structure that is then styled with languages like CSS and made interactive with JavaScript.  
- [JavaScript](https://en.wikipedia.org/wiki/JavaScript) is a programming language and core technology of the web platform, alongside HTML and CSS.
  Ninety-nine percent of websites on the World Wide Web use JavaScript on the client side for webpage behavior.
  Web browsers have a dedicated JavaScript engine that executes the client code.
- [Makefiles](https://en.wikipedia.org/wiki/Make_(software)) are text files that contain instructions for the make utility, a build automation tool commonly used in Unix-like operating systems. They define how to build or update target files (like executables or libraries) from source files,
  managing dependencies and executing commands.
- [Python](https://www.python.org/) is a programming language that lets you work quickly and integrate systems more effectively.
- [reStructuredText (RST)](https://www.sphinx-doc.org/en/master/usage/restructuredtext/basics.html) is a lightweight markup language designed for creating easy-to-read and easy-to-write
  plaintext documents that can be automatically converted to various output formats, such as HTML, LaTeX (and thus PDF),
  and more. It is a key component of the Docutils project and is widely used in the Python community for writing
  technical documentation, including Python's official documentation and documentation for many Python libraries.
- [Sphinx](https://www.sphinx-doc.org/en/master/) is a powerful and widely-used documentation generator written in Python. It is particularly popular
  within the Python community and is considered the de facto standard for documenting Python projects.

---

### Build the Documentation

Run the following commands from the repository root to create the Sphinx documentation with Make:

```shell
cd doc
pip install -r requirements-docs.txt
make html
```

For hot reloading on Nix like OS run `make livehtml`

The generated HTML site will be in the `doc/build/html` folder.
You can open the HTML files with your web browser.

---

## Contributors

[![Contributors](https://contrib.rocks/image?repo=64-shades/64-shades.github.io)](https://github.com/64-shades/64-shades.github.io/graphs/contributors)

---

© 2025 64 Shades
