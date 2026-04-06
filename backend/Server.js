require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const financeRoutes = require('./routes/finance');

const app = express();


// Middleware
app.use(express.json());


// CORS configuration (allows frontend to call backend)
const corsOptions = {
  origin: [
    'https://money-map-inky-three.vercel.app', // deployed frontend
    'http://localhost:3000' // local frontend
  ],
  credentials: true
};

app.use(cors(corsOptions));


// Database connection
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.error("Connection Error:", err);
  });


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/finance', financeRoutes);


// Test route (to check server)
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});


// Root route (optional)
app.get('/', (req, res) => {
  res.send('MoneyMap API running...');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});