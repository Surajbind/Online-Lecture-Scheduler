const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};


const verifyAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Access restricted to admins only' });
  }
  next();
};


const verifyInstructor = (req, res, next) => {
  if (req.user?.role !== 'instructor') {
    return res.status(403).json({ message: 'Access restricted to instructors only' });
  }
  next();
};

module.exports = { verifyToken, verifyAdmin, verifyInstructor };
