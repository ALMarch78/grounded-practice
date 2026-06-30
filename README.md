# The Grounded Practice

An interactive therapy skills training app designed to guide users through evidence-based techniques for emotional regulation and resilience building.

## Overview

**The Grounded Practice** is a self-paced learning app that walks users through three phases of therapeutic skill-building:

- **Phase 1: Stuck** - Understanding patterns and how they develop
- **Phase 2: Transitioning** - Learning and practicing new skills
- **Phase 3: Resourced** - Applying skills to real-life situations

The app includes 18 modules covering topics like grounding techniques, emotion regulation, reframing, self-compassion, and more.

## Features

✓ 18 comprehensive therapeutic modules
✓ 3-phase progression system
✓ Progress tracking with localStorage persistence
✓ Interactive exercises and reflections
✓ Beautiful, responsive design
✓ Therapeutic color scheme

## Getting Started

### Prerequisites
- Node.js 14+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/ALMarch78/grounded-practice.git
cd grounded-practice

# Install dependencies
npm install

# Start the development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Deployment

### Deploy to Vercel (Recommended)

1. **Connect your GitHub repo:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Click "Import"

2. **Configure build settings:**
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Click "Deploy"

3. **Your app is live!** 🎉
   - Vercel will automatically redeploy whenever you push to `main`

### Alternative: Deploy to Other Platforms

**Netlify:**
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=build
```

**GitHub Pages:**
1. Add `"homepage": "https://almarch78.github.io/grounded-practice"` to package.json
2. Run `npm run build` and `npm run deploy`

## Project Structure

```
grounded-practice/
├── public/
│   └── index.html          # HTML entry point
├── src/
│   ├── App.jsx            # Main React component
│   ├── App.css            # Styles
│   ├── index.js           # React root
│   └── index.css          # Global styles
├── package.json
├── vercel.json           # Vercel config
└── README.md
```

## Technologies

- **React 18** - UI framework
- **localStorage** - Client-side data persistence
- **CSS3** - Responsive styling
- **Create React App** - Build tooling

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject configuration (⚠️ one-way operation)
npm run eject
```

## Data & Privacy

All user progress and responses are stored locally in the browser using `localStorage`. No data is sent to external servers.

## License

© 2024 The Grounded Practice. All rights reserved.

## Support

For issues or feature requests, please open an [issue on GitHub](https://github.com/ALMarch78/grounded-practice/issues).
