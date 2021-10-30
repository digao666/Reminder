const getUserById = require('./userController.js').getUserById
const database = require('../database')

let friendsController = {
  list: (req, res) => {
    // User's current friends
    let friends = []
    req.user.friends.forEach( friend => {
      let user = getUserById(friend)
      friends.push({
        email: user.email,
        amount: user.reminders.length,
        profilePic: user.profilePic
      })
    })

    // People user can add
    let nonFriends = []
    database.forEach( user => {
      if (!(req.user.friends.includes(user.id)) && 
      user.id !== req.user.id) {
        nonFriends.push({
          email: user.email,
          amount: user.reminders.length,
          id: user.id,
          profilePic: user.profilePic
        })
      }
    })
    res.render("friend/friends", { friends: friends, nonFriends: nonFriends, profilePic: req.user.profilePic})
  },

  add: (req, res) => {
    newFriend = parseInt(req.body.idFriend)
    req.user.friends.push(newFriend)
    res.redirect("/friends")
  }
}

module.exports = friendsController