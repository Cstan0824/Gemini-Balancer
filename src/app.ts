import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {config} from './config/index';
import { middleware } from './middlewares'; 

const app = express();

const PORT = process.env.PORT || 3000;

//configuration 
config.init(app);


// Middlewares
middleware.init(app);


// Basic Route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Routes
// app.use('/api', require('./routes/api'));


// Error Routing

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});