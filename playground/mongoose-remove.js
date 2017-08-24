const {mongoose} = require('./../server/db/mongoose');
const {ObjectID} = require('mongodb');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

const id = '58c324ba624afa1944a2ec5b';

//Todo.remove({}) -- Removes all
// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove({
//    name: whatever
// }).then(.....) -- Removed item gets returned
//Todo.findByIdAndRemove({id}) -- Removed item gets returned

Todo.findByIdAndRemove('58c5e1e675d51a5f17be6027').then((todo) => {
  console.log(todo);
});
