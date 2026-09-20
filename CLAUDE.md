# Site notes for AI assistants

Personal portfolio at https://owensanborn.github.io (React + Vite + Tailwind v4).

## Publishing changes: two separate steps

The live site is served from the `gh-pages` branch, NOT from `main`. There is no CI.
Pushing to `main` only saves source; it does not update the site.

1. Commit and `git push origin main` to save the source.
2. Run `npm run deploy` (runs `vite build`, then `gh-pages -d dist`) to publish.

`npm run deploy` builds from the **working tree**, not from the last commit, so
uncommitted edits and untracked files under `public/` go live too. Check
`git status` first.

After deploying, GitHub Pages takes about a minute, and the server sends
`cache-control: max-age=600`, so a browser may show the old page for up to 10 minutes.
Verify with `curl -s https://owensanborn.github.io/<page>.html | grep <new text>`.

`gh` is not logged in on Owen's machine, so `gh pr create` fails; give the
`.../pull/new/<branch>` link instead.

## Blog posts (reading lists)

- Each post is a standalone static page in `public/` (e.g. `public/books-2026.html`).
  To add a book, add an `<li><strong>Title</strong> by Author</li>` to the list.
  Favorites / least favorite are separate `<h2>` sections at the bottom.
- Posts are listed on the site via `src/data/posts.js` (`slug` matches the filename).

## Tools

Tool pages live in `public/tools/<name>/` and are linked from the cards array in
`src/components/sections/Tools.jsx`.

## Local files to leave alone

The repo root sometimes has untracked FASTQ / sequencing test data
(`*.fastq`, `testing_fastq/`, `FWD read only/`, etc.). Don't commit them.
