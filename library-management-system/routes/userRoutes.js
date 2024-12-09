const express = require('express');
const router = express.Router();
const dbHelper = require('../models/dbHelper');

router.get('/api/books', async (req, res) => {
  try {
    const books = await dbHelper.getAllBooks();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/api/borrow-requests', async (req, res) => {
  const { user_id, book_id, start_date, end_date } = req.body;
  try {
    const requestId = await dbHelper.addBorrowRequest(user_id, book_id, start_date, end_date);
    res.status(201).json({ requestId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
