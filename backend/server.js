require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const itemsRouter = require('./routes/items');
app.use('/api/items', itemsRouter);

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));