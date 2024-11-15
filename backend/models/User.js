const mongoose = require('mongoose');

// Define the schema for the user
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  country: { type: String, required: true }, // This will store the country the user is associated with
  role: { type: String, enum: ['Admin', 'Viewer'], required: true }, // Role-based access
});

// Create the model using the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
