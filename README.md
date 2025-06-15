# Sunbeam

Sunbeam is a modern web application built with [Next.js](https://nextjs.org), designed as a robust, full-featured Inventory Management (library and account management) platform. It leverages the latest Next.js App Router, server components, and integrates with Supabase for authentication and data storage. The project is structured for scalability, maintainability, and developer productivity.

## Features

- **User Authentication**: Secure login, sign-out, and account confirmation flows using Supabase Auth.
- **Library Management**: Add, edit, and manage books or documents in a user-friendly interface.
- **Dashboard**: Visualize statistics and manage your library from a central dashboard.
- **Responsive UI**: Modern, accessible, and responsive design using custom UI components.
- **API Routes**: RESTful API endpoints for library and account operations.
- **Theming**: Light/dark mode and theme selection support.
- **Prisma ORM**: Type-safe database access and migrations (if enabled).

## Project Structure

- `app/` — Main Next.js app directory (routing, pages, API endpoints)
- `components/` — Reusable UI and layout components
- `hooks/` — Custom React hooks
- `lib/` — Utility libraries (Prisma, Supabase helpers, etc.)
- `public/` — Static assets
- `utils/` — Additional utilities and integrations
- `prisma/` — Prisma schema and migrations

## Technologies Used

- [Next.js](https://nextjs.org/) (App Router, Server Components)
- [Supabase](https://supabase.com/) (Auth, Database)
- [Prisma ORM](https://www.prisma.io/) (optional, for advanced DB access)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/) (code quality)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
2. **Set up environment variables:**
   - Copy `.env.example` to `.env.local` and fill in your Supabase/Prisma credentials.
3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.

## Code Documentation

- All exported functions and modules are documented with JSDoc/TSDoc comments for clarity and maintainability.
- See `lib/`, `utils/`, and `components/` for detailed code documentation.

## Deployment

Deploy easily on [Vercel](https://vercel.com/) or any platform supporting Next.js. See [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).
---

© 2025 Sunbeam Project. Built with Next.js and Supabase.
