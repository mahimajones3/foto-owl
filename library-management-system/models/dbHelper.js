const db = require('../db/database');
const bcrypt = require('bcryptjs');

module.exports = {
  addUser: async (email, password, role) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO users (email, password, role) VALUES (?, ?, ?)`,
        [email, hashedPassword, role],
        function (err) {
          if (err) return reject(err);
          resolve(this.lastID);
        }
      );
    });
  },

  getUserByEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  },

  addBook: (title, author, quantity) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO books (title, author, quantity) VALUES (?, ?, ?)`,
        [title, author, quantity],
        function (err) {
          if (err) return reject(err);
          resolve(this.lastID);
        }
      );
    });
  },

  getAllBooks: () => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM books WHERE quantity > 0`, [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  },

  addBorrowRequest: (user_id, book_id, start_date, end_date) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO borrow_requests (user_id, book_id, start_date, end_date) VALUES (?, ?, ?, ?)`,
        [user_id, book_id, start_date, end_date],
        function (err) {
          if (err) return reject(err);
          resolve(this.lastID);
        }
      );
    });
  },
};
