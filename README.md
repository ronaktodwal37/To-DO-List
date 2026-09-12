# Multi-User To-Do List Application

A full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js) featuring strict user isolation.


## Prerequisites
- Node.js installed
- MongoDB installed and running on default port (or updated in `.env`)

## Setup Instructions

### 1. Backend Setup
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Start the backend server:
   ```bash
   node server.js
   ```
   (The server runs on http://localhost:5000 by default)

### 2. Frontend Setup
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
4. Open the application in your browser (usually http://localhost:5173).

## Security
- API Routes are protected via JWT middleware.
- Passwords are salted and hashed.
- Authorization checks ensure that modification requests are strictly limited to the task owner.
