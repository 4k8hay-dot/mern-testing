/**
 * Learning-only demo of insecure patterns.
 * DO NOT deploy this code in a real project.
 * This file exists only to show common weaknesses and explain how to fix them.
 */

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

app.get('/', (req, res) => {
  res.send(`
    Server is running.
    Node version: ${process.version}
    Env: ${process.env.NODE_ENV}
  `);
});

app.get('/debug', (req, res) => {
  // Unsafe: exposes all environment variables.
  res.json({ env: process.env });
});

app.get('/search', (req, res) => {
  const q = req.query.q || '';

  // Unsafe: reflected XSS example.
  res.send(`<h1>Search results for: ${q}</h1>`);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Unsafe: no validation, no hashing, no rate limits.
  res.json({
    message: 'Login successful (demo only)',
    data: { email, password }
  });
});

app.get('/admin', (req, res) => {
  const token = req.query.token || '';

  // Unsafe: insecure access control based only on a query parameter.
  if (token === 'admin') {
    res.json({ admin: true, secret: 'super-secret-value' });
  } else {
    res.status(401).json({ message: 'Access denied' });
  }
});

app.get('/eval-demo', (req, res) => {
  const code = req.query.code || '1 + 1';

  // Unsafe: arbitrary code execution.
  res.json({ result: eval(code) });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Unsafe demo running on port ${PORT}`);
});

module.exports = app;
