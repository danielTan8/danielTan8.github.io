# Repository Guidelines

This repository contains a personal portfolio website built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. It is configured for static export.

## Project Structure & Module Organization

- **`src/app/`**: Contains the application logic using Next.js App Router.
  - **`components/`**: Organized by feature or section.
    - **`home/`**: Contains sub-folders for each portfolio section (e.g., `hero-section`, `about-me`, `contact`). Each section typically follows the `folder/index.tsx` pattern.
    - **`layout/`**: Shared layout components like headers, footers, and theme providers.
  - **`types/`**: Custom TypeScript definitions and declarations.
- **`src/utils/`**: Shared utility functions (e.g., image path helpers).
- **`public/`**: Static assets, including images and JSON data files used to populate sections.

The project uses `output: "export"` in `next.config.ts` to generate a static site, with `basePath` configuration for deployment.

## Build, Test, and Development Commands

- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Builds the application for production.
- **`npm run export`**: Executes `next build` (configured for static export).
- **`npm run lint`**: Runs ESLint to check for code quality issues.
- **`npm run start`**: Starts a production server (not typically used for static exports).

## Coding Style & Naming Conventions

- **Framework**: Next.js 15+ with React 19.
- **Styling**: Tailwind CSS for all component styling.
- **TypeScript**: Strict typing is encouraged. Custom declarations are kept in `src/app/types`.
- **Linting**: Enforced via ESLint using `next/core-web-vitals` and `next/typescript` configurations.
- **Components**: Follow a modular structure with components co-located in feature folders.

## Commit & Pull Request Guidelines

- **Commit Messages**: Follow conventional commit patterns (e.g., `feat:`, `fix:`, `refactor:`).
- **Deployment**: Static exports are typically deployed to GitHub Pages or similar hosting services.
