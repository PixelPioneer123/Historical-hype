import { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { signToken } from "../utils/token.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

function toPublicUser(u) {
  return { id: u._id.toString(), email: u.email, name: u.name, role: u.role, tonPoints: u.tonPoints };
}

// POST /api/auth/register
router.post("/register", async (req, res) => {
  const { email, password, name, role = "customer" } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: "email, password, and name are all required." });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters." });
  }
  if (!["customer", "seller"].includes(role)) {
    return res.status(400).json({ error: "role must be 'customer' or 'seller'." });
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    return res.status(409).json({ error: "An account with that email already exists." });
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const user = await User.create({ email: email.toLowerCase(), passwordHash, name, role });

  const token = signToken({ sub: user._id.toString(), email: user.email, role: user.role });
  res.status(201).json({ token, user: toPublicUser(user) });
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required." });
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  const valid = bcrypt.compareSync(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  const token = signToken({ sub: user._id.toString(), email: user.email, role: user.role });
  res.json({ token, user: toPublicUser(user) });
});

// GET /api/auth/me — restore session using the stored token
router.get("/me", requireAuth, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ error: "User not found." });
  res.json({ user: toPublicUser(user) });
});

export default router;
