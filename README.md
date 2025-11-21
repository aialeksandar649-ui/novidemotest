# Nexora - Balkans Accommodation Platform

A modern, responsive web application for discovering and booking unique accommodations in the Balkans.

## Features

- 🏠 Property listings with detailed information
- 🔍 Advanced search and filtering
- 🌍 Multi-language support (English, Bosnian, Serbian)
- 🌙 Dark mode support
- 📱 Fully responsive design
- ⚡ Fast and optimized performance

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18.x
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd testbnb
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Type check without emitting files

## Deployment

### Netlify

1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18
3. Deploy!

The `netlify.toml` file is already configured with:
- Build command and publish directory
- SPA redirects (all routes → index.html)
- Security headers
- Cache headers for static assets

### GitHub Pages

1. Build the project:
```bash
npm run build
```

2. Configure GitHub Pages to serve from the `dist` directory

Note: You may need to set the `base` path in `vite.config.ts` if deploying to a subdirectory.

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React contexts (Theme, Language)
├── data/          # Static data
├── hooks/         # Custom React hooks
├── pages/         # Page components
└── types.ts       # TypeScript type definitions
```

## Environment Variables

No environment variables are currently required. If needed in the future, create a `.env` file in the root directory.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private project
