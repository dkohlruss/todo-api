const {MongoClient, ObjectID} = require('mongodb');
// const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log(`Connection failed with error: ${err}`);
  }
  console.log(`Connected to MongoDB server`);

  // db.collection('Todos')
  //   .findOneAndUpdate({
  //     _id: new ObjectID('58c2fe6c75d51a5f17bdebb5')
  //   }, {
  //     $set: {
  //       completed: true
  //     }
  //   }, {
  //     returnOriginal: false
  //   }).then((result) => {
  //     console.log(result);
  //   });

  db.collection('Users')
    .findOneAndUpdate({
      _id: new ObjectId('58c2f560ff2e721b68087367')
    }, {
      $set: {
        name: 'David'
      },
      $inc: {
        age: 1
      }
    },{
      returnOriginal: false
    }).then((result) => {
      console.log(result);
    });

  // db.close();
});
