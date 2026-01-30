The Flying Panda – Visa Slot Alert Tracker

An internal tool for tracking visa appointment slot alerts, designed with a clean, production-ready full-stack architecture.

This project demonstrates realistic backend design, a simple but functional frontend, and clear engineering decision-making.

Quick Start
Prerequisites

Node.js 18+

MongoDB (local or Atlas)

npm

Backend Setup
cd backend
npm install


Create a .env file:

PORT=3000
MONGODB_URI=MONGODB_URI
NODE_ENV=development


Start MongoDB (if local):

mongod --dbpath /path/to/data


Run the server:

npm run dev


Backend runs at:

http://localhost:3000

Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs at:

http://localhost:5173

API Documentation

Base URL

http://localhost:3000/api

Get All Alerts
GET /alerts?country=USA&status=Active


Query Parameters

country (optional): case-insensitive filter

status (optional): Active | Booked | Expired

page (optional): default 1

limit (optional): default 50

Response – 200 OK

[
  {
    "_id": "65abc123...",
    "country": "USA",
    "city": "New York",
    "visaType": "Tourist",
    "status": "Active",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]

Create Alert
POST /alerts

{
  "country": "USA",
  "city": "San Francisco",
  "visaType": "Business"
}


Response – 201 Created

Update Alert Status
PUT /alerts/:id

{
  "status": "Booked"
}


Errors

404 – Alert not found

Delete Alert
DELETE /alerts/:id


Response

{
  "message": "Alert deleted successfully"
}

Architecture & Design Decisions
Backend Architecture

Layered architecture

Routes → Controllers → Models → Middleware


Why this approach

Clear separation of concerns

Easy to test and extend

Scales cleanly as features grow

Key Decisions

Mongoose ODM

Schema-level validation

Cleaner queries

Middleware hooks for future logic
Trade-off: minor overhead for much better DX

Custom Middleware

Request logger (method, path, duration)

Centralized error handler

Proper HTTP status codes (400, 404, 500)

Filtering Strategy

Case-insensitive country search using regex

Slight performance cost, better UX

Indexing

alertSchema.index({ country: 1, status: 1 });


Optimizes common filter queries.

Frontend Architecture

Single React component for simplicity

API logic separated into a dedicated file

State managed using useState and useEffect

Native fetch for API calls

Styling

Tailwind CSS v4 using the official Vite plugin

Utility-first styling for fast iteration

Production Improvements
High Priority

Authentication (JWT)

Input validation (Zod / Joi)

Rate limiting

Environment-based config

Structured logging (Winston / Pino)

Medium Priority

API versioning (/api/v1)

Pagination metadata

CORS restrictions

Nice to Have

Swagger documentation

Soft deletes

Audit logs

Redis caching

Automated testing

Testing (Example)
import request from 'supertest';
import app from '../src/server.js';

describe('Alert API', () => {
  test('POST /alerts creates alert', async () => {
    const res = await request(app)
      .post('/api/alerts')
      .send({
        country: 'USA',
        city: 'NYC',
        visaType: 'Tourist'
      });

    expect(res.statusCode).toBe(201);
  });
});

Deployment Notes
Backend

Platforms:  Render

Use MongoDB Atlas

Set environment variables:

NODE_ENV=production
MONGODB_URI=...
PORT=3000

Frontend

Platforms: Vercel

Set API URL:

const API_BASE = import.meta.env.VITE_API_URL;

AI Assistance vs Manual Work
Where AI Helped

Boilerplate generation

Mongoose query patterns

Error handling structure

Initial frontend layout

Where I Had to Think

Architecture decisions

HTTP status code usage

Filter trade-offs

Indexing strategy

Production-level concerns

File Structure
flying-panda-visa-alerts/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
└── README.md

Technical Highlights

RESTful API design

Clean separation of concerns

Centralized error handling

Indexed MongoDB queries

Production-aware design decisions

Clear documentation

Final note

This project intentionally focuses on clarity, correctness, and realism over feature count or UI polish.