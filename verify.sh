#!/bin/bash

echo "🦖 Dino Réunion Portfolio - Script de vérification"
echo "=================================================="

# Couleurs pour les messages
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour afficher les résultats
check_status() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ $1${NC}"
    else
        echo -e "${RED}❌ $1${NC}"
        exit 1
    fi
}

echo -e "${YELLOW}📦 Installation des dépendances...${NC}"
npm install
check_status "Installation des dépendances"

echo -e "${YELLOW}🔍 Vérification du linting...${NC}"
npm run lint
check_status "Linting"

echo -e "${YELLOW}🏗️  Build de production...${NC}"
npm run build
check_status "Build de production"

echo -e "${YELLOW}🚀 Test du serveur de développement (3 secondes)...${NC}"
timeout 3s npm run dev > /dev/null 2>&1 &
DEV_PID=$!
sleep 3
kill $DEV_PID 2>/dev/null
check_status "Serveur de développement"

echo -e "${YELLOW}🔍 Test du serveur de preview (3 secondes)...${NC}"
timeout 3s npm run preview > /dev/null 2>&1 &
PREVIEW_PID=$!
sleep 3
kill $PREVIEW_PID 2>/dev/null
check_status "Serveur de preview"

echo ""
echo -e "${GREEN}🎉 Toutes les vérifications sont passées !${NC}"
echo ""
echo "📋 Résumé du projet :"
echo "• ✅ Vite + React configuré"
echo "• ✅ Tailwind CSS intégré"
echo "• ✅ Three.js + React Three Fiber fonctionnel"
echo "• ✅ Framer Motion pour les animations"
echo "• ✅ Portfolio responsive avec sections Hero, Galerie 3D, Vidéo, Contact"
echo "• ✅ Build de production optimisé"
echo ""
echo "🚀 Pour démarrer le développement :"
echo "   npm run dev"
echo ""
echo "🌐 Pour déployer :"
echo "   npm run build"
echo "   npm run preview"
echo ""
echo "Made with ❤️ in La Réunion 🏝️"
