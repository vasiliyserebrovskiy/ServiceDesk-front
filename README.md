# Service Desk Frontend

Frontend application for a Service Desk system — a pet project built to practice React, Redux Toolkit, and TypeScript, designed for future integration with ServiceNow.

## Tech Stack

- React 19
- TypeScript 5
- Vite 8
- Redux Toolkit 2
- React Router 7
- Axios
- Tailwind CSS 4
- Formik + Yup

---

## Features

### Authentication & Security

- JWT-based authentication with access and refresh tokens
- Refresh token rotation via HttpOnly cookies
- Protected routes with role-based access (ADMIN, MANAGER, USER)
- Auth bootstrap on application load
- Automatic token refresh on 401 via Axios interceptor

### User Management

- User list, create, edit (admin)
- Profile page with self-service password change
- Admin password reset for users
- Role display and assignment

### Reference Data Management

- Categories with ticket type flags (Incident / Problem / Request / Change)
- Subcategories linked to parent categories (dynamic filtering)
- Statuses with ticket type flags
- Configuration Items (CI)
- Groups with user membership management (transfer modal)

### Incidents

- Incident list with enriched display (resolved names for all FK fields)
- Create incident with auto-generated number (pre-fetched from backend sequence)
- Edit incident with full field support
- Priority auto-calculation based on Impact × Urgency matrix
- Filtering by status (Open / Closed) and by current user (My Incidents)
- Incidents are never deleted — only closed via status change

---

## Project Structure

```
src/
├── api/                  # Axios instance and interceptors
├── app/                  # Redux store and hooks
├── assets/               # Static assets
├── components/
│   ├── form/             # Reusable form fields (edit, list, readonly, desc)
│   ├── modals/           # Confirm dialog, Users transfer modal
│   ├── navigation/       # Navigation menu with role-based visibility
│   └── tables/           # DataTable and TableSection components
├── features/             # Redux slices and API calls per domain
│   ├── auth/
│   ├── categories/
│   ├── cis/
│   ├── groups/
│   ├── incidents/
│   ├── roles/
│   ├── statuses/
│   ├── sybcategories/
│   └── users/
├── layouts/              # Header and MainLayout
├── pages/
│   ├── administration/   # User and role management (admin only)
│   ├── management/       # Reference data (categories, statuses, CI, groups)
│   ├── tickets/          # Incident pages
│   └── Profile/          # User profile and password management
├── routes/               # Route definitions with role guards
└── shared/
    ├── hooks/            # Custom hooks per domain
    ├── types/            # TypeScript types per domain
    ├── utils/            # Utility functions (select options, role display)
    └── validation/       # Yup validation schemas
```

---

## Getting Started

```bash
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file in the project root:

```
VITE_API_URL=http://localhost:8080/api
```

For production create `.env.production`:

```
VITE_API_URL=https://your-backend-domain.com/api
```

---

## Backend

Backend is implemented separately in Java / Spring Boot.
See [ServiceDesk-back](https://github.com/vasiliyserebrovskiy/ServiceDesk-back) for details.

---

## Project Goals

This project was built to:

- Practice React with Redux Toolkit and TypeScript
- Implement a realistic ITSM domain on the frontend
- Prepare integration with ServiceNow REST API
- Build a portfolio project demonstrating full-stack development
