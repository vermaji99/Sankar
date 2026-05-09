require('dotenv').config({ override: true });
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const leadRoutes = require('./routes/leadRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/leads', leadRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Lead Management API' });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

server.on('close', () => {
  console.log('Server closed');
});

process.on('exit', (code) => {
  console.log(`Process exiting with code: ${code}`);
});

// Keep process alive in sandbox environment
setInterval(() => {
  // dummy keep-alive
}, 60000);
