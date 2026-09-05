# talks

Public talks, built with [Slidev](https://sli.dev).

Each talk lives in its own dated folder under `talks/`:

```
talks/
  2026-09-04-example-talk/
    slides.md
```

## Setup

```sh
pnpm install
prek install
```

## Working on a talk

```sh
pnpm dev talks/2026-09-04-example-talk/slides.md
```

Opens the Slidev dev server for that deck. Edit `slides.md` in place; add
images or other assets alongside it.

To start a new talk, copy an existing folder:

```sh
cp -r talks/2026-09-04-example-talk talks/YYYY-MM-DD-your-talk-slug
```

## Exporting to PDF

```sh
pnpm export talks/2026-09-04-example-talk/slides.md
```

## Building and deploying

`pnpm build` builds every talk under `talks/` into `dist/<slug>/` with an
`index.html` linking to all of them. Pushing to `main` runs this in CI and
publishes `dist/` to GitHub Pages automatically.
