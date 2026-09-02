# PhysioHub Frontend

PhysioHub is a React-based clinic management frontend for physiotherapy practices. It provides authenticated workspaces for managing patients, appointments, treatments, assessments, communication, notifications, billing, and clinic settings.

## Features

- Dashboard with shared navigation and responsive layout
- Patient management: all patients, active patients, and add patient
- Appointment management:
  - Calendar (`/appointments/calendar` and `/appointments/calender`)
  - Today's appointments (`/appointments/todays`)
  - Upcoming appointments
  - Waiting list
- Treatment sessions, treatment plans, and treatment history
- Assessments, new assessments, and assessment history
- Clinic settings:
  - Profile and clinic details
  - Notifications and security
  - Roles and permissions
  - Subscriptions and billing usage
- Notifications with unread filtering and read-state actions
- Messages with searchable conversations and replies
- Help and support with FAQs and support requests
- Forgot-password and password-reset flow

## Technology

- React 19
- Create React App
- React Router DOM
- TanStack React Query
- Zustand
- Tailwind CSS
- Lucide React icons

## Requirements

- Node.js 18 or newer
- npm
- A running PhysioHub API for authenticated and server-backed operations

## Getting Started

Install dependencies:

```bash
npm install
```

Create an optional `.env.local` file to configure the API base URL:

```env
REACT_APP_API_BASE_URL=http://localhost:5000/api/v1
```

The default API base URL is `http://localhost:5000/api/v1`.

Start the development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

### `npm start`

Runs the app in development mode with hot reloading.

### `npm test`

Runs the test runner in interactive watch mode.

### `npm run build`

Creates an optimized production build in the `build` directory.

### `npm run eject`

Ejects the Create React App configuration. This is a one-way operation and is not normally required.

## Password Reset API

The forgot-password request uses:

```http
POST /api/v1/auth/users/password
```

with the email payload:

```json
{
  "user": {
    "email": "user@example.com"
  }
}
```

Reset links should open `/reset-password?token=<reset-token>`. The reset form submits the token, password, and password confirmation to the same endpoint using `PUT`.

## Project Structure

```text
src/
├── components/       # Shared marketing and dashboard layout components
├── pages/             # Route-level pages
│   ├── appointments/  # Calendar and appointment views
│   ├── assessments/   # Assessment views
│   ├── patients/      # Patient views
│   ├── settings/      # Settings sections
│   └── treatments/    # Treatment views
├── services/          # API and React Query service functions
├── store/             # Zustand application stores
├── utils/             # API client and shared utilities
└── routes.js          # Public and protected route definitions
```

## Deployment

Run `npm run build`, then serve the generated `build` directory with a static web server. Configure `REACT_APP_API_BASE_URL` for the target environment before building.
