import express from 'express';
import mongoose from 'mongoose';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
.then(() => console.log('Database connected successfully'))
.catch(err => console.log(err));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use((req, res, next) => {
  res.send('Welcome to Express');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
