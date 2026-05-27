#!/usr/bin/env bash
#
# publish.sh — re-publish the public-safe subset of this talk to the
# public GitHub repo that serves the deck via GitHub Pages:
#
#   https://github.com/makzimi/kmp-without-rewriting-the-app
#   → https://makzimi.github.io/kmp-without-rewriting-the-app/
#
# Published: the deck, the talk script, asset checklist, reference theme,
# CLAUDE.md, docs/, refs/, and this script.
# NOT published: code-examples/ (real Dodo source) and iOS-ARCHITECTURE.md
# (internal module names). The working repo keeps both on disk.
#
# Usage:
#   ./publish.sh ["commit message"]
#
# Optional env:
#   PUBLIC_DIR   local checkout of the public repo (default: ../kmp-talk-public)
#
set -euo pipefail

SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PUBLIC_REMOTE="git@github.com:makzimi/kmp-without-rewriting-the-app.git"
PUBLIC_DIR="${PUBLIC_DIR:-$SRC/../kmp-talk-public}"
MSG="${1:-Update published slides}"

# Ensure we have a local checkout of the public repo, up to date.
if [ ! -d "$PUBLIC_DIR/.git" ]; then
  echo "→ cloning public repo into $PUBLIC_DIR"
  git clone "$PUBLIC_REMOTE" "$PUBLIC_DIR"
fi
git -C "$PUBLIC_DIR" pull --ff-only

RSYNC=(rsync -a --delete --exclude='.DS_Store')

# Deck (the deployed site) + reference theme + planning/scratch dirs —
# --delete drops files removed from the source.
"${RSYNC[@]}" "$SRC/presentation/" "$PUBLIC_DIR/presentation/"
"${RSYNC[@]}" "$SRC/dodo-theme/"   "$PUBLIC_DIR/dodo-theme/"
"${RSYNC[@]}" "$SRC/docs/"         "$PUBLIC_DIR/docs/"
"${RSYNC[@]}" "$SRC/refs/"         "$PUBLIC_DIR/refs/"

# Top-level docs + this script, published as-is.
cp "$SRC/PRESENTATION_PLAN.md" "$PUBLIC_DIR/"
cp "$SRC/ASSETS.md"            "$PUBLIC_DIR/"
cp "$SRC/CLAUDE.md"            "$PUBLIC_DIR/"
cp "$SRC/publish.sh"           "$PUBLIC_DIR/"

# Never publish this — scrub if an older run included it.
rm -f "$PUBLIC_DIR/iOS-ARCHITECTURE.md"

# Commit & push (no-op if nothing changed).
cd "$PUBLIC_DIR"
git add -A
if git diff --cached --quiet; then
  echo "✓ Public repo already up to date — nothing to publish."
  exit 0
fi
git commit -m "$MSG"
git push origin main
echo "✓ Published. Live: https://makzimi.github.io/kmp-without-rewriting-the-app/"
echo "  Pages will redeploy automatically (see Actions tab)."
