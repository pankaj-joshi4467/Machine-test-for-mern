import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import agentRoutes from './routes/agents.routes.js';
import leadsRoutes from './routes/leads.routes.js';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Agent from './models/Agent.js';
import Lead from "./models/Lead.js";
const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/auth', authRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/leads', leadsRoutes);
app.get('/', (req, res) => res.send('API OK'));
const PORT = process.env.PORT || 5000;
(async () => {
  await connectDB(process.env.MONGO_URI);
  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail) {
    const exists = await User.findOne({ email: adminEmail });
    if (!exists) {
      const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      await User.create({
        name: process.env.ADMIN_NAME || 'Your Name',
        email: adminEmail,
        mobile: process.env.ADMIN_MOBILE || '',
        password: hashed,
        role: 'admin'
      });
      console.log('✅ Seeded default admin:', adminEmail);
    }
  }
  if (process.env.SEED_DEMO_AGENTS === 'true') {
    const demo = [
      { name: 'Agent A', email: 'a1@example.com', mobile: '+919900000001', password: 'pass123' },
      { name: 'Agent B', email: 'b2@example.com', mobile: '+919900000002', password: 'pass123' },
      { name: 'Agent C', email: 'c3@example.com', mobile: '+919900000003', password: 'pass123' },
      { name: 'Agent D', email: 'd4@example.com', mobile: '+919900000004', password: 'pass123' },
      { name: 'Agent E', email: 'e5@example.com', mobile: '+919900000005', password: 'pass123' }
    ];
    for (const a of demo) {
      const exists = await Agent.findOne({ email: a.email });
      if (!exists) {
        const hashed = await bcrypt.hash(a.password, 10);
        await Agent.create({ ...a, password: hashed });
      }
    }
    console.log('✅ Seeded 5 demo agents');
  }
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
})();
// Reset all leads
app.post("/api/reset", async (req, res) => {
  try {
    await Lead.updateMany({}, { assignedAgent: null });
    res.json({ success: true, message: "Dashboard reset successfully ✅" });
  } catch (error) {
    console.error("Reset error (Backend):", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// delete all leads
app.post("/api/deleteAll", async (req, res) => {
  try {
    await Lead.deleteMany({});
    res.json({ success: true, message: "All leads deleted successfully 🗑️" });
  } catch (error) {
    console.error("Delete error (Backend):", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});