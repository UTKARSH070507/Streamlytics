#!/usr/bin/env bash
set -euo pipefail

commit_message="${1:-chore: update production site}"

# Commit and push changes on main so Vercel auto-deploys.
git add -A

if git diff --cached --quiet; then
  echo "No changes to deploy."
  exit 0
fi

git commit -m "$commit_message"
git push origin main

echo "Pushed to GitHub main. Vercel will auto-deploy this commit."