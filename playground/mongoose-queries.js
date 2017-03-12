const {mongoose} = require('./../server/db/mongoose');
const {ObjectID} = require('mongodb');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

const id = '58c324ba624afa1944a2ec5b';

if (!ObjectID.isValid(id)) {
  console.log('ID is not valid');
}

// Todo.find({
//   _id: id // Mongoose will take care of identifying this string as an ObjectID
// }).then((todos) => {
//   console.log(`Todos:` + todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log(`Todo:` + todo);
// });


// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('ID not found');
//   }
//   console.log('Find by Id: ' + todo);
// }).catch((e) => {
//   console.log(e);
// });

User.findById(id).then((user) => {
  if (!user) {
    return console.log('User not found');
  }

  console.log('User: ' + user);
}, (e) => {
  console.log(e);
});
