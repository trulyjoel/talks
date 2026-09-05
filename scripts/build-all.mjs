import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const talksDir = 'talks'
const distDir = 'dist'
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]
  ?? JSON.parse(readFileSync('package.json', 'utf8')).name

rmSync(distDir, { recursive: true, force: true })
mkdirSync(distDir, { recursive: true })

const slugs = readdirSync(talksDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && existsSync(join(talksDir, entry.name, 'slides.md')))
  .map((entry) => entry.name)
  .sort()

if (slugs.length === 0) {
  throw new Error(`No talks found under ${talksDir}/*/slides.md`)
}

for (const slug of slugs) {
  const entry = join(talksDir, slug, 'slides.md')
  const out = resolve(distDir, slug)
  const base = `/${repoName}/${slug}/`
  console.log(`Building ${entry} -> dist/${slug} (base ${base})`)
  execFileSync('pnpm', ['exec', 'slidev', 'build', entry, '--out', out, '--base', base], {
    stdio: 'inherit',
  })
}

const links = slugs.map((slug) => `<li><a href="./${slug}/">${slug}</a></li>`).join('\n')
writeFileSync(
  join(distDir, 'index.html'),
  `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>Talks</title></head>
<body>
<h1>Talks</h1>
<ul>
${links}
</ul>
</body>
</html>
`,
)
