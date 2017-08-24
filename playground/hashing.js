const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = '123abc!';

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
      console.log(hash);
  });
});

var hashedPassword = '$2a$10$eZ.oPGUJpzKhI98h7klgweekaGXJ898ZQVPyA/OdbKQeQ66WOnN9W';

bcrypt.compare(password, hashedPassword, (err, result) => {
  console.log(result);
});


// let message = 'I am user';
// let hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
//
// let password = '123abc!';
//
// let data = {
//   id: 4
// };
// let token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };
//
// let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if (resultHash === token.hash) {
//   console.log('blarg!');
// } else {
//   console.log('data changed');
// }
//
// // JSON Web Token standard ^^^

// let data = {
//   id: 10
// };
//
// let token = jwt.sign(data, '123abc'); // creates hash
//
// let decoded = jwt.verify(token, '123abc'); // verifies hash
// console.log(decoded);
