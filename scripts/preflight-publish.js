#!/usr/bin/env node
/**
 * Preflight guard for `adalo publish` / `adalo deploy`.
 *
 * The Adalo CLI packs the component tarball with:
 *   archive.glob('**', { dot: true, ignore: ['node_modules/**', 'dist/**', ...] })
 *
 * That ignore excludes the *contents* of node_modules but NOT a `node_modules`
 * *symlink* itself — the literal path `node_modules` does not match the glob
 * `node_modules/**`. So when you publish from a git worktree whose node_modules
 * is symlinked to a sibling checkout, the symlink gets packed into the tarball.
 * On the build server `yarn add` then dies with:
 *
 *   EEXIST: file already exists, mkdir '.../dynamic-calendar/node_modules'
 *
 * That is exactly what shipped in dynamic-calendar@1.3.25 and broke iOS/Android
 * builds. A *real* node_modules directory packs cleanly (its contents are
 * ignored), so this guard makes node_modules real before the CLI packs it.
 */
const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')

const nmPath = path.join(process.cwd(), 'node_modules')

let stat
try {
  stat = fs.lstatSync(nmPath)
} catch {
  console.error(
    '\n  node_modules is missing — run `yarn install` before publishing.\n'
  )
  process.exit(1)
}

if (!stat.isSymbolicLink()) {
  // Real directory: the CLI's `node_modules/**` ignore works correctly.
  process.exit(0)
}

const target = fs.readlinkSync(nmPath)
console.warn(
  `\n  ⚠  node_modules is a symlink (-> ${target}).\n` +
    '     The Adalo packer would ship this symlink inside the tarball and break\n' +
    '     app builds (EEXIST). Replacing it with a real install before publishing…\n'
)

fs.unlinkSync(nmPath)

try {
  execFileSync('yarn', ['install', '--frozen-lockfile', '--ignore-engines'], {
    stdio: 'inherit',
  })
} catch {
  // Restore the symlink so we don't leave the worktree worse than we found it.
  try {
    fs.symlinkSync(target, nmPath)
  } catch {
    /* best effort — leave whatever state the failed install produced */
  }
  console.error('\n  Failed to materialize node_modules; aborting publish.\n')
  process.exit(1)
}
