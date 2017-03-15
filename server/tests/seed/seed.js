const {ObjectID} = require('mongodb');
const {Todo} = require('../../models/todo');
const {User} = require('../../models/user');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo',
  completed: false,
  _creator: userOneId
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333,
  _creator: userTwoId
}];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
  return Todo.insertMany(todos);
}).then(() => done());
};

//user1 has valid auth, user2 does not
const users = [{
  _id: userOneId,
  email: 'user1@gmail.com',
  password: 'dogtime',
  tokens: [{
    access: 'auth',
    token: jwt.sign({
      _id: userOneId,
      access: 'auth'
    }, 'abc123').toString()
    }]
  },
  {
  _id: userTwoId,
  email: 'user2@gmail.com',
  password: 'dogtime',
  tokens: [{
    access: 'auth',
    token: jwt.sign({
      _id: userTwoId,
      access: 'auth'
    }, 'abc123').toString()
    }]
  }
];

const populateUsers = (done) => {
  User.remove({}).then(() => {
    let userOne = new User(users[0]).save();
    let userTwo = new User(users[1]).save();

    // promise.all takes in array of promises and waits for them to resolve
    return Promise.all([userOne, userTwo]);
  }).then(() => {
    done();
  });
};


module.exports = {
  todos,
  populateTodos,
  users,
  populateUsers
}
