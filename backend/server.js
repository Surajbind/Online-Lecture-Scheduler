const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const adminRoutes = require('./routes/adminRoutes');
const instructorRoutes = require('./routes/instructorRoutes');

const authRoutes = require('./routes/authRoutes'); 

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


connectDB();


app.use(cors());
app.use(bodyParser.json());


app.use('/api/auth', authRoutes);


app.use('/api/admin', adminRoutes);
app.use('/api/instructor', instructorRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({ message: err.message || 'An unexpected error occurred' });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});