const express = require('express');
const mongoose = require('mongoose');
const courseRouter = require('./routes/courseRouter');

const app = express();

// Middleware to parse JSON data
app.use(express.json());


mongoose.connect('mongodb://127.0.0.1:27017/udemy-clone')
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB:', err));

// Mount the router middleware
app.use('/api/courses', courseRouter);

// Server starts
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});