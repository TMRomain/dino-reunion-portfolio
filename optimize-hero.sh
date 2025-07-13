#!/bin/bash

# Script d'optimisation spécifique pour le modèle DINO du Hero
echo "🦕 Optimisation du modèle DINO pour le Hero..."

# Vérifier si gltf-pipeline est installé
if ! command -v gltf-pipeline &> /dev/null; then
    echo "📦 Installation de gltf-pipeline..."
    npm install -g gltf-pipeline
fi

# Dossiers
SOURCE_DIR="public/assets/new_assets"
HERO_DIR="public/assets/hero"

# Créer le dossier hero s'il n'existe pas
mkdir -p "$HERO_DIR"

echo "🎯 Optimisation spéciale pour le Hero..."

# Optimiser DINO.glb avec paramètres agressifs pour le Hero
echo "🦕 Compression maximale de DINO.glb pour le Hero..."
gltf-pipeline -i "$SOURCE_DIR/DINO.glb" -o "$HERO_DIR/DINO_hero.glb" \
  --draco.compressionLevel=10 \
  --draco.quantizePositionBits=12 \
  --draco.quantizeTexcoordBits=10 \
  --draco.quantizeColorBits=8 \
  --draco.quantizeNormalBits=8 \
  --draco.quantizeGenericBits=8

# Créer une version encore plus légère pour mobile
echo "📱 Création d'une version mobile ultra-légère..."
gltf-pipeline -i "$SOURCE_DIR/DINO.glb" -o "$HERO_DIR/DINO_mobile.glb" \
  --draco.compressionLevel=10 \
  --draco.quantizePositionBits=10 \
  --draco.quantizeTexcoordBits=8 \
  --draco.quantizeColorBits=6 \
  --draco.quantizeNormalBits=6 \
  --draco.quantizeGenericBits=6

# Afficher les tailles
echo "📊 Comparaison des tailles pour le Hero:"
if [ -f "$SOURCE_DIR/DINO.glb" ]; then
    original_size=$(stat --format="%s" "$SOURCE_DIR/DINO.glb")
    echo "DINO original: $(( original_size / 1024 ))KB"
fi

if [ -f "$HERO_DIR/DINO_hero.glb" ]; then
    hero_size=$(stat --format="%s" "$HERO_DIR/DINO_hero.glb")
    reduction_hero=$(( (original_size - hero_size) * 100 / original_size ))
    echo "DINO Hero: $(( hero_size / 1024 ))KB (-$reduction_hero%)"
fi

if [ -f "$HERO_DIR/DINO_mobile.glb" ]; then
    mobile_size=$(stat --format="%s" "$HERO_DIR/DINO_mobile.glb")
    reduction_mobile=$(( (original_size - mobile_size) * 100 / original_size ))
    echo "DINO Mobile: $(( mobile_size / 1024 ))KB (-$reduction_mobile%)"
fi

echo "✨ Optimisation Hero terminée !"
echo "📁 Fichiers Hero dans: $HERO_DIR"
echo "💡 Mise à jour des chemins nécessaire dans InteractiveDinoModel.jsx"
