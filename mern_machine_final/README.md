# MERN Machine Final — Ready ZIP

This package contains a full MERN app (server + client) with Tailwind styles and functionality:
- Admin login (JWT)
- Agent CRUD (create, list, deactivate)
- Flexible CSV/XLSX parsing and distribution across 5 agents
- Leads saved in MongoDB, viewable in Dashboard

## Run (quick)
1. Start MongoDB locally.
2. Start server:
   ```
   cd server
   npm install
   npm run dev
   ```
3. Start client:
   ```
   cd client
   npm install
   npx tailwindcss init -p
   npm run dev
   ```
4. Open `http://localhost:5173` and login with seeded admin: `admin@example.com` / `Admin@123`

