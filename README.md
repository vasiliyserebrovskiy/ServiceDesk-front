# Service Desk Frontend

Frontend application for Service Desk system built with React, TypeScript and Vite.

## Tech Stack

- React
- TypeScript
- Vite
- Redux Toolkit
- React Router
- Axios
- TailwindCSS
- Formik + Yup

## Features (planned)

- Authentication (login / logout)
- Refresh token handling
- Protected routes
- Dashboard
- Ticket management (create / update / view)
- User roles (admin / user)

## Project Setup

```bash
npm install
npm run dev
```

## Environment Variables

### Create .env file:

VITE_API_URL=http://localhost:8080/api

## Architecture (WIP)

### Planned structure:

```

src/
├── app/
├── pages/
├── features/
├── components/
├── layouts/
├── routes/
├── api/
└── shared/

```

## Backend

Backend is currently under development / already implemented separately.

### Notes

- Authentication uses email-based login (temporary, will be replaced with user ID later)
- Refresh tokens are stored in database on backend
