const MongoClient = require('mongodb').MongoClient;
// const url = "mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.hmbbsqn.mongodb.net/?retryWrites=true&w=majority";
const url         = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/badbank';
let db            = null;
// const mongoose = require('mongoose');

 
// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to amanda db server");

    // connect to myproject database
    db = client.db('badbank');
});

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/badbank', { useNewUrlParser: true });

// connect to mongo
// mongoose.connect(url, {useUnifiedTopology: true,  useNewURLParser: true,}, function(err, client) {
//     console.log("Connected successfully to amanda db server");

//     // connect to myproject database
//     db = client.db('badbank');
// });

//create user account
function create(name, email, password) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        })
    })
}

// find user account
function find(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({ email: email })
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}


//find one user acccount
function findOne(email) {
    return new Promise((resolve, reject) => {
        const customers = db
        .collection('users')
        .findOne({email: email})
        .then((doc) => resolve(doc))
        .catch((err) => reject(err))
    })
}

//update after deposit or withdrawal
function update(email, amount) {
    return new Promise((resolve, reject) => {
        const customers = db
        .collection('users')
        .findOneAndUpdate(
            { email: email },
            { $inc: { balance: amount }}, 
            { returnOriginal: false },
            function(err, documents) {
                err ? reject(err) : resolve(documents);
            }
        );
    });
}

//all users
function all() {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
            });
    })
}

module.exports = {create, find, findOne, update, all};