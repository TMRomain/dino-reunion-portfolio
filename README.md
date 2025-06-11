# 🎨 Emmanuel Latchoumanin — Portfolio 3D

Portfolio professionnel d'Emmanuel Latchoumanin, infographiste 3D spécialisé en animation 3D et synthèse d'image, basé à La Réunion.

## 👨‍🎨 À Propos

Emmanuel Latchoumanin est un infographiste 3D diplômé du Cégep de Matane (Québec) avec une spécialisation en Animation 3D & Synthèse d'image. Fort de son expérience à l'Association Ti Planteur, il excelle dans :

- **Conception de plans 3D de mobilier**
- **Animation d'ateliers éducatifs sur la biodiversité**
- **Sensibilisation environnementale**
- **Création d'univers 3D**

## ✨ Fonctionnalités du Portfolio

- **🎯 Vite + React** : Développement ultra-rapide avec rechargement à chaud
- **🎨 Tailwind CSS + Design System** : Interface moderne et responsive
- **🌟 Three.js + React Three Fiber** : Scènes 3D interactives
- **⚡ Framer Motion** : Animations fluides et transitions élégantes
- **📱 Design Responsive** : Parfaitement adapté à tous les écrans
- **📬 Formulaire de Contact** : Interface pour les demandes de projets

## 🎨 Palette de Couleurs

- **Orange Volcanique** : Inspiré par le Piton de la Fournaise (`#ef8d38`)
- **Vert Forêt** : Évoque les forêts tropicales réunionnaises (`#2f9960`)
- **Dégradés Sombres** : Ambiance moderne et professionnelle

## 🚀 Installation et Utilisation

### Prérequis

- Node.js 18+
- npm ou yarn

### Installation

```bash
# Cloner le projet
git clone [url-du-repo]
cd dino-reunion-portfolio

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

### Scripts Disponibles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Prévisualisation du build
npm run preview

# Linting
npm run lint
```

## 📁 Structure du Projet

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation avec vraies informations
│   ├── Hero.jsx             # Section d'accueil personnalisée
│   ├── About.jsx            # CV et parcours d'Emmanuel
│   ├── Gallery3D.jsx        # Galerie des réalisations 3D
│   ├── VideoSection.jsx     # Présentation des projets vidéo
│   ├── Contact.jsx          # Formulaire avec vraies coordonnées
│   └── Footer.jsx           # Pied de page personnalisé
├── data/
│   └── portfolio.json       # Données personnelles d'Emmanuel
├── App.jsx                  # Composant principal
├── main.jsx                 # Point d'entrée
└── index.css               # Styles Tailwind + custom
```

## 📋 Informations Personnelles

- **Nom** : Emmanuel Latchoumanin
- **Titre** : Infographiste 3D
- **Spécialité** : Animation 3D & Synthèse d'image
- **Localisation** : Saint-Louis, La Réunion
- **Formation** : Cégep de Matane (2018-2022)
- **Contact** : latchoumanin.emmanuel450@gmail.com

## 🛠️ Compétences Techniques

### Logiciels 3D

- **Blender** - Modélisation et animation
- **Krita** - Création graphique
- **Photoshop** - Retouche et composition

### Compétences Transversales

- Compréhension client
- Traduction d'idées en concepts visuels
- Collaboration et communication
- Pédagogie (animations éducatives)

## 🎯 Réalisations Principales

### Association Ti Planteur (2022-2023)

- Conception de plans 3D de mobilier
- Animation de séances éducatives dans les écoles
- Sensibilisation à la biodiversité réunionnaise
- Promotion de la plantation locale

## 🌐 Déploiement

### Vercel (Recommandé)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Glissez le dossier `dist` sur Netlify
```

### GitHub Pages

```bash
npm install --save-dev gh-pages
npm run build
npx gh-pages -d dist
```

## 🛠️ Technologies Utilisées

- **Frontend** : React 18, Vite
- **3D** : Three.js, React Three Fiber, Drei
- **Styling** : Tailwind CSS
- **Animations** : Framer Motion
- **Icons** : Lucide React
- **Développement** : ESLint, Hot Reload

## 📝 Personnalisation

Les données personnelles sont centralisées dans `src/data/portfolio.json` pour faciliter les mises à jour :

```json
{
  "personal": {
    "name": "Emmanuel Latchoumanin",
    "title": "Infographiste 3D",
    "email": "latchoumanin.emmanuel450@gmail.com"
    // ... autres informations
  }
}
```

## 🤝 Contact

Pour des collaborations ou des projets :

- **Email** : [latchoumanin.emmanuel450@gmail.com](mailto:latchoumanin.emmanuel450@gmail.com)
- **Téléphone** : +262 693 648 563
- **Localisation** : Saint-Louis, La Réunion

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🏝️ Made in La Réunion

Portfolio créé avec passion depuis l'île de La Réunion, mettant en valeur les talents locaux en infographie 3D et animation.

---

Fait avec ❤️ à La Réunion par Emmanuel Latchoumanin
