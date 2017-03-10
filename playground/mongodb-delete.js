const {MongoClient, ObjectID} = require('mongodb');
// const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log(`Connection failed with error: ${err}`);
  }
  console.log(`Connected to MongoDB server`);

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // },(err) => {
  //   console.log(err);
  // }) ;

  // // deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed:false})
  // .then((result) => {
  //   console.log(result);
  //   return result;
  // });

  db.collection('Users')
    .deleteMany({name: 'David'})
    .then((result) => {
      console.log(result);
    });

  db.collection('Users')
    .findOneAndDelete({_id: new ObjectID('58c2f64a0356ae0d8036f074')})
    .then((result) => {
      console.log(result);
    });

  // db.close();
});
