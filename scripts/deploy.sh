#!/bin/bash
# ──────────────────────────────────────────────────────────────
# Skyreal deployment script — pushes latest code to GCP VM
# Usage: ./scripts/deploy.sh [user@host]
#
# Prerequisites on the VM:
#   - Node 20 via nvm, PM2, Nginx, Certbot installed
#   - Repo cloned to ~/skyreal
#   - .env.local populated with Appwrite vars
#   - PM2 process named "skyreal" already started once
# ──────────────────────────────────────────────────────────────

set -euo pipefail

TARGET="${1:-}"

if [ -z "$TARGET" ]; then
  echo "Usage: ./scripts/deploy.sh user@<vm-ip>"
  echo "Example: ./scripts/deploy.sh sami@34.123.45.67"
  exit 1
fi

echo "→ Deploying to $TARGET ..."
ssh "$TARGET" bash <<'REMOTE'
  set -euo pipefail
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

  cd ~/skyreal
  echo "  pulling latest code..."
  git pull origin main

  echo "  installing dependencies..."
  npm install --production=false

  echo "  building..."
  npm run build

  echo "  restarting PM2..."
  pm2 restart skyreal || pm2 start npm --name "skyreal" -- start
  pm2 save
REMOTE

echo "✓ Deployed successfully."
