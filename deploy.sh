#!/usr/bin/env bash
# =============================================================
#  MARCOS TORRES · Deploy de un comando
#  Crea el repo en GitHub, sube el sitio y activa GitHub Pages.
#  Uso:  ./deploy.sh
#  Requisitos (una sola vez):  brew install gh  &&  gh auth login
# =============================================================
set -euo pipefail

REPO_NAME="marco-torres-design-web"
BRANCH="main"

cyan(){ printf "\033[36m%s\033[0m\n" "$1"; }
green(){ printf "\033[32m%s\033[0m\n" "$1"; }
red(){ printf "\033[31m%s\033[0m\n" "$1"; }

# --- Verificaciones ---
command -v git >/dev/null || { red "❌ git no está instalado."; exit 1; }
command -v gh  >/dev/null || { red "❌ GitHub CLI (gh) no está instalado. Ejecuta: brew install gh"; exit 1; }
gh auth status >/dev/null 2>&1 || { red "❌ No hay sesión de GitHub. Ejecuta: gh auth login"; exit 1; }

OWNER=$(gh api user --jq .login)
OWNER_LC=$(printf '%s' "$OWNER" | tr '[:upper:]' '[:lower:]')
cyan "👤 Cuenta GitHub: $OWNER"
PAGES_URL="https://${OWNER_LC}.github.io/${REPO_NAME}/"

# --- Git local ---
if [ ! -d .git ]; then
  cyan "📦 Inicializando repositorio…"
  git init -q
  git branch -M "$BRANCH"
fi

# Ajusta la URL del sitio (config.js e index.html) al owner real
for f in js/config.js index.html; do
  [ -f "$f" ] && sed -i '' "s#https://[A-Za-z0-9-]*\.github\.io/${REPO_NAME}/#${PAGES_URL}#g" "$f" 2>/dev/null || true
done

cyan "📝 Commit…"
git add -A
git commit -q -m "Deploy: sitio Marcos Torres" || cyan "  (sin cambios que commitear)"

# --- Repo remoto ---
if gh repo view "$OWNER/$REPO_NAME" >/dev/null 2>&1; then
  cyan "🔗 El repo ya existe, subiendo cambios…"
  git remote get-url origin >/dev/null 2>&1 || git remote add origin "https://github.com/$OWNER/$REPO_NAME.git"
  git push -u origin "$BRANCH"
else
  cyan "🚀 Creando repo y subiendo…"
  gh repo create "$REPO_NAME" --public --source=. --remote=origin --push
fi

# --- Activar GitHub Pages ---
cyan "🌐 Activando GitHub Pages…"
if gh api "repos/$OWNER/$REPO_NAME/pages" >/dev/null 2>&1; then
  cyan "  Pages ya estaba activo."
else
  gh api -X POST "repos/$OWNER/$REPO_NAME/pages" \
    -f "source[branch]=$BRANCH" -f "source[path]=/" >/dev/null 2>&1 \
    && green "  ✅ Pages activado." \
    || cyan "  (Actívalo manualmente en Settings ▸ Pages si falla la primera vez.)"
fi

echo ""
green "════════════════════════════════════════════"
green "  ✅ SITIO PUBLICADO"
green "  🔗 $PAGES_URL"
green "  (la primera vez tarda ~1-2 min en estar en vivo)"
green "════════════════════════════════════════════"
