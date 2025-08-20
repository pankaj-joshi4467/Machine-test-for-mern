# 🧑‍💻 Machine Test for MERN Stack

A full-stack **MERN application** for managing agents, uploading CSV/XLSX files, and distributing leads automatically among agents.  
This project includes secure **Admin Authentication, Agent Management, CSV Upload, Lead Distribution, and Dashboard Visualization**.

---

## 🚀 Features  

- ✅ **Admin User Login** – JWT-based authentication with secure login  
- ✅ **Agent Creation & Management** – Add agents with Name, Email, Mobile & Password  
- ✅ **CSV Upload** – Upload `.csv`, `.xlsx`, `.xls` files with validation  
- ✅ **Lead Distribution** – Automatically distribute uploaded leads equally among 5 agents  
- ✅ **Dashboard** – Display distributed leads per agent with reset functionality  
- ✅ **Responsive UI** – Built with **React + Tailwind CSS**

---

## 🛠️ Tech Stack  

- **Frontend:** React.js, Tailwind CSS, Axios  
- **Backend:** Node.js, Express.js, JWT  
- **Database:** MongoDB (Local / MongoDB Atlas)  
- **Others:** Multer (file upload), XLSX parser, Mongoose  

---

## ⚡ Installation & Setup  

### 1️⃣ Clone the Repository  
```bash

git clone https://github.com/<your-username>/machine-test-for-mern.git
cd machine-test-for-mern

2️⃣ Backend Setup
cd server
npm install
npm run dev

3️⃣ Frontend Setup
cd client
npm install
npm run dev


Frontend will run on http://localhost:5173 by default.

📂 Project Structure
machine-test-for-mern/
│── server/          # Express + MongoDB API
│   ├── models/      # Mongoose Models
│   ├── routes/      # API Routes
│   ├── controllers/ # Business Logic
│   └── index.js     # App Entry Point
│
│── client/          # React + Tailwind UI
│   ├── src/components/  
│   ├── src/pages/    
│   └── src/App.jsx    
│
└── README.md

🧑‍💻 How It Works

Admin logs in with credentials

Admin adds agents

Uploads a CSV/XLSX file containing leads

System automatically distributes leads equally among all agents

Dashboard displays assigned leads per agent

Admin can Reset dashboard anytime or Delete All Leads

📌 Notes

Local MongoDB: Make sure MongoDB is installed and running locally.

MongoDB Atlas: You can replace MONGO_URI in .env with your Atlas connection string.

Minimum 5 active agents are required to distribute leads.

✨ Author

👤 Pankaj Joshi

🚀 Full Stack Developer (MERN)

📧 pankajjoshi4467@gmail.com



