var express = require('express');
var app = express();
var cors = require('cors');
var dal = require('./dal.js');
// const mongoose = require('mongoose');
require('dotenv').config();

// mongoose
//   .connect("mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.hmbbsqn.mongodb.net/?retryWrites=true&w=majority",
//   {
//     useNewURLParser: true,
//     useUnifiedTopology: true,
//   }
//   )
//   .then(() => console.log('MongoDB is connected'))
//   .catch((error) => console.log(error));


app.use(express.static('public'));
app.use(cors());


//create account
app.post('/account/create/:name/:email/:password', function (req, res) {
  dal
    .create(req.params.name, req.params.email, req.params.password)
    .then((user) => {
      console.log(user);
      res.send(user);
    });
});

//login
app.get('/account/login/:email/:password', (req, res) => {
  dal.find(req.params.email).then((user) => {
    if (user.length > 0) {
      if (user[0].password === req.params.password) {
        res.send(user[0]);
      } else {
        res.send('Incorrect password');
      }
    } else {
      res.send('Email not found');
    }
  });
});

//find account
app.get('/account/find/:email', (req, res) => {
 
  dal.find(req.params.email).then((user) => {
    console.log(user);
    res.send(user);
  });
});

//find one
app.get('/account/findOne/:email', (req, res) => {
  console.log(req.params);
  dal.findOne(req.params.email).then((user) => {
    console.log(user);
    res.send(user);
  });
});

//update after deposit or withdrawal
app.get('/account/update/:email/:amount', (req, res) => {
  var amount = Number(req.params.amount);
  dal.update(req.params.email, amount).then((response) => {
    console.log(response);
    res.send(response);
  });
});

//all accounts
app.get('/account/all', (req, res) => {
  dal.all().then((docs) => {
    console.log(docs);
    res.send(docs);
  });
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`running on port: ${PORT}`));
