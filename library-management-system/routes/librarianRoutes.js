const express = require('express');
const router = express.Router();
const dbHelper = require('../models/dbHelper');
const basicAuth = require('basic-auth');

const authenticateLibrarian = async (req, res, next) => {
  const credentials = basicAuth(req);
  if (!credentials) return res.status(401).send('Access denied.');

  const user = await dbHelper.getUserByEmail(credentials.name);
  if (user && user.role === 'Librarian' && await bcrypt.compare(credentials.pass, user.password)) {
    req.user = user;
    return next();
  }

  res.status(403).send('Unauthorized.');
};

router.post('/api/users', authenticateLibrarian, async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const userId = await dbHelper.addUser(email, password, role);
    res.status(201).json({ userId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
