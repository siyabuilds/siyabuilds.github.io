# SiyaBuilds Portfolio

Welcome to my portfolio website! 🚀 This project showcases my skills and projects in web development with a modern and dynamic user experience. The site is responsive and features interactive elements to enhance user engagement.

## 🛠 Features
- **Modern Build System**: Built with Vite for lightning-fast development and optimized production builds
- **SCSS Architecture**: Modular SCSS with modern @use syntax for better maintainability
- **Dynamic GitHub Integration**: Real-time repository showcase with commit activity and statistics
- **Dark Mode Toggle**: Seamless light/dark mode switching with GitHub-inspired color scheme
- **Dynamic Project Management**: Projects are stored and displayed dynamically using JSON with filtering capabilities
- **Interactive Popups**: Custom SweetAlert2 alerts for enhanced user interactions
- **Live Contact Form**: Functional contact form via Formspree integration
- **Modern UI Design**: GitHub-inspired design with clean aesthetics and smooth animations
- **FontAwesome Integration**: Professional icons throughout the interface

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Local Development

1. **Clone the repository:**

   ```bash
   git clone https://github.com/siyabuilds/siyabuilds.github.io.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd siyabuilds.github.io
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   # or
   npm start
   ```

5. **Open your browser and visit:**

   ```
   http://localhost:5550
   ```

### Production Build

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🏗 Tech Stack

- **Build Tool**: [Vite](https://vitejs.dev/) - Next generation frontend tooling
- **CSS Preprocessor**: [SCSS](https://sass-lang.com/) with modern @use syntax
- **JavaScript**: ES6+ modules with modern browser support
- **Icons**: [FontAwesome](https://fontawesome.com/) for professional iconography
- **Alerts**: [SweetAlert2](https://sweetalert2.github.io/) for beautiful popups
- **Deployment**: GitHub Actions with GitHub Pages

## 📁 Project Structure

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
│   ├── projects.json        # Project data
│   └── *.png               # Images and logos
├── .github/
│   └── workflows/           # GitHub Actions workflows
├── dist/                    # Production build output
├── index.html              # Main HTML file
├── vite.config.js          # Vite configuration
└── package.json           # Dependencies and scripts
```

## 🌐 Live Version

Visit the live portfolio at: [https://siyabuilds.github.io](https://siyabuilds.github.io)

## 🔧 Development

### Adding New Projects
Edit `public/projects.json` to add new project entries. The structure includes:
- Title and description
- Technologies used
- Live demo and repository links
- Project images

### Customizing Styles
- Modify CSS custom properties in `src/scss/base/_variables.scss`
- Edit component styles in respective `src/scss/components/` files
- Changes are automatically reflected during development with hot reloading

### GitHub Integration
The portfolio automatically fetches and displays:
- Repository information
- Recent commit activity
- Programming language statistics
- Repository descriptions and links

## 🚀 Deployment

This portfolio uses GitHub Actions for automated deployment:

1. **Automatic Builds**: Every push to main/master triggers a build
2. **GitHub Pages**: Automatically deploys to GitHub Pages
3. **Vite Optimization**: Production builds are optimized and minified

## 📧 Contact

Feel free to reach out via the [contact section](https://siyabuilds.github.io#contact) on the website or connect on [GitHub](https://github.com/siyabuilds).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
