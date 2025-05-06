# Frontend Documentation

This document provides an overview of the structure and dependencies for the frontend of the project.

## 📁 Project Structure

```bash
frontend/
│
├── node_modules/ # Project dependencies
├── public/ # Static assets (e.g., index.html, favicon)
├── src/ # Source files
│   ├── assets/ # Images, fonts, and other static assets
│   ├── components/ # Reusable Components 
│   └── pages/ # React page components
│
├── .gitignore # Git ignore rules
├── package.json # Project metadata and dependencies
├── README.md # Project documentation
└── vite.config.js # Vite configuration file
```


## 📦 Dependencies

Below are the core dependencies used in this project:

- **[Tailwind CSS](https://tailwindcss.com/)** with **[Vite](https://vitejs.dev/)** — Utility-first CSS framework integrated into the build tool
- **[React Router DOM](https://reactrouter.com/)** — For routing and navigation
- **[React Leaflet](https://react-leaflet.js.org/)** — For interactive maps using Leaflet in React

To install all dependencies, run:

```bash
npm install
```

## 🚀 Getting Started

To start the development server:

```bash
npm run dev
```