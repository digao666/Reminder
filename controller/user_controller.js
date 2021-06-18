let database = require("../database");

let userController = {
  findByEmail: (email) => {
  for (let name in database) {
    if (database[name].email === email) {
      return database[name]
    }
  }
  throw new Error(`Couldn't find user with email: ${email}`);
},

  findById : (id) => {
  const user = database.find((user) => user.id === id);
  if (user) {
    return user;
  }
  throw new Error(`Couldn't find user with id: ${id}`);
},

  getUserByEmailIdAndPassword : (email, password) => {
  let user = userController.findByEmail(email);
  if (user) {
    if (userController.isUserValid(user, password)) {
      return user;
    }
  }
  return null;
} ,

  getUserById : (id) => {
  let user = userController.findById(id);
  if (user) {
    return user;
  }
  return null;
},

  isUserValid: (user, password) => {
  return user.password === password;
},
}

module.exports = userController;
