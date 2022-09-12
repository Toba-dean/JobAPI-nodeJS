require('dotenv').config();
require('express-async-errors');

const express = require('express');
const connectDb = require('./db/connect');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).send("Hello America");
});


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