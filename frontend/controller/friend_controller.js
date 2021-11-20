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
        let friendslist = JSON.parse(Get(api));
        friendslist.forEach(obj => {
            let friend = getUserById(obj.frn_friend_user_id)
            friends.push({
                email: friend.email,
                amount: friend.reminders.length,
                profilePic: friend.profilePic
              })
    })


    let nonFriends = []
    api = `http://localhost:8080/auth/users`
    function Get(api){
        const getnonfriends = new XMLHttpRequest();
        getnonfriends.open("GET",api,false);
        getonfriends.send(null);
        return getnonfrends.responseText;
    }
    let userlist = JSON.parse(Get(api))[0];

    userlist.forEach( obj => {
      if (!(req.user.friends.includes(obj.id)) && 
      obj.id !== req.user.id) {
      let nonfriend = getUserById(obj.id)
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
    api = `http://localhost:8080/friends/${userid}`
    const xhr = new XMLHttpRequest();
    xhr.open("POST", api, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        "user_id":userid,
        "friend_id":newFriend
      })
      );
    res.redirect("/friends")
  }
}

module.exports = friendsController
