import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import routes from './routes';

require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 5000;

// Set up Mongoose
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
.then(() => console.log('Database connected successfully'))
.catch(err => console.log(err));

// Setup CORS
app.use(cors());

// Setup API routes
routes(app);

// Setup error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  // Show stack trace in the development environment
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }
  res.status(500).send('Internal server error');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
