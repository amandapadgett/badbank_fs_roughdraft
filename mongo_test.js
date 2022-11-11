const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log('connected to amandas database')

    //database name
    const dbName = 'badbanktrial';
    const db = client.db(dbName);

    //new user
    var name = 'user' + Math.floor(Math.random()*10000);
    var email = name + '@mit.edu';

    //insert into user table
    var collection = db.collection('users');
    var doc = {name, email};
    collection.insertOne(doc, {w:1}, function(err, result) {
        console.log('Document insert');
    });

    var users = db
        .collection('users')
        .find()
        .toArray(function(err,docs) {
            console.log('Collection:', docs)

            //clean up
            client.close();
        })
});