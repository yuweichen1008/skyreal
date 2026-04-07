#!/bin/bash
# ══════════════════════════════════════════════════════════════════
#  Skyreal — Add a new language in one command
#
#  Usage:
#    ./scripts/add-locale.sh <locale-code> "<Display Name>" "<Short>"
#
#  Examples:
#    ./scripts/add-locale.sh ko "한국어" "한국어"
#    ./scripts/add-locale.sh fr "Français" "FR"
#    ./scripts/add-locale.sh es "Español" "ES"
#
#  What it does:
#    1. Copies messages/en.json → messages/<locale>.json
#    2. Adds the locale to src/i18n/routing.ts
#    3. Adds the locale label to src/components/Navbar.tsx
#    4. Prints next steps
# ══════════════════════════════════════════════════════════════════

set -euo pipefail

LOCALE="${1:-}"
DISPLAY_NAME="${2:-}"
SHORT="${3:-}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; NC='\033[0m'
info() { echo -e "${GREEN}[add-locale]${NC} $*"; }
warn() { echo -e "${YELLOW}[warn]${NC}  $*"; }
err()  { echo -e "${RED}[error]${NC} $*"; exit 1; }

# ── Validate args ────────────────────────────────────────────────
if [ -z "$LOCALE" ]; then
  echo -e "${RED}Usage:${NC} ./scripts/add-locale.sh <locale-code> \"<Display Name>\" \"<Short>\""
  echo ""
  echo "  Examples:"
  echo "    ./scripts/add-locale.sh ko \"한국어\" \"한국어\""
  echo "    ./scripts/add-locale.sh fr \"Français\" \"FR\""
  exit 1
fi

DISPLAY_NAME="${DISPLAY_NAME:-$LOCALE}"
SHORT="${SHORT:-${LOCALE^^}}"

MSG_FILE="$ROOT/messages/${LOCALE}.json"
ROUTING_FILE="$ROOT/src/i18n/routing.ts"
NAVBAR_FILE="$ROOT/src/components/Navbar.tsx"

# ── 1. Create message file ───────────────────────────────────────
if [ -f "$MSG_FILE" ]; then
  warn "messages/${LOCALE}.json already exists — skipping copy."
else
  cp "$ROOT/messages/en.json" "$MSG_FILE"
  # Prepend a comment block (as a JSON-compatible note via a _note field)
  # Actually just add a visible warning at the top via a _TRANSLATE key
  python3 - <<PYEOF
import json, sys
with open("$MSG_FILE") as f:
    data = json.load(f)
data["_TRANSLATE"] = "UNTRANSLATED — Replace all English strings with $LOCALE ($DISPLAY_NAME)"
# Move _TRANSLATE to top
ordered = {"_TRANSLATE": data.pop("_TRANSLATE"), **data}
with open("$MSG_FILE", "w") as f:
    json.dump(ordered, f, ensure_ascii=False, indent=2)
    f.write("\n")
PYEOF
  info "Created messages/${LOCALE}.json (copy of en.json — needs translation)"
fi

# ── 2. Add locale to routing.ts ──────────────────────────────────
if grep -q "\"${LOCALE}\"" "$ROUTING_FILE"; then
  warn "${LOCALE} already exists in routing.ts — skipping."
else
  # Insert locale into the locales array: ["en", "zh-TW", "ja"] → add new entry
  sed -i.bak "s/locales: \[/locales: [\"${LOCALE}\", /" "$ROUTING_FILE"
  # Clean up backup
  rm -f "${ROUTING_FILE}.bak"
  info "Added \"${LOCALE}\" to src/i18n/routing.ts"
fi

# ── 3. Add locale label to Navbar.tsx ────────────────────────────
if grep -q "\"${LOCALE}\"" "$NAVBAR_FILE"; then
  warn "${LOCALE} already exists in Navbar.tsx LOCALE_LABELS — skipping."
else
  # Insert after the last locale entry (before the closing brace of LOCALE_LABELS)
  # Find the line with the last locale entry and add after it
  sed -i.bak "/LOCALE_LABELS.*Record/,/^};/{
    /^};/i\\  '${LOCALE}': { short: '${SHORT}', label: '${DISPLAY_NAME}' },
  }" "$NAVBAR_FILE"
  rm -f "${NAVBAR_FILE}.bak"
  info "Added ${LOCALE} to Navbar LOCALE_LABELS"
fi

# ── 4. Also add to CommandPalette commands ────────────────────────
PALETTE_FILE="$ROOT/src/components/CommandPalette.tsx"
CMD_ID="lang-${LOCALE}"
if grep -q "\"${CMD_ID}\"" "$PALETTE_FILE"; then
  warn "${CMD_ID} already exists in CommandPalette.tsx — skipping."
else
  # Add after the last lang-* command line
  sed -i.bak "/lang-ja/a\\  { id: '${CMD_ID}', icon: '🌐', labelKey: 'switch${LOCALE^}', group: 'language', action: { type: 'locale', locale: '${LOCALE}' }, keywords: ['${LOCALE}', '${DISPLAY_NAME,,}', 'language'] }," "$PALETTE_FILE"
  rm -f "${PALETTE_FILE}.bak"
  info "Added ${CMD_ID} to CommandPalette commands"
fi

# ── 5. Add to message files palette.commands ─────────────────────
SWITCH_KEY="switch${LOCALE^}"
for LANG_FILE in "$ROOT/messages"/*.json; do
  if python3 -c "
import json, sys
with open('$LANG_FILE') as f:
    data = json.load(f)
palette = data.get('palette', {})
commands = palette.get('commands', {})
if '${SWITCH_KEY}' not in commands:
    commands['${SWITCH_KEY}'] = 'Switch to ${DISPLAY_NAME}'
    palette['commands'] = commands
    data['palette'] = palette
    with open('$LANG_FILE', 'w') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write('\n')
    print('updated')
else:
    print('exists')
" 2>/dev/null | grep -q updated; then
    info "Added palette.commands.${SWITCH_KEY} to $(basename "$LANG_FILE")"
  fi
done

# ── Done ─────────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}✓ Locale '${LOCALE}' scaffolded!${NC}"
echo ""
echo "  Next steps:"
echo "  1. Translate messages/${LOCALE}.json (replace English strings)"
echo "  2. Remove the _TRANSLATE field from messages/${LOCALE}.json when done"
echo "  3. yarn build  (or: npm run build)"
echo "  4. Deploy: ./scripts/deploy.sh user@<vm-ip>"
echo ""
echo "  URLs:"
echo "  - English (default): https://skyreal.org/"
echo "  - ${DISPLAY_NAME}:   https://skyreal.org/${LOCALE}/"
