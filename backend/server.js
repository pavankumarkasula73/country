const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize the app
const app = express();

// Middleware
app.use(express.json()); // For parsing JSON bodies
app.use(cors()); // For handling CORS

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Import routes
const userRoutes = require('./routes/userRoutes'); // Routes for user authentication
const countryRoutes = require('./routes/countryRoutes'); // Routes for handling countries and data

// Use routes
app.use('/api/users', userRoutes); // User routes
app.use('/api', countryRoutes); // Country routes for CRUD operations

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
