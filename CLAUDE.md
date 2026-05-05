# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Landing page for the [Model Graph Tools](https://github.com/model-graph-tools) project, served at https://model-graph-tools.github.io. It's a static site — a single `index.html` with inline CSS/JS, plus an `install.sh` script for the `mgt` CLI.

## Architecture

- **`index.html`** — page markup. No build step, no framework, no external dependencies.
- **`styles.css`** — all styles. Uses CSS custom properties for light/dark theming.
- **`main.js`** — vanilla JS: theme toggle, tab switching, copy-to-clipboard.
- **`install.sh`** — shell installer that downloads the latest `mgt` binary from GitHub Releases. Supports Linux (x86_64) and macOS (x86_64, aarch64).
- **`.nojekyll`** — tells GitHub Pages to serve files as-is without Jekyll processing.

## Deployment

Pushes to `main` auto-deploy via GitHub Actions (`.github/workflows/deploy.yml`). The workflow uploads the entire repo root as a Pages artifact — no build step.

## Development

Open `index.html` in a browser. There is no dev server, build tool, or package manager. To preview changes, reload the file.

## Design System

The site uses CSS custom properties for theming. All color tokens are in `:root` (light) and `[data-theme="dark"]` (dark) blocks at the top of the `<style>` tag. The accent color is `#e53e3e` (red). Max content width is `1080px`.

Key CSS conventions:
- `.mono` class for monospace font
- `.pipeline-box.{red,green,blue,amber}` for the architecture diagram colors
- `.card-label.{green,red,purple}` and `.card-terminal.{green,purple}` for ecosystem card variants
- Responsive breakpoint at `768px` switches layouts from row to column
