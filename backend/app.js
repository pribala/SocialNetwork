const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes/posts');
const app = express();
const postRoutes = require('./routes/posts');
mongoose.connect('mongodb+srv://pri123:YMfsHnXqN8Oabt9a@cluster0.3kkrm.mongodb.net/socialNetwork?retryWrites=true&w=majority').then(
  () => {
    console.log('Connected to MongoDB');
  }
).catch( () => {
  console.log('Connection failed.');
});
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH,PUT, DELETE, OPTIONS');
  next();
});
app.use('/api/posts/', postRoutes);
module.exports = app;
