const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const { readdirSync } = require('fs');
require('dotenv').config();

//datebase
// db connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log('DB Connection Error: ', err));

// use express
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Route middlewares
// auto read routes files
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));

// server testing
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

//server run
const port = process.env.PORT || 5000;
app.listen(port, (err) =>
  err
    ? console.log(err)
    : console.log(`server is running on http://localhost:${port}`)
);
