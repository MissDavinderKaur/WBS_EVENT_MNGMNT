# WBS Event Management

A full-stack event management application with a Node.js/Express/MongoDB backend and a React/Vite frontend.

## Project Structure

- `server/` - backend API with event and auth routes
- `wbs-event-mngmnt/` - frontend React app built with Vite

## Features

- Event and User CRUD operations
- Server-side authentication with JWT
- User roles and owner metadata per event
- Login-protected event creation flow
- Seed scripts for initial events and users

## Backend

The backend is configured in the repository root and uses:

- `express`
- `mongoose`
- `zod` for validation
- `bcryptjs` for password hashing
- `jsonwebtoken` for JWT-based auth

### Entry point

- `server/index.ts`

### API routes

- `POST /api/auth/register` - register a new user
- `POST /api/auth/login` - authenticate and receive a JWT
- `GET /api/events` - list events
- `GET /api/events/:id` - event details
- `POST /api/events` - create event
- `PUT /api/events/:id` - update event
- `DELETE /api/events/:id` - delete event

### Seed scripts

- `npm run seed` - seed event data
- `npm run seed:users` - seed sample users

## Frontend

The frontend lives in `wbs-event-mngmnt/` and uses:

- `react`
- `react-router-dom`
- `vite`
- `zod` for client-side validation


## Setup

### Backend

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the project root with:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/wbs-events
   JWT_SECRET=your_secret_here
   ```

3. Start the backend server:
   ```bash
   npm run dev
   ```

4. Seed data if desired:
   ```bash
   npm run seed
   npm run seed:users
   ```

### Frontend

1. Change into the frontend folder:
   ```bash
   cd wbs-event-mngmnt
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```
