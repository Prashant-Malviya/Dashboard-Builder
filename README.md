# Dashboard Builder (PERN Stack)

A simple drag-and-drop dashboard builder inspired by tools like Canva and Figma. Users can create dashboards and add **Text**, **Image**, and **Chart** widgets, then move, resize, edit, duplicate, and save them.

The project is built using the **PERN stack** with a React frontend and a Node.js + Express backend using Prisma ORM and PostgreSQL.

---

# Tech Stack

### Frontend

* React 19
* Vite
* Tailwind CSS
* react-rnd
* React Quill
* Chart.js + react-chartjs-2
* Axios
* Lucide React

### Backend

* Node.js
* Express.js
* Prisma ORM
* Multer
* Morgan
* CORS
* dotenv

### Database

* PostgreSQL (Neon)

---

# Project Structure

```
dashboard-builder
│
├── backend
│   ├── prisma
│   │   ├── schema.prisma
│   │   ├── seed.js
│   │   └── seed.sql
│   │
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   ├── app.js
│   │   └── server.js
│   │
│   └── uploads
│
└── frontend
    └── src
        ├── api
        ├── components
        ├── hooks
        └── utils
```

The backend follows a layered architecture:

```
Route
   ↓
Controller
   ↓
Service
   ↓
Prisma
   ↓
PostgreSQL
```

This keeps the routes clean while separating HTTP handling from business logic and database operations.

---

# Prerequisites

Before running the project, make sure you have:

* Node.js (v18 or later)
* npm
* A PostgreSQL database (Neon is recommended)

---

# Running the Project Locally

## 1. Clone the Repository

```bash
git clone <repository-url>
cd dashboard-builder
```

---

# Backend Setup

Move into the backend folder.

```bash
cd backend
```

Install dependencies.

```bash
npm install
```

Create a `.env` file.

```bash
cp .env.example .env
```

Update the environment variables.

```env
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"

PORT=5000

CLIENT_URL=http://localhost:5173
```

Generate the Prisma client.

```bash
npx prisma generate
```

Run the database migrations.

```bash
npx prisma migrate dev --name init
```

(Optional) Seed the database with sample data.

```bash
npm run seed
```

Start the backend server.

```bash
npm run dev
```

The backend will be available at:

```
http://localhost:5000
```

Uploaded images are served from:

```
http://localhost:5000/uploads
```

---

# Frontend Setup

Open another terminal.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Create the environment file.

```bash
cp .env.example .env
```

Add the backend URL.

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the development server.

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

# Available API Endpoints

| Method | Endpoint                     | Description                  |
| ------ | ---------------------------- | ---------------------------- |
| POST   | `/api/dashboards`            | Create a dashboard           |
| GET    | `/api/dashboards`            | Get all dashboards           |
| GET    | `/api/dashboards/:id`        | Get a dashboard with widgets |
| DELETE | `/api/dashboards/:id`        | Delete a dashboard           |
| POST   | `/api/widgets`               | Create a widget              |
| PUT    | `/api/widgets/:id`           | Update a widget              |
| DELETE | `/api/widgets/:id`           | Delete a widget              |
| POST   | `/api/widgets/:id/duplicate` | Duplicate a widget           |
| POST   | `/api/layouts/save`          | Save dashboard layout        |
| GET    | `/api/layouts/:dashboardId`  | Get saved layout             |
| POST   | `/api/images/upload`         | Upload an image              |
| GET    | `/api/stats`                 | Dashboard statistics         |
| GET    | `/api/health`                | Health check                 |

---

# Response Format

Every API returns a consistent response structure.

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {}
}
```

---

# How Saving Works

The dashboard works with local state while you're editing.

* Dragging widgets
* Resizing widgets
* Editing text
* Updating chart data
* Replacing images

None of these changes are sent to the server immediately.

When you click **Save**, the frontend sends the complete widget list to:

```
POST /api/layouts/save
```

The backend performs everything inside a single Prisma transaction:

* updates existing widgets
* creates newly added widgets
* removes deleted widgets

The updated widget list is then returned so any temporary client-side IDs are replaced with the actual database IDs.

---

# Features

* Create multiple dashboards
* Drag and resize widgets
* Rich text editor with formatting support
* Upload and replace images
* Bar, Line, Pie and Doughnut charts
* Duplicate widgets
* Delete widgets
* Bulk save dashboard layouts
* Toast notifications
* Responsive layout for desktop, tablet and mobile

---

# Design Choices

### JSON-based widget content

Each widget stores its data inside a single JSON column.

Since text, images and charts all require different data structures, using JSON keeps the database schema flexible without creating separate tables for every widget type.

---

### Layered Backend

Business logic is separated from request handling.

```
Routes
    ↓
Controllers
    ↓
Services
    ↓
Prisma
```

This makes the codebase easier to maintain, test and extend.

---

### Custom Hooks Instead of Global State

The application only needs two custom hooks:

* `useDashboard`
* `useWidgets`

Since the state is relatively small, adding Redux or Zustand would introduce unnecessary complexity.

---

### Explicit Save

Instead of sending an API request every time a widget moves, all edits remain in memory until the user clicks **Save**.

This reduces unnecessary network requests and keeps the implementation simple.

---


# Future Improvements

* Authentication
* Dashboard sharing
* Undo/Redo
* Widget layering (Bring Forward / Send Backward)
* Auto-save
* Export dashboard as PDF or image
* Real-time collaboration
