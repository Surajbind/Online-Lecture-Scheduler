const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); 
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  try {

    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(404).json({ message: 'User not found. Check your credentials.' });
    }

  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

 
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed. Try again.', error: error.message });
  }
});


//used it once to register the admin
// router.post('/register', async (req, res) => {
//   const { name, email, password, role } = req.body;
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     const newUser = new User({ name, email, password: hashedPassword, role });
//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to register user', error: error.message });
//   }
// });
module.exports = router;
