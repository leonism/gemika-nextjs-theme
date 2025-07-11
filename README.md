# 🚀 Gemika Next.js Theme

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white&style=for-the-badge)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-gray?logo=tailwind-css&logoColor=38B2AC&style=for-the-badge)](#)
[![MDX](https://img.shields.io/badge/MDX-000000?logo=mdx&logoColor=white&style=for-the-badge)](#)
[![Turbopack](https://img.shields.io/badge/Turbopack-222222?logo=webpack&logoColor=blue&style=for-the-badge)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge)](#)

[![Netlify Status](https://api.netlify.com/api/v1/badges/a7d8d2c7-8b6d-4339-b755-b6e6817de183/deploy-status)](https://app.netlify.com/sites/gemika/deploys)
[![Vercel Status](https://vercelbadge.vercel.app/api/leonism/gemika-nextjs-theme?style=for-the-badge)](https://vercel.com/leonism/gemika-nextjs-theme)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://github.com/leonism/gemika-nextjs-theme/actions/workflows/ci.yml/badge.svg)](https://github.com/leonism/gemika-nextjs-theme/actions)
![Gemika Next.js Theme](public/gemika-nextjs-theme-splash.jpg)

</div>

## 📖 Overview

Gemika Next.js Theme is a dynamic web application template built for developers looking to build high-performance apps using cutting-edge technologies. This project leverages Next.js, MDX, Tailwind CSS, and Turbopack, providing an efficient, modern development environment with robust configurations and up-to-date dependencies. Whether starting a new project or enhancing an existing one, this theme offers an efficient foundation adhering to industry best practices.

## 📋 Table of Contents

- [🚀 Gemika Next.js Theme](#-gemika-nextjs-theme)
  - [📖 Overview](#-overview)
  - [📋 Table of Contents](#-table-of-contents)
  - [✨ Features](#-features)
  - [🔄 Recent Updates](#-recent-updates)
  - [🛠️ Installation](#-installation)
  - [🏃 Development](#-development)
  - [🏗️ Building for Production](#-building-for-production)
  - [🌍 Deployment Options](#-deployment-options)
    - [Vercel Deployment](#vercel-deployment)
    - [Cloudflare Pages Deployment](#cloudflare-pages-deployment)
    - [Netlify Deployment](#netlify-deployment)
  - [📊 Project Structure](#-project-structure)
  - [🧩 Components](#-components)
  - [📝 Content Management](#-content-management)
  - [🎨 Styling](#-styling)
  - [📱 Responsive Design](#-responsive-design)
  - [🔍 SEO Optimization](#-seo-optimization)
  - [📈 Performance](#-performance)
  - [📜 Changelog](#-changelog)
  - [🤝 Contributing](#-contributing)
  - [📄 License](#-license)

## ✨ Features

- ⚡ **Turbocharged development** with Turbopack for rapid build times
- 🌙 **Dark/light mode toggle** for a customizable user experience
- 📱 **Responsive design** optimized for all devices
- 🔍 **Advanced search** with intelligent relevance scoring
- 📝 **MDX-powered content** for rich, interactive documents
- 🎨 **Gradient-heavy UI** with smooth animations
- 📊 **SEO optimized** using JSON-LD structured data
- 🌐 **Internationalization** support for global reach
- 🔒 **Security best practices** implemented to safeguard data
- 📧 **Contact forms** with modern validation
- 📚 **Resource libraries** for development and design tools
- 🎯 **Project showcases** with dynamic categories
- 📖 **Blog system** with pagination and tags
- 🍪 **Cookie consent** management
- 📊 **Analytics integration** with Google Tag Manager

## 🔄 Recent Updates

- Added Google Tag Manager integration for enhanced analytics
- Expanded the Frontmatter interface in Types for richer content metadata
- Optimized responsive layout with improved pagination components
- Enhanced SEO metadata for better search engine visibility
- Updated theme naming from BenJo to Gemika to reflect branding changes
- Included legal and responsive updates to the footer component
- Added comprehensive resource pages for design and development tools
- Implemented cookie consent management system
- Enhanced project gallery with dynamic category filtering
- Improved code formatting and linting configurations

## 🛠️ Installation

Get started with these simple steps:

```bash
# Clone the repository
git clone https://github.com/leonism/gemika-nextjs-theme.git

# Change into the project directory
cd gemika-nextjs-theme

# Install dependencies
npm install
```

## 🏃 Development

Launch the development server using Turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view your progress. The page auto-refreshes for changes, showing any build errors and lint warnings in the console.

### Additional Development Commands

```bash
# Run linting
npm run lint

# Fix linting issues and format code
npm run lint:fix

# Format code only
npm run format

# Run all code quality checks
npm run check:code
```

## 🏗️ Building for Production

Create an optimized production-ready build:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

Access the server on [http://localhost:3000](http://localhost:3000).

## 🌍 Deployment Options

### Vercel Deployment

Quickly deploy your app using Vercel:

```bash
# Install the Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Cloudflare Pages Deployment

Deploy on Cloudflare Pages for fast, global edge delivery:

```bash
# Build for Cloudflare Pages
npm run pages:build

# Deploy
npm run pages:deploy

# Or handle it all in one step
npm run deploy
```

### Netlify Deployment

Deploy on Netlify for seamless continuous deployment:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy
```

## 📊 Project Structure

```text
gemika-nextjs-theme/
├── app/                    # App router directory
│   ├── about/             # About page
│   ├── api/               # API routes
│   ├── contact/           # Contact form
│   ├── posts/             # Blog posts with dynamic routing
│   ├── projects/          # Project showcase with categories
│   ├── resources/         # Resource libraries
│   │   ├── design/        # Design resources
│   │   ├── development/   # Development tools
│   │   └── books-articles/ # Educational content
│   ├── search/            # Search functionality
│   ├── tags/              # Tag-based filtering
│   └── styles/            # Global styles
├── components/            # Reusable components
│   ├── ui/                # UI components
│   ├── forms/             # Form components
│   ├── navigation/        # Navigation components
│   ├── home/              # Homepage sections
│   └── utility/           # Utility components
├── content/               # MDX content
│   ├── posts/             # Blog posts
│   ├── projects/          # Project descriptions
│   └── pages/             # Static pages
├── lib/                   # Utility functions
├── public/                # Static assets
└── .github/               # GitHub workflows
```

## 🧩 Components

Gemika includes a rich set of pre-built components:

- 🎯 **UI components** (buttons, cards, forms)
- 📊 **Layout components** (containers, grids)
- 🧭 **Navigation components** (navbar, sidebar, pagination)
- 📱 **Responsive components** (adapting to different screen sizes)
- 🎭 **Animation components** (transitions, effects)
- 🔍 **Search components** (search forms, results)
- 📧 **Form components** (contact forms, newsletter signup)
- 🍪 **Utility components** (cookie consent, theme toggle)

## 📝 Content Management

Content is managed through MDX files in the `content/` directory:

- 📄 **Blog posts** with frontmatter metadata
- 🖼️ **Projects** with gallery support
- 📚 **Resources** categorized by type
- 📋 **Pages** for static content
- 🏷️ **Tags** for content organization

### Content Features

- Rich text formatting with MDX
- Syntax highlighting for code blocks
- Image optimization and galleries
- Automatic table of contents generation
- SEO-friendly URLs and metadata

## 🎨 Styling

Styling is powered by:

- 🎨 **Tailwind CSS** for utility-first styling
- 🌈 **CSS variables** for theming
- 🌙 **Dark mode** support with smooth transitions
- 📱 **Responsive design** utilities
- 🎭 **Custom animations** and transitions
- 🎯 **Design system** with consistent spacing and typography

## 📱 Responsive Design

The theme is built with a mobile-first approach:

- 📱 **Mobile optimized** with touch-friendly interactions
- 💻 **Tablet responsive** with adaptive layouts
- 🖥️ **Desktop functional** with enhanced features
- 📺 **Large screen support** with proper scaling

## 🔍 SEO Optimization

Built-in SEO features include:

- 📊 **JSON-LD structured data** for rich snippets
- 🏷️ **Meta tags** for social media sharing
- 🔗 **Canonical URLs** to prevent duplicate content
- 🗺️ **Sitemap generation** for search engines
- 🤖 **robots.txt** configuration
- 🖼️ **Open Graph** images and metadata
- 🐦 **Twitter Cards** for social sharing

## 📈 Performance

Performance optimizations include:

- ⚡ **Code splitting** for faster page loads
- 🖼️ **Image optimization** with Next.js Image component
- 🔄 **Incremental Static Regeneration** for dynamic content
- 📦 **Bundle size optimization** with tree shaking
- 🚀 **Server-side rendering** where appropriate
- 💾 **Caching strategies** for improved performance
- 🔧 **Turbopack** for lightning-fast development builds

## 📜 Changelog

### v0.2.0 (Current)

- Enhanced component styling for better UI consistency
- Improved SEO setup and performance optimizations
- Added new resources and updated the project gallery
- Integrated Google Tag Manager for analytics
- Added cookie consent management
- Enhanced typography and spacing consistency
- Improved responsive design across all components
- Added comprehensive resource libraries

### v0.1.0

- 🚀 Initial release with core functionality
- 📝 Complete portfolio sections
- 📚 Blog with pagination
- 📊 Resource library
- 🌙 Dark/light mode toggle
- 🔍 Search functionality

## 🤝 Contributing

We welcome contributions—please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/awesome-feature`
3. Commit your improvements: `git commit -m 'Add awesome feature'`
4. Push your changes: `git push origin feature/awesome-feature`
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and formatting
- Run `npm run check:code` before submitting
- Add appropriate tests for new features
- Update documentation as needed

## 📄 License

MIT © [Gemika Haziq Nugroho]

---

💖 Crafted with Next.js, TailwindCSS, MDX, TypeScript, and lots of coffee!
