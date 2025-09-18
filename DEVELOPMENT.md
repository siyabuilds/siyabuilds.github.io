# Portfolio Development Guide

## Overview
This portfolio has been modernized with Vite build system, SCSS with modern @use syntax, and modular architecture for better development experience and maintainability. The design follows GitHub's color scheme and modern web standards.

## Development Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Development Commands

#### Start Development Server
```bash
npm run dev
# or
npm start
```
Opens development server at `http://localhost:5550` with hot module reloading.

#### Build for Production
```bash
npm run build
```
Creates optimized production build in `dist/` directory.

#### Preview Production Build
```bash
npm run preview
```
Serves the production build locally for testing.

#### Clean Build Directory
```bash
npm run clean
```
Removes the `dist/` directory.

## Project Structure

```
├── src/
│   ├── js/                    # Modular JavaScript files
│   │   ├── contact.js         # Contact form functionality
│   │   ├── github-activity.js # GitHub API integration
│   │   ├── navigation.js      # Navigation and sidebar
│   │   ├── projects.js        # Projects display and filtering
│   │   ├── theme.js          # Dark/light theme toggle
│   │   └── utils.js          # Utility functions
│   ├── scss/                  # Modular SCSS files
│   │   ├── base/             # Base styles and variables
│   │   ├── components/       # Component-specific styles
│   │   └── layout/           # Layout styles
│   └── main.js               # Main entry point
├── public/                   # Static assets
│   ├── documents/           # CV and documents
│   ├── *.png               # Images and logos
│   └── projects.json       # Projects data
├── .github/
│   └── workflows/           # GitHub Actions for deployment
├── dist/                    # Production build output
├── index.html              # Main HTML file
├── vite.config.js          # Vite configuration
└── package.json           # Dependencies and scripts
```

## Key Features

### Modular Architecture
- **JavaScript**: Split into feature-specific modules for better maintainability
- **SCSS**: Organized into base, components, and layout directories with modern @use syntax
- **CSS Custom Properties**: GitHub-inspired color scheme with consistent theming

### Modern Build System
- **Vite**: Fast development server with hot module reloading
- **ES Modules**: Modern JavaScript module system
- **SCSS**: Enhanced CSS with variables, nesting, and mixins using modern @use syntax
- **Local Dependencies**: FontAwesome and SweetAlert2 bundled locally

### GitHub Integration
- **Real-time Activity**: Dynamic repository showcase with commit history
- **Repository Stats**: Language statistics, star counts, and update timestamps
- **Modern UI**: Card-based layout with GitHub-inspired design

### Enhanced Animations
- Smooth transitions using CSS custom properties
- GitHub-style hover effects and transforms
- Better loading animations and spinners

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Optimized for all screen sizes

### Automated Deployment
- **GitHub Actions**: Automatic builds on push to main/master
- **GitHub Pages**: Seamless deployment to GitHub Pages
- **Build Optimization**: Minified CSS/JS and asset optimization

## Development Workflow

1. **Start Development**: `npm run dev`
2. **Make Changes**: Edit files in `src/` directory
3. **View Changes**: Browser automatically reloads with changes
4. **Build for Production**: `npm run build`
5. **Test Production**: `npm run preview`

## Adding New Features

### Adding a New Component
1. Create component SCSS file in `src/scss/components/`
2. Create component JS file in `src/js/` (if needed)
3. Import styles in `src/scss/main.scss`
4. Import functionality in `src/main.js`

### Updating Styles
- Modify CSS custom properties in `src/scss/base/_variables.scss`
- Edit component styles in respective `src/scss/components/` files
- Changes are automatically reflected during development

### Adding New Projects
- Edit `public/projects.json` to add new project entries
- Images should be placed in `public/` directory
- Projects are automatically filtered and displayed

### Updating GitHub Information
- The GitHub integration automatically fetches data from the `siyabuilds` account
- Repository information, commit history, and stats are updated in real-time
- No manual configuration needed for new repositories

## Deployment

### Automated Deployment
The portfolio uses GitHub Actions for automated deployment:

1. **Trigger**: Pushes to `main` or `master` branch automatically trigger deployment
2. **Build Process**: 
   - Installs Node.js and dependencies
   - Runs `npm run build` to create production assets
   - Optimizes and minifies all assets
3. **Deploy**: Automatically deploys to GitHub Pages
4. **Access**: Live site available at `https://siyabuilds.github.io`

### Manual Deployment
If needed, you can deploy manually:

```bash
# Build the project
npm run build

# The dist/ directory contains all deployment files
# Upload contents to your hosting provider
```

### GitHub Pages Configuration
The repository should have GitHub Pages enabled:
- Source: GitHub Actions
- Custom domain (optional): Configure in repository settings

## Build Optimization

The production build includes:
- CSS and JavaScript minification
- Asset optimization and compression
- FontAwesome fonts bundled locally
- Modern SCSS compilation with @use syntax
- Gzip compression analysis
- Source maps for debugging

## Browser Support
- Modern browsers with ES6+ support
- Chrome, Firefox, Safari, Edge
- Mobile browsers on iOS and Android

## Performance
- Optimized bundle sizes (CSS: ~35KB gzipped, JS: ~23KB gzipped)
- Local fonts and dependencies for faster loading
- Efficient code splitting and tree shaking
- GitHub-inspired color scheme for better accessibility