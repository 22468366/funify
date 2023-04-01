const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Configure MySQL connection
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'denis',
  password: '12345678',
  database: 'funify',
    port: 3306
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// CREATE: Add a new donator
router.post('/donators', (req, res) => {
  const { name, salutation, country, email, tel, contact } = req.body;
  const query = 'INSERT INTO Donator (name, salutation, country, email, tel, contact) VALUES (?, ?, ?, ?, ?, ?)';

  connection.query(query, [name, salutation, country, email, tel, contact], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: results.insertId });
    }
  });
});

// READ: Get all donators
router.get('/donators', (req, res) => {
  connection.query('SELECT * FROM Donator', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
});

// READ: Get a specific donator by ID
router.get('/donators/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM Donator WHERE id = ?';

  connection.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'Donator not found' });
    } else {
      res.status(200).json(results[0]);
    }
  });
});

// UPDATE: Update a donator by ID
router.put('/donators/:id', (req, res) => {
  const id = req.params.id;
  const { name, salutation, country, email, tel, contact } = req.body;
  const query = 'UPDATE Donator SET name = ?, salutation = ?, country = ?, email = ?, tel = ?, contact = ? WHERE id = ?';

  connection.query(query, [name, salutation, country, email, tel, contact, id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Donator not found' });
    } else {
      res.status(200).json({ message: 'Donator updated' });
    }
  });
});

// DELETE:
// DELETE: Delete a donator by ID
router.delete('/donators/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM Donator WHERE id = ?';

  connection.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Donator not found' });
    } else {
      res.status(200).json({ message: 'Donator deleted' });
    }
  });
});

// Get all orders
router.get('/orders', (req, res) => {
  connection.query('SELECT * FROM `Order`', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

// Get order by ID
router.get('/orders/:id', (req, res) => {
  connection.query('SELECT * FROM `Order` WHERE order_ID = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results[0]);
  });
});

// Create new order
router.post('/orders', (req, res) => {
  const { transaction_date, item, qty, amount, name, address, email, tel, transaction_status, delivery_status } = req.body;
  connection.query('INSERT INTO `Order` (transaction_date, item, qty, amount, name, address, email, tel, transaction_status, delivery_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [transaction_date, item, qty, amount, name, address, email, tel, transaction_status, delivery_status], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send({ order_ID: results.insertId, ...req.body });
  });
});

// Update order by ID
router.put('/orders/:id', (req, res) => {
  const { transaction_date, item, qty, amount, name, address, email, tel, transaction_status, delivery_status } = req.body;
  connection.query('UPDATE `Order` SET transaction_date = ?, item = ?, qty = ?, amount = ?, name = ?, address = ?, email = ?, tel = ?, transaction_status = ?, delivery_status = ? WHERE order_ID = ?', [transaction_date, item, qty, amount, name, address, email, tel, transaction_status, delivery_status, req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send({ order_ID: req.params.id, ...req.body });
  });
});

// Delete order by ID
router.delete('/orders/:id', (req, res) => {
  connection.query('DELETE FROM `Order` WHERE order_ID = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send({ order_ID: req.params.id, message: 'Order deleted successfully.' });
  });
});

// Get all products
router.get('/products', (req, res) => {
  connection.query('SELECT * FROM `Product`', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

// Get product by ID
router.get('/products/:id', (req, res) => {
  connection.query('SELECT * FROM `Product` WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results[0]);
  });
});

// Create new product
router.post('/products', (req, res) => {
  const { item, amount } = req.body;
  connection.query('INSERT INTO `Product` (item, amount) VALUES (?, ?)', [item, amount], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send({ id: results.insertId, item, amount });
  });
});

// Update product by ID
router.put('/products/:id', (req, res) => {
  const { item, amount } = req.body;
  connection.query('UPDATE `Product` SET item = ?, amount = ? WHERE id = ?', [item, amount, req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send({ id: req.params.id, item, amount });
  });
});

// Delete product by ID
router.delete('/products/:id', (req, res) => {
  connection.query('DELETE FROM `Product` WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send({ id: req.params.id, message: 'Product deleted successfully.' });
  });
});


module.exports = router;
