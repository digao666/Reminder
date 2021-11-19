const getUserById = require('./userController.js').getUserById
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

let friendsController = {
  list: (req, res) => {
    userid = req.user.id
    let friends = []
    api = `http://localhost:8080/friends/${userid}`
        function Get(api){
            const getfriends = new XMLHttpRequest();
            getfriends.open("GET",api,false);
            getfriends.send(null);
            return getfriends.responseText;
        }
    let friendid = JSON.parse(Get(api))[0];

    friendid.forEach(friends => {
      let friend = getUserById(friendid)
      friends.push({
        email: friend.email,
        amount: friend.reminders.length,
        profilePic: friend.profilePic
      })
    })

    let nonFriends = []
    api = `http://localhost:8080/auth/user/all`
    function Get(api){
        const getnonfriends = new XMLHttpRequest();
        getnonfriends.open("GET",api,false);
        getonfriends.send(null);
        return getnonfrends.responseText;
    }

    let userlist = JSON.parse(Get(api))[0];
    userlist.forEach(nonFriends => {(
      if (!(req.user.friends.includes(userlist)) && 
      userlist !== req.user.id) {
        nonFriends.push({
          email: nonfriend.email,
          amount: nonfriend.reminders.length,
          id: nonfriend.id,
          profilePic: nonfriend.profilePic
        })
      }
    })
    res.render("friend/friends", { friends: friends, nonFriends: nonFriends, profilePic: req.user.profilePic})
  },

  add: (req, res) => {
    newFriend = parseInt(req.body.idFriend)
    api = `http://localhost:8080/friend/${user.id}`
    const xhr = new XMLHttpRequest();
    xhr.open("POST", api, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      friendid:newFriend
      }));

    res.redirect("/friends")
  }
}

module.exports = friendsController
