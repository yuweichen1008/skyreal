#!/bin/bash
# ══════════════════════════════════════════════════════════════════
#  Skyreal — GCP VM One-Command Setup
#  Run this ONCE on a fresh Debian/Ubuntu Compute Engine instance.
#
#  Usage:
#    chmod +x setup-vm.sh && ./setup-vm.sh
#
#  What it does:
#    1. Installs NVM + Node 20 + npm
#    2. Installs PM2 (process manager)
#    3. Installs Nginx (reverse proxy)
#    4. Installs Certbot (free SSL via Let's Encrypt)
#    5. Clones the Skyreal repo into ~/skyreal
#    6. Writes an Nginx config template
#    7. Prompts you to fill in .env.local, then builds + starts the app
# ══════════════════════════════════════════════════════════════════

set -euo pipefail

REPO_URL="${1:-}"           # e.g. https://github.com/your-user/skyreal.git
DOMAIN="${2:-skyreal.org}"  # e.g. skyreal.org

# ── Colors ──────────────────────────────────────────────────────
GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; NC='\033[0m'
info()    { echo -e "${GREEN}[setup]${NC} $*"; }
warn()    { echo -e "${YELLOW}[warn]${NC}  $*"; }
section() { echo -e "\n${GREEN}══ $* ══${NC}"; }

# ── Require repo URL ─────────────────────────────────────────────
if [ -z "$REPO_URL" ]; then
  echo -e "${RED}Usage:${NC} ./setup-vm.sh <repo-url> [domain]"
  echo "  Example: ./setup-vm.sh https://github.com/you/skyreal.git skyreal.org"
  exit 1
fi

# ── 1. System packages ───────────────────────────────────────────
section "System packages"
sudo apt-get update -qq
sudo apt-get install -y -qq git curl wget build-essential

# ── 2. NVM + Node 20 ────────────────────────────────────────────
section "Node.js (via NVM)"
if [ ! -d "$HOME/.nvm" ]; then
  info "Installing NVM..."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
fi

export NVM_DIR="$HOME/.nvm"
# shellcheck source=/dev/null
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

info "Installing Node 20..."
nvm install 20
nvm use 20
nvm alias default 20

node_ver=$(node -v)
info "Node version: $node_ver"

# Persist NVM in .bashrc
if ! grep -q 'NVM_DIR' ~/.bashrc; then
  cat >> ~/.bashrc <<'BASHRC'

# NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
BASHRC
fi

# ── 3. PM2 ──────────────────────────────────────────────────────
section "PM2"
npm install -g pm2 2>/dev/null
info "PM2 version: $(pm2 -v)"

# ── 4. Nginx ────────────────────────────────────────────────────
section "Nginx"
sudo apt-get install -y -qq nginx
sudo systemctl enable nginx
sudo systemctl start nginx
info "Nginx installed and running"

# ── 5. Certbot ──────────────────────────────────────────────────
section "Certbot (Let's Encrypt)"
sudo apt-get install -y -qq certbot python3-certbot-nginx
info "Certbot installed"

# ── 6. Clone repo ───────────────────────────────────────────────
section "Repository"
APP_DIR="$HOME/skyreal"
if [ -d "$APP_DIR" ]; then
  warn "~/skyreal already exists — pulling latest instead"
  git -C "$APP_DIR" pull origin main
else
  info "Cloning $REPO_URL → $APP_DIR"
  git clone "$REPO_URL" "$APP_DIR"
fi

# ── 7. Environment variables ─────────────────────────────────────
section "Environment (.env.local)"
if [ ! -f "$APP_DIR/.env.local" ]; then
  if [ -f "$APP_DIR/.env.local.example" ]; then
    cp "$APP_DIR/.env.local.example" "$APP_DIR/.env.local"
    warn ".env.local created from .env.local.example"
    warn "IMPORTANT: Edit ~/skyreal/.env.local and fill in your Appwrite credentials before continuing."
    echo ""
    read -r -p "Press ENTER once you've filled in .env.local to continue..."
  else
    warn ".env.local.example not found. You must create ~/skyreal/.env.local manually."
    echo "Required variables:"
    echo "  NEXT_PUBLIC_APPWRITE_ENDPOINT"
    echo "  NEXT_PUBLIC_APPWRITE_PROJECT_ID"
    echo "  NEXT_PUBLIC_APPWRITE_DATABASE_ID"
    echo "  NEXT_PUBLIC_APPWRITE_INQUIRIES_COLLECTION_ID"
    echo "  NEXT_PUBLIC_APPWRITE_COURSES_COLLECTION_ID"
    echo "  NEXT_PUBLIC_APPWRITE_SPONSORSHIP_COLLECTION_ID"
    echo ""
    read -r -p "Press ENTER once you've created ~/skyreal/.env.local to continue..."
  fi
else
  info ".env.local already exists — skipping"
fi

# ── 8. Install deps + build ──────────────────────────────────────
section "Install & build"
cd "$APP_DIR"
npm install
npm run build
info "Build complete"

# ── 9. Start app with PM2 ────────────────────────────────────────
section "PM2 — Start app"
pm2 delete skyreal 2>/dev/null || true
pm2 start npm --name "skyreal" -- start
pm2 save

# Auto-start on reboot
PM2_STARTUP=$(pm2 startup systemd -u "$USER" --hp "$HOME" 2>&1 | tail -1)
info "Run this command to enable PM2 on reboot:"
echo ""
echo "  $PM2_STARTUP"
echo ""

# ── 10. Nginx config ─────────────────────────────────────────────
section "Nginx config"
NGINX_CONF="/etc/nginx/sites-available/$DOMAIN"

sudo tee "$NGINX_CONF" > /dev/null <<NGINX
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;

    location / {
        proxy_pass         http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade \$http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host \$host;
        proxy_set_header   X-Real-IP \$remote_addr;
        proxy_set_header   X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
NGINX

# Enable site
sudo ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
info "Nginx configured for $DOMAIN"

# ── 11. SSL ──────────────────────────────────────────────────────
section "SSL — Let's Encrypt"
warn "DNS must already point $DOMAIN → this server's IP before running Certbot."
read -r -p "Is DNS already pointed at this server? [y/N] " dns_ready
if [[ "$dns_ready" =~ ^[Yy]$ ]]; then
  sudo certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos --email "hello@$DOMAIN" --redirect
  info "SSL certificate installed. Auto-renewal is active."
else
  warn "Skipping SSL for now. Once DNS is pointed, run:"
  echo "  sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
fi

# ── Done ─────────────────────────────────────────────────────────
section "Setup complete"
echo ""
echo "  App running: pm2 status"
echo "  View logs:   pm2 logs skyreal"
echo "  Deploy:      ./scripts/deploy.sh $USER@<vm-ip>"
echo ""
info "Visit http://$DOMAIN to confirm the site is live."
