const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log("the hashed and salted pw is : " + hash);
//   })
// 
// });

let hashedPassword = '$2a$10$WAw8dFaT6rRNiEQ/w6GUb.lH96lsNglQrfg5yDoFR7ITjqGGZZUQm';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log('response is: ' + res);
});

//bcrypt.genSalt(rounds to generate salt... slows down on purpose, callback)

// var data = {
//   id: 10
// }
//
// var token = jwt.sign(data, '123abc');
// console.log(token);
//
// var decoded = jwt.verify(token, '123abc');
// console.log(decoded);

// ====

// let message = 'I am user number 3';
//
// let hash = SHA256(message).toString();
//
// console.log(`hash: ${hash}`);
// console.log(`message: ${message}`);
//
// var data = {
//   id: 4
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + `somesecretsalt`).toString()
// };
//
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(data)).toString();
//
// var resultHash = SHA256(JSON.stringify(token.data) + `somesecretsalt`).toString();
//
// if (resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed, don\'t trust');
// }
