require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Student Assignment Management API is running');
});

async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is missing from the backend .env file');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas');

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Could not connect to MongoDB:', error.message);
    process.exit(1);
  }
}

startServer();