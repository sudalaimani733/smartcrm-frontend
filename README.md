# SmartCRM Frontend

A React-based frontend for the SmartCRM application. It allows users to manage customers, leads, deals, activities, and view dashboard analytics through a responsive interface.

## Features

- User Login & Registration
- JWT Authentication
- Dashboard with Charts
- Customer Management
- Lead Management
- Deal Pipeline
- Activity Management
- Responsive UI
- Protected Routes

## Tech Stack

- React (Vite)
- JavaScript
- Tailwind CSS
- React Router
- Axios
- Recharts

## Folder Structure

```
src
 ├── components
 ├── pages
 ├── services
 ├── hooks
 ├── layouts
 ├── context
 ├── utils
 └── assets
```

## Installation

Clone Repository

```bash
git clone https://github.com/sudalaimani733/smartcrm-frontend.git
```

Install Dependencies

```bash
npm install
```

Run Development Server

```bash
npm run dev
```

Application runs at

```
http://localhost:5173
```

## API Configuration

Update API URL if required.

Example

```javascript
const BASE_URL = "http://localhost:8080/api";
```

## Main Pages

- Login
- Register
- Dashboard
- Customers
- Leads
- Deals
- Activities

## Charts

Dashboard includes

- Lead Status
- Deal Pipeline
- Sales Performance
- Revenue Overview

## Future Improvements

- Role-Based UI
- Dark Mode
- Notifications
- Advanced Filters
- Mobile Optimization
