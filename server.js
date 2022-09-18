require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// security libraries
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const connectDb = require('./db/connect');

// Security
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
);
app.use(cors());
app.use(helmet());
app.use(xss());

app.use(express.json());
// Middleware
const ErrorHandlerMiddleware = require('./middleware/error-handling');
const NotFoundMiddleware = require('./middleware/route-not-found');
const AuthMiddleware = require('./middleware/authentication');

// Routes
const UserRoute = require('./routes/UserRoute');
const JobRoute = require('./routes/JobRoute');



app.use('/api/v1/auth', UserRoute);
app.use('/api/v1/job', AuthMiddleware, JobRoute);


app.use(NotFoundMiddleware);
app.use(ErrorHandlerMiddleware);


const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
}


start();