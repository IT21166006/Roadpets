// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const postRoutes = require('./routes/posts');
// const authRoute = require('./routes/userRoutes');
// const cookieParser = require("cookie-parser");
// import { notFound, errorHandler } from './middleware/errorMiddleware.js';


// dotenv.config();

// const app = express();
// app.use(cors({
//     origin: 'http://localhost:3000', // Allow requests from this frontend URL
//     credentials: true, // Allow credentials (cookies, authorization headers, etc.)
// }));

// app.use(express.json()); // Middleware to parse JSON bodies
// app.use('/uploads', express.static('uploads'));

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch((err) => {
//         console.error('Failed to connect to MongoDB:', err);
//         process.exit(1); // Exit the process if connection fails
//     });

// // Use routes
// app.use('/api/posts', postRoutes);
// app.use('/api/users', userRoutes);


// //cors config
// app.use(
//     cors({
//       origin: ["http://localhost:5000"],
//       methods: ["GET", "POST", "PUT", "DELETE"],
//       credentials: true,
//     })
//   );

// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));

// app.use(express.json());

// if (process.env.NODE_ENV === 'production') {
//     const __dirname = path.resolve();
//     app.use(express.static(path.join(__dirname, '/frontend/dist')));
  
//     app.get('*', (req, res) =>
//       res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
//     );
//   } else {
//     app.get('/', (req, res) => {
//       res.send('API is running....');
//     });
//   }
  
//   app.use(notFound);
//   app.use(errorHandler);


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import authRoute from './routes/userRoutes.js';
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from './Middlewares/errorMiddleware.js';

import path from 'path';

dotenv.config();

const app = express();

// CORS Configuration
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5000'], // Allow requests from multiple frontend URLs
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

// Middleware
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1); // Exit the process if connection fails
    });

// Use routes
app.use('/api/posts', postRoutes);
app.use('/api/users', authRoute); // Corrected route name

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    );
} else {
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
}

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
