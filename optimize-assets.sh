#!/bin/bash

# Script d'optimisation des modèles 3D pour le web
echo "🚀 Optimisation des modèles 3D pour le web..."

# Vérifier si gltf-pipeline est installé
if ! command -v gltf-pipeline &> /dev/null; then
    echo "📦 Installation de gltf-pipeline..."
    npm install -g gltf-pipeline
fi

# Dossier source et destination
SOURCE_DIR="public/assets/new_assets"
OPTIMIZED_DIR="public/assets/optimized"

# Créer le dossier de destination s'il n'existe pas
mkdir -p "$OPTIMIZED_DIR"

echo "📁 Optimisation des fichiers GLB..."

# Optimiser DINO.glb
echo "🦕 Optimisation de DINO.glb..."
gltf-pipeline -i "$SOURCE_DIR/DINO.glb" -o "$OPTIMIZED_DIR/DINO_optimized.glb" --draco.compressionLevel=10 --draco.quantizePositionBits=14 --draco.quantizeTexcoordBits=12 --draco.quantizeColorBits=10

# Optimiser MAXIMUS_SCULPT.glb
echo "🗿 Optimisation de MAXIMUS_SCULPT.glb..."
gltf-pipeline -i "$SOURCE_DIR/MAXIMUS_SCULPT.glb" -o "$OPTIMIZED_DIR/MAXIMUS_SCULPT_optimized.glb" --draco.compressionLevel=10 --draco.quantizePositionBits=14 --draco.quantizeTexcoordBits=12 --draco.quantizeColorBits=10

# Optimiser chevala5.glb
echo "🐎 Optimisation de chevala5.glb..."
gltf-pipeline -i "$SOURCE_DIR/chevala5.glb" -o "$OPTIMIZED_DIR/chevala5_optimized.glb" --draco.compressionLevel=10 --draco.quantizePositionBits=14 --draco.quantizeTexcoordBits=12 --draco.quantizeColorBits=10

echo "🎨 Optimisation des images..."

# Optimiser les images PNG avec ImageMagick (si disponible)
if command -v convert &> /dev/null; then
    echo "🖼️  Optimisation des images PNG..."
    
    # Optimiser cheval.png
    convert "$SOURCE_DIR/cheval.png" -quality 85 -strip "$OPTIMIZED_DIR/cheval_optimized.webp"
    
    # Optimiser cheval1.png
    convert "$SOURCE_DIR/cheval1.png" -quality 85 -strip "$OPTIMIZED_DIR/cheval1_optimized.webp"
    
    # Optimiser PhotoEmanuel.jpeg
    convert "$SOURCE_DIR/PhotoEmanuel.jpeg" -quality 85 -strip -resize 800x800> "$OPTIMIZED_DIR/PhotoEmanuel_optimized.webp"
    
    # Optimiser la certification
    convert "$SOURCE_DIR/Certification SonyPicture Animation.jpeg" -quality 85 -strip -resize 1200x800> "$OPTIMIZED_DIR/Certification_SonyPicture_Animation_optimized.webp"
    
    echo "✅ Images optimisées et converties en WebP"
else
    echo "⚠️  ImageMagick non disponible, copie des images originales..."
    cp "$SOURCE_DIR/cheval.png" "$OPTIMIZED_DIR/"
    cp "$SOURCE_DIR/cheval1.png" "$OPTIMIZED_DIR/"
    cp "$SOURCE_DIR/PhotoEmanuel.jpeg" "$OPTIMIZED_DIR/"
    cp "$SOURCE_DIR/Certification SonyPicture Animation.jpeg" "$OPTIMIZED_DIR/"
fi

# Afficher les tailles des fichiers
echo "📊 Comparaison des tailles:"
echo "--- Modèles 3D ---"
for file in DINO.glb MAXIMUS_SCULPT.glb chevala5.glb; do
    if [ -f "$SOURCE_DIR/$file" ] && [ -f "$OPTIMIZED_DIR/${file%.*}_optimized.glb" ]; then
        original_size=$(stat --format="%s" "$SOURCE_DIR/$file")
        optimized_size=$(stat --format="%s" "$OPTIMIZED_DIR/${file%.*}_optimized.glb")
        reduction=$(( (original_size - optimized_size) * 100 / original_size ))
        echo "$file: $(( original_size / 1024 ))KB → $(( optimized_size / 1024 ))KB (-$reduction%)"
    fi
done

echo "--- Images ---"
for file in "cheval.png" "cheval1.png" "PhotoEmanuel.jpeg"; do
    if [ -f "$SOURCE_DIR/$file" ]; then
        original_size=$(stat --format="%s" "$SOURCE_DIR/$file")
        echo "$file: $(( original_size / 1024 ))KB"
    fi
done

echo "✨ Optimisation terminée !"
echo "📝 Les fichiers optimisés sont dans: $OPTIMIZED_DIR"
echo "💡 Pensez à mettre à jour les chemins dans votre code pour utiliser les versions optimisées."
