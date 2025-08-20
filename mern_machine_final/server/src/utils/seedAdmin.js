import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
(async () => {
  await connectDB(process.env.MONGO_URI);
  const email = process.env.ADMIN_EMAIL;
  const exists = await User.findOne({ email });
  if (!exists) {
    const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    await User.create({
      name: process.env.ADMIN_NAME || 'Your Name',
      email,
      mobile: process.env.ADMIN_MOBILE || '',
      password: hashed,
      role: 'admin'
    });
    console.log('✅ Seeded default admin:', email);
  } else {
    console.log('ℹ️ Admin already exists:', email);
  }
  process.exit(0);
})();
