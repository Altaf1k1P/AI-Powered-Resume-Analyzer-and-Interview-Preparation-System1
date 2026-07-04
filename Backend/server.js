const express = require('express');
const cors = require('cors');
const mongoose = require(mongoose);
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5005;
const MONGO_URI = process.env.MONGO_URI  

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI)
.then(
  ()=>{
    console.log('Successfully connected to MongoDB')
  }
)
.catch(
  (err)=>{
    console.error('MongoDB connection error:',err)
  }
)

// Basic test route
app.get('/', (req, res) => {
  res.send('Resume Analyzer Backend API is running!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});