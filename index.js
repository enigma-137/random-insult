const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const insults = require('./insults.json');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Rate limiting: max 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { status: 'error', message: 'Too many requests, please try again later.' },
});
app.use(limiter);

// Basic logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Welcome to the Mecha Swagger Insult API! Use /docs for usage info.',
  });
});

// API documentation
app.get('/docs', (req, res) => {
  res.json({
    status: 'success',
    message: 'Mecha Swagger Insult API Documentation',
    endpoints: {
      '/': 'Get API welcome message',
      '/insults': 'Get all insults',
      '/insults?filter=:keyword': 'Filter insults by keyword (e.g., "moron")',
      '/random-insult': 'Get a random insult',
    },
    example: {
      url: '/random-insult',
      response: { insult: 'You’re the reason the gene pool needs a lifeguard.' },
    },
  });
});

// Get all insults with optional filtering
app.get('/insults', (req, res) => {
  const filter = req.query.filter?.toLowerCase();
  if (filter) {
    const filteredInsults = insults.filter((insult) =>
      insult.toLowerCase().includes(filter)
    );
    if (filteredInsults.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: `No insults found with keyword: ${filter}`,
      });
    }
    return res.json({
      status: 'success',
      data: filteredInsults,
      count: filteredInsults.length,
    });
  }
  res.json({
    status: 'success',
    data: insults,
    count: insults.length,
  });
});

// Get a random insult
app.get('/random-insult', (req, res) => {
  const randomInsult = insults[Math.floor(Math.random() * insults.length)];
  res.json({
    status: 'success',
    data: randomInsult,
  });
});

// Error handling for invalid routes
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found. Check /docs for available endpoints.',
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong on the server.',
  });
});

// Start server
app.listen(port, () => {
  console.log(`Mecha Swagger Insult API running on port ${port}`);
});
