# 64-shades

[![View the project board](https://img.shields.io/badge/view_the_project_board-orange)](https://github.com/orgs/64-shades/projects/1/views/1)
[![Discord](https://img.shields.io/discord/1400571757554958437?label=Discord)](https://discord.gg/a6qtB4csnk)
[![Documentation Status](https://app.readthedocs.org/projects/64-shades/badge/?version=latest)](https://64-shades.readthedocs.io/en/latest/)
[![Website Status](https://img.shields.io/website?url=https%3A%2F%2F64-shades.github.io%2F&label=github-pages)](https://64-shades.github.io/)

[![CodeQL](https://github.com/64-shades/64-shades.github.io/actions/workflows/codeql.yml/badge.svg?branch=main)](https://github.com/64-shades/64-shades.github.io/actions/workflows/codeql.yml)
[![Dependabot Updates](https://github.com/64-shades/64-shades.github.io/actions/workflows/dependabot/dependabot-updates/badge.svg?branch=main)](https://github.com/64-shades/64-shades.github.io/actions/workflows/dependabot/dependabot-updates)
[![First Interaction](https://github.com/64-shades/64-shades.github.io/actions/workflows/first-interaction.yml/badge.svg)](https://github.com/64-shades/64-shades.github.io/actions/workflows/first-interaction.yml)
[![Git Clone Matrix](https://github.com/64-shades/64-shades.github.io/actions/workflows/git-clone-matrix.yml/badge.svg?branch=main)](https://github.com/64-shades/64-shades.github.io/actions/workflows/git-clone-matrix.yml)
[![Lerna](https://github.com/64-shades/64-shades.github.io/actions/workflows/lerna.yml/badge.svg?branch=main)](https://github.com/64-shades/64-shades.github.io/actions/workflows/lerna.yml)
[![ls-lint](https://github.com/64-shades/64-shades.github.io/actions/workflows/ls-lint.yml/badge.svg?branch=main)](https://github.com/64-shades/64-shades.github.io/actions/workflows/ls-lint.yml)
[![pre-commit](https://github.com/64-shades/64-shades.github.io/actions/workflows/pre-commit.yml/badge.svg?branch=main)](https://github.com/64-shades/64-shades.github.io/actions/workflows/pre-commit.yml)

[![Build and Deploy Eleventy site](https://github.com/64-shades/64-shades.github.io/actions/workflows/deploy-eleventy-site.yml/badge.svg?branch=main)](https://github.com/64-shades/64-shades.github.io/actions/workflows/deploy-eleventy-site.yml)
[![CI - Build Eleventy on PR](https://github.com/64-shades/64-shades.github.io/actions/workflows/deploy-eleventy-site-on-pr.yml/badge.svg)](https://github.com/64-shades/64-shades.github.io/actions/workflows/deploy-eleventy-site-on-pr.yml)
[![Pages Build Deployment](https://github.com/64-shades/64-shades.github.io/actions/workflows/pages/pages-build-deployment/badge.svg?branch=main)](https://github.com/64-shades/64-shades.github.io/actions/workflows/pages/pages-build-deployment)

## About the Site Generator

This website is built using [Eleventy (11ty)](https://www.11ty.dev/), a modern and flexible static site generator for JavaScript projects. Eleventy takes your content and templates and generates a fast, static website. You do not need to know advanced JavaScript to get started - just follow the steps below!

## Technology Stack

- [GitHub Pages](https://pages.github.com/) is a static site hosting service offered by GitHub, enabling users to host websites directly from their GitHub repositories. It is designed for publishing static content, meaning it primarily handles HTML, CSS, and JavaScript files, and does not support server-side languages like PHP or Python for dynamic content generation.
- [Read the Docs](https://about.readthedocs.com/) is a Continuous Documentation Deployment platform designed to simplify the process of building, versioning, and hosting technical documentation, particularly for software projects. It operates on the principle of "docs as code," integrating with version control systems like Git (GitHub, GitLab, Bitbucket) to automatically build and update documentation whenever changes are committed to the repository.
- [Lerna](https://lerna.js.org/) is a fast, modern build system for managing and publishing multiple JavaScript/TypeScript packages from the same repository.
- [Vitest](https://vitest.dev/) is a blazing-fast, next-generation testing framework designed for modern JavaScript and TypeScript projects, built on top of Vite. It's known for its speed and developer experience, offering instant feedback and seamless integration with Vite's features like hot module replacement (HMR). Vitest is inspired by Jest and aims to provide a familiar yet enhanced testing experience.
- [Eleventy (also known as 11ty)](https://www.11ty.dev/) is a static site generator. It's a tool that transforms content (like Markdown, HTML, or JavaScript) and templates into static HTML files, making it faster and easier to build websites. Unlike dynamic website builders, 11ty generates all the website's content upfront, which leads to better performance and simpler deployments.
- [Tailwind CSS](https://tailwindcss.com/) is a utility-first CSS framework designed for rapidly building custom user interfaces directly within HTML. Unlike traditional CSS frameworks that provide pre-built components (like buttons or navigation bars), Tailwind offers a comprehensive set of low-level utility classes.
- [Nunjucks](https://mozilla.github.io/nunjucks/) is a powerful and flexible templating engine for JavaScript, heavily inspired by Jinja2 (a popular templating engine for Python). It allows developers to create dynamic HTML, XML, or other text-based content by embedding logic, variables, and control structures directly within templates.
- [Sphinx](https://www.sphinx-doc.org/en/master/) is a powerful and widely-used documentation generator written in Python. It is particularly popular within the Python community and is considered the de facto standard for documenting Python projects.
- [reStructuredText (RST)](https://www.sphinx-doc.org/en/master/usage/restructuredtext/basics.html) is a lightweight markup language designed for creating easy-to-read and easy-to-write plaintext documents that can be automatically converted to various output formats, such as HTML, LaTeX (and thus PDF), and more. It is a key component of the Docutils project and is widely used in the Python community for writing technical documentation, including Python's official documentation and documentation for many Python libraries.

Read below for instructions about the current static development site hosted on [GitHub Pages](https://pages.github.com/).

---

### Getting Started / Building the Site

To start a local development server with live reload, run:

```bash
npm run start
```

---

### Build the Documentation

Run the following commands from the repo root to create the Sphinx documentation with Make:

```shell
cd doc
make html
```

The generated HTML site will be in the `doc/build/html` folder.
You can open the HTML files with your web browser.

---

## Contributors

[![Contributors](https://contrib.rocks/image?repo=64-shades/64-shades.github.io)](https://github.com/64-shades/64-shades.github.io/graphs/contributors)

---

© 2025 64 Shades
