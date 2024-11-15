const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Adjust the path based on your project structure

// Middleware to protect routes based on role and country
const roleBasedAccessControl = (requiredRole) => {
  return async (req, res, next) => {
    try {
      // Extract token from headers
      const token = req.header('Authorization').replace('Bearer ', '');
      if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
      }

      // Verify the token and get user data
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      // Check if user has the required role (Admin or Viewer)
      if (requiredRole && user.role !== requiredRole) {
        return res.status(403).json({ message: 'Access denied. Insufficient privileges.' });
      }

      // Check if the user is accessing data within their assigned country
      if (user.role === 'Viewer' && user.country !== req.params.country) {
        return res.status(403).json({ message: 'Access denied. You are not allowed to access this country.' });
      }

      req.user = user;  // Attach user info to the request object
      next();
    } catch (error) {
      res.status(401).json({ message: 'Authentication failed' });
    }
  };
};

module.exports = { roleBasedAccessControl };
