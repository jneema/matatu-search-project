# Matatu Route Finder

A web app for finding matatu (public minibus) routes, comparing fares, and navigating Kenya's urban transport network — currently focused on Nairobi.

## Features

- **Route search** — search by town, direction, starting point, and destination
- **Route comparison** — compare direct and transfer options tagged by EXPRESS, FASTEST, CHEAPEST, ELECTRIC, and more
- **Fare estimates** — view peak and off-peak fares before boarding
- **Live trip map** — follow your route on an interactive map (Leaflet)
- **Saved routes** — bookmark routes for offline access
- **Community contributions** — submit routes, destinations, saccos, matatus, roads, and towns for review
- **Admin panel** — review and approve community submissions

## Tech Stack

| Layer     | Tools          |
| --------- | -------------- |
| Framework | React 19, Vite |
| Routing   | React Router 7 |
| State     | Redux Toolkit  |
| Styling   | Tailwind CSS 4 |
| Maps      | React Leaflet  |
| HTTP      | Axios          |

## Getting Started

### Prerequisites

- Node.js 18+
- A running instance of the backend API

### Installation

```bash
npm install
```

### Environment

Copy `.env` and set your API URL:

```bash
cp .env .env.local
```

```env
VITE_API_URL=http://localhost:8000
```

### Development

```bash
npm run dev
```

### Production build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── api/          # Axios instance and CRUD helpers
├── components/   # Shared UI components
├── containers/   # MatatuRouteFinder — top-level view router
├── hooks/        # Auth, contribute form, and submit hooks
├── pages/        # Route pages (landing, routes, comparison, trip, admin, auth, contribute)
├── services/     # API calls (towns, roads, destinations, routes, upload)
├── store/        # Redux store and saved-routes slice
└── constants/    # Form defaults, tag styles, mode labels
```

## Routes

| Path               | Page                        |
| ------------------ | --------------------------- |
| `/`                | Landing / route search      |
| `/contribute`      | Community contribution form |
| `/saved-routes`    | Saved routes list           |
| `/sign-in`         | Sign in                     |
| `/sign-up`         | Sign up                     |
| `/forgot-password` | Password reset              |
| `/admin`           | Admin review panel          |

## Contributing Data

The `/contribute` page lets anyone submit:

- **Full route** — road, destination, and matatu details in one flow
- **Destination / Road / Town** — individual records, with bulk upload options
- **Sacco & fleet** — operator and vehicle details
- **Matatu** — individual vehicle with images, fares, and payment methods

All submissions are queued for admin review before going live.
