const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const signUpRoutes = require('./routes/SignUp');
const productDataRoutes = require('./routes/ProductData');
const cartRoutes = require('./routes/CartRoutes');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5175' })); // Uses CLIENT_URL
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('API running');
});

app.use('/api', signUpRoutes);
app.use('/api', productDataRoutes);
app.use('/api/cart', cartRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});