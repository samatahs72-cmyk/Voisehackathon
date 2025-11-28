# VoiseHackathon

Official repository for Voise Hackathon 2025

This workspace contains two projects:

- `healthcare-frontend` — React + Vite frontend (Tailwind CSS)
- `healthcare-backend` — Express backend that queries OpenStreetMap Overpass

Quick start (from repository root):

1. Install frontend dependencies and run dev server:
   ```powershell
   cd healthcare-frontend
   npm install
   npm run dev
   ```

2. Install backend dependencies and run server:
   ```powershell
   cd ..\healthcare-backend
   npm install
   npm run dev
   ```

The frontend is configured to proxy `/api` to the backend on port `5000` during development (`vite.config.js`).
