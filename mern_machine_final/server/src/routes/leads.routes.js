import { Router } from 'express';
import { auth, isAdmin } from '../middlewares/auth.js';
import { upload } from '../utils/file.js';
import { parseCSVBuffer, parseExcelBuffer } from '../services/parser.js';
import { distributeAmongFive } from '../utils/distribute.js';
import Agent from '../models/Agent.js';
import Lead from '../models/Lead.js';
import crypto from 'crypto';
const router = Router();
router.post('/upload', auth, isAdmin, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    let rows = [];
    const name = req.file.originalname.toLowerCase();
    if (name.endsWith('.csv')) rows = await parseCSVBuffer(req.file.buffer);
    else if (name.endsWith('.xlsx') || name.endsWith('.xls')) rows = await parseExcelBuffer(req.file.buffer);
    else return res.status(400).json({ message: 'Unsupported file type' });
    const items = [];
    for (const r of rows) {
      const firstName = (r.FirstName || '').toString().trim();
      const phone = (r.Phone || '').toString().trim();
      const notes = (r.Notes || '').toString().trim();
      if (!firstName || !phone) continue;
      items.push({ firstName, phone, notes });
    }
    if (!items.length) return res.status(400).json({ message: 'No valid rows found in file' });
    const agents = await Agent.find({ active: true }).sort({ createdAt: 1 }).limit(5);
    if (agents.length < 5) return res.status(400).json({ message: 'At least 5 active agents required' });
    const distribution = distributeAmongFive(items, agents);
    const batchId = crypto.randomUUID();
    const toInsert = [];
    for (const part of distribution) {
      for (const item of part.items) {
        toInsert.push({
          firstName: item.firstName,
          phone: item.phone,
          notes: item.notes,
          assignedTo: part.agentId,
          batchId,
          uploadedBy: req.user.id
        });
      }
    }
    await Lead.insertMany(toInsert);
    const summary = distribution.map((d, idx) => ({ agentId: d.agentId, name: agents[idx]?.name || null, email: agents[idx]?.email || null, count: d.items.length }));
    res.status(201).json({
      message: 'Upload & distribution successful',
      batchId,
      summary
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
});
// Get distributed lists per agent (filter by agentId or by batch)
router.get('/', auth, async (req, res) => {
  const { agentId, batchId } = req.query;
  const q = {};
  if (agentId) q.assignedTo = agentId;
  if (batchId) q.batchId = batchId;
  const leads = await Lead.find(q).populate('assignedTo', 'name email');
  res.json(leads);
});
export default router;
