# SafeMind Frontend

A modern, responsive React + Vite frontend for SafeMind mental health platform, built with Tailwind CSS.

## Features

- 🎨 Modern, responsive design inspired by Amaha Health
- 📱 Mobile-first responsive layout
- ⚡ Fast development with Vite
- 🎯 Smooth scroll navigation
- 🎨 Tailwind CSS for styling
- 🔧 Component-based architecture

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **ESLint** - Code linting

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx      # Navigation bar with mobile menu
│   ├── Hero.jsx        # Hero section with CTA
│   ├── Features.jsx    # Feature grid section
│   ├── Services.jsx    # Services pricing cards
│   ├── Testimonials.jsx # Customer testimonials
│   └── Footer.jsx      # Footer with links
├── App.jsx             # Main app component
├── main.jsx           # React entry point
└── index.css          # Global styles with Tailwind

config/
├── tailwind.config.js  # Tailwind configuration
├── postcss.config.js   # PostCSS configuration
└── vite.config.js      # Vite configuration
```

## Customization

### Colors
The color scheme can be customized in `tailwind.config.js`:
- Primary: Blue tones for main branding
- Secondary: Green tones for accents
- Neutral: Gray tones for text and backgrounds

### Components
Each component is modular and can be easily customized:
- Modify content in component files
- Adjust styling with Tailwind classes
- Add new sections by creating new components

## Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.