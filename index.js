const express = require('express');
const app = express();
const landing = require('./routes/landing');


app.use(express.json());
app.listen(3000, function () {
    console.log('listening on port 3000');
  });
app.use('/landing', landing);

module.exports = app;