#!/usr/bin/env node

import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Assets à copier depuis public/ vers dist/ (les GLB sont maintenant gérés par Vite)
const assetsToCopy = [
  // Les modèles GLB sont maintenant importés comme assets Vite
  // Pas besoin de les copier manuellement
];

console.log('🔧 Post-build: Copie des assets manquants...');

assetsToCopy.forEach(({ src, dest }) => {
  const srcPath = join(projectRoot, src);
  const destPath = join(projectRoot, dest);
  
  // Créer le dossier de destination s'il n'existe pas
  const destDir = dirname(destPath);
  if (!existsSync(destDir)) {
    mkdirSync(destDir, { recursive: true });
  }
  
  // Copier le fichier s'il existe
  if (existsSync(srcPath)) {
    copyFileSync(srcPath, destPath);
    console.log(`✅ Copié: ${src} -> ${dest}`);
  } else {
    console.warn(`⚠️  Fichier non trouvé: ${src}`);
  }
});

console.log('✨ Post-build terminé !');
