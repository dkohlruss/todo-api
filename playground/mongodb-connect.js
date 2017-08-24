// Object destructuring -- This pulls these out into variables
const {MongoClient, ObjectID} = require('mongodb');
// const MongoClient = require('mongodb').MongoClient;

let obj = new ObjectID();
console.log(obj);
// This will print out a new object ID.

// Object destructuring example:
let blob = {name: "tane"};
let {name} = blob;
console.log(name); // This will print out 'tane'.

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log(`Connection failed with error: ${err}`);
  }
  console.log(`Connected to MongoDB server`);

  // This inserts one object into the collection given

  // db.collection('Todos').insertOne({
  //   text: 'Something to do!',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });
  //
  // db.collection('Users').insertOne({
  //   name: 'David',
  //   age: 32,
  //   location: 'Calgary'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert user', err);
  //   }
  //
  //   console.log(result.ops[0]._id.getTimestamp());
  // });

  db.close();
});
// in production 1st arg will be the aws or heroku url or whatever
// 2nd arg is going to be a success/fail handler
