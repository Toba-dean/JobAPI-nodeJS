require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const connectDb = require('./db/connect');

// Middleware
const ErrorHandlerMiddleware = require('./middleware/error-handling');
const NotFoundMiddleware = require('./middleware/route-not-found');

// Routes
const UserRoute = require('./routes/UserRoute');
const JobRoute = require('./routes/JobRoute');


app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ success: true, msg: "Hello America" });
});

app.use('/api/v1', UserRoute);
app.use('/api/v1', JobRoute);


app.use(NotFoundMiddleware);
app.use(ErrorHandlerMiddleware);


const start = async () => {
  try {
    // await connectDb(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
}


start();