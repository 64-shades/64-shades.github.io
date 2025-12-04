# Contributing to En Passant

Thank you for your interest in contributing to En Passant documentation! We welcome contributions from everyone, whether you're fixing a typo, improving existing content, or adding new documentation.

## Getting Started

### Prerequisites

- **Python** - Required for building the documentation
- **Git** - For version control
- Basic familiarity with **reStructuredText (RST)** markup (don't worry, it's easy to learn!)

### Setting Up Your Development Environment

1. **Fork the repository** - Click the "Fork" button at the top right of the repository page

2. **Clone your fork**

   ```bash
      git clone https://github.com/YOUR_USERNAME/64-shades.github.io.git
      cd 64-shades.github.io
   ```

3. **Install dependencies**

   ```bash
      cd doc
      pip install -r requirements-docs.txt
   ```

4. **Create a branch for your changes**

   ```bash
      git checkout -b fix/your-fix-name
   ```

Use prefixes like `fix/`, `feature/`, `docs/`, or `update/` for your branch names.

## Building the Documentation Locally

To preview your changes before submitting:

```bash
cd doc
make html
```

The generated HTML site will be in the `doc/build/html` folder. Open `index.html` in your web browser to view your changes.

**Tip:** Run `make html` after each change to ensure your RST syntax is correct and the documentation builds without errors.

## Making Changes

### Documentation Guidelines

- **Use reStructuredText (RST)** - All documentation is written in RST format
- **Be clear and concise** - Write in simple, understandable language
- **Check spelling and grammar** - Proofread your contributions
- **Follow existing structure** - Match the style and formatting of existing documentation
- **Test your changes** - Always build locally to verify your changes render correctly

### Common RST Syntax

Here are some helpful RST patterns used in the project:

```rst
Headers
=======

Subheaders
----------

**bold text**
*italic text*

- Bullet point
- Another point

1. Numbered list
2. Second item

`inline code`

.. code-block:: python

   # Code block
   print("Hello, World!")

`Link text <https://example.com>`_
```

For more RST syntax, check the [reStructuredText documentation](https://www.sphinx-doc.org/en/master/usage/restructuredtext/basics.html).

## Submitting Your Contribution

### Commit Your Changes

```bash
git add .
git commit -m "Docs: brief description of your changes"
```

**Commit message prefixes:**

- `Docs:` - Documentation changes
- `Fix:` - Bug fixes or corrections
- `Add:` - New content or features
- `Update:` - Updates to existing content

### Push to Your Fork

```bash
git push origin fix/your-fix-name
```

### Open a Pull Request

1. Go to the original En Passant repository
2. Click **"New Pull Request"**
3. Click **"compare across forks"** and select your fork and branch
4. Provide a clear title and description
5. Reference the related issue using `Closes #issue-number` or `Fixes #issue-number`
6. Submit your PR

**In your PR description, include:**

- What changes you made
- Why you made them
- Any issues this fixes or addresses
- Screenshots (if applicable for visual changes)

## Types of Contributions We Welcome

### Documentation Improvements

- Fixing typos, grammar, or formatting
- Clarifying confusing sections
- Adding examples or tutorials
- Improving code samples
- Updating outdated information

### New Content

- Adding new documentation pages
- Creating guides or tutorials
- Documenting new features
- Adding diagrams or illustrations

### Technical Improvements

- Fixing broken links
- Improving Sphinx configuration
- Enhancing CSS styling
- Adding useful Sphinx extensions

## Reporting Issues

Found a problem? Here's how to report it:

1. **Check existing issues** - Someone may have already reported it
2. **Create a new issue** with:
   - Clear, descriptive title
   - Description of the problem
   - Steps to reproduce (if applicable)
   - Suggested fix (if you have one)
3. **Use appropriate labels** - `documentation`, `bug`, `enhancement`, etc.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Provide constructive feedback
- Focus on the content, not the person
- Respect different perspectives and experiences

## Getting Help

Need assistance? Here are some ways to get help:

- **Open an issue** with the `question` label
- **Check existing documentation** in the repository
- **Review closed issues and PRs** for similar questions
- **Reach out to maintainers** through GitHub

## Continuous Deployment

Once your PR is merged, Read the Docs will automatically rebuild and deploy the documentation. Your changes will be live within minutes!

## License

By contributing to En Passant, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing! Your efforts help make this documentation better for everyone. 📚✨
