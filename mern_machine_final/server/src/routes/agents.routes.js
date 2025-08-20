import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import Agent from '../models/Agent.js';
import { auth, isAdmin } from '../middlewares/auth.js';
const router = Router();
// Create agent (Admin only)
router.post('/', auth, isAdmin,
  body('name').notEmpty(),
  body('email').isEmail(),
  body('mobile').matches(/^\+?[0-9\- ]{7,20}$/),
  body('password').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { name, email, mobile, password } = req.body;
    const exists = await Agent.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Agent email already exists' });
    const hashed = await bcrypt.hash(password, 10);
    const agent = await Agent.create({ name, email, mobile, password: hashed, createdBy: req.user.id });
    res.status(201).json(agent);
  }
);
// List agents (Admin only)
router.get('/', auth, isAdmin, async (req, res) => {
  const agents = await Agent.find().sort({ createdAt: -1 });
  res.json(agents);
});
// Soft-delete agent (deactivate)
router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const agent = await Agent.findById(id);
    if (!agent) return res.status(404).json({ message: 'Agent not found' });
    agent.active = false;
    await agent.save();
    res.json({ message: 'Agent deactivated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
// Toggle active status
router.patch('/:id/toggle', auth, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const agent = await Agent.findById(id);
    if (!agent) return res.status(404).json({ message: 'Agent not found' });
    agent.active = !agent.active;
    await agent.save();
    res.json({ message: 'Agent status updated', active: agent.active });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
export default router;
