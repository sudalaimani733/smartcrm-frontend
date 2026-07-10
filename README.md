SmartCRM — Frontend

A responsive CRM dashboard built with React and Tailwind CSS, providing an interactive interface for managing customers, leads, and sales deals — including a drag-and-drop Kanban board and live analytics visualizations powered by the SmartCRM Spring Boot backend.

Features


Authentication — JWT-based login flow integrated with the backend auth API
Customer & Lead Management — Create, view, and manage customer and lead records
Sales Pipeline (Kanban) — Drag-and-drop deal pipeline for moving leads through sales stages
Dashboard Analytics — Revenue and pipeline visualizations using Recharts
Responsive UI — Built with Tailwind CSS for a clean, mobile-friendly layout


Tech Stack

LayerTechnologyLibraryReactBuild ToolViteStylingTailwind CSSChartsRechartsHTTP ClientAxios / FetchContainerizationDocker (multi-stage build)

Project Structure

src/
├── components/       # Reusable UI components
├── pages/              # Route-level pages (Dashboard, Leads, Deals, Customers)
├── features/           # Feature-specific logic (Kanban board, charts)
├── services/           # API calls to SmartCRM backend
├── context/             # Auth context / global state
└── utils/                # Helper functions

Getting Started

Prerequisites


Node.js 18+
npm or yarn
SmartCRM backend running locally or accessible via API URL


Run locally

bashgit clone https://github.com/<your-username>/smartcrm-frontend.git
cd smartcrm-frontend
npm install
npm run dev

The app will be available at http://localhost:5173 by default.

Environment Variables

Create a .env file in the root:

VITE_API_BASE_URL=http://localhost:8080/api

Run with Docker

bashdocker build -t smartcrm-frontend .
docker run -p 5173:5173 smartcrm-frontend

Or run the full stack (frontend + backend + MySQL) via the backend repo's docker-compose.yml.

Key UI Modules


Dashboard — Revenue trends, lead conversion rate, and pipeline overview
Leads — Table and detail views with lead scoring indicators
Deals (Kanban) — Drag-and-drop board across pipeline stages (New → Contacted → Proposal → Won/Lost)
Customers — Searchable customer directory with activity history


Related Repository


Backend: 



Sudalaimani P
LinkedIn · GitHub
