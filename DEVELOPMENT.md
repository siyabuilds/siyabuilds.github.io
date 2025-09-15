# Portfolio Development Guide

## Overview
This portfolio has been modernized with Vite build system and modular architecture for better development experience and maintainability.

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
├── dist/                    # Production build output
├── index.html              # Main HTML file
├── vite.config.js          # Vite configuration
└── package.json           # Dependencies and scripts
```

## Key Features

### Modular Architecture
- **JavaScript**: Split into feature-specific modules for better maintainability
- **SCSS**: Organized into base, components, and layout directories
- **CSS Custom Properties**: Consistent theming and easy customization

### Modern Build System
- **Vite**: Fast development server with hot module reloading
- **ES Modules**: Modern JavaScript module system
- **SCSS**: Enhanced CSS with variables, nesting, and mixins
- **Local Dependencies**: FontAwesome and SweetAlert2 bundled locally

### Enhanced Animations
- Smooth transitions using CSS custom properties
- Improved hover effects and transforms
- Better loading animations and spinners

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Optimized for all screen sizes

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

## Build Optimization

The production build includes:
- CSS and JavaScript minification
- Asset optimization and compression
- FontAwesome fonts bundled locally
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