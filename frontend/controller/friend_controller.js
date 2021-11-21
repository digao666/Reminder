const getUserById = require('./userController.js').getUserById
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;



let friendsController = {
  
  list: (req, res) => {

    friendapi = `http://localhost:8080/friends/${req.user.id}`
    userlistapi = `http://localhost:8080/auth/users`
    Get = (api) => {
      const xhr =  new XMLHttpRequest();
      xhr.open("GET",api,false);
      xhr.send(null);
      return xhr.responseText;

}
    let friends = []
    let friendslist = JSON.parse(Get(friendapi));
    friendslist.forEach(obj => {
        let friend = getUserById(obj.frn_friend_user_id)
        friends.push({
            email: friend.email,
            //amount: friend.reminders.length,
            profilePic: friend.profilePic
          })
    })

    let nonFriends = []
    let userlist = JSON.parse(Get(userlistapi))[0];
    userlist.forEach( obj => {
        if (!(friendslist.includes(obj.id)) && 
        obj.id !== req.user.id) {
        let nonfriend = getUserById(obj.id)
          nonFriends.push({
            email: nonfriend.email,
            // amount: nonfriend.reminders.length,
            id: nonfriend.id,
            profilePic: nonfriend.profilePic
        })
      }
    })
    res.render("friend/friends", { friends: friends, nonFriends: nonFriends, profilePic: req.user.profilePic})
  },

  add: (req, res) => {
    friendapi = `http://localhost:8080/friends/${req.user.id}`
    newFriend = parseInt(req.body.idFriend)
    const addfriend = new XMLHttpRequest();
    addfriend.open("POST", friendapi, true);
    addfriend.setRequestHeader('Content-Type', 'application/json');
    addfriend.send(JSON.stringify({
        "user_id":req.user.id,
        "friend_id":newFriend
      })
      );
    res.redirect("/friends")
  }
}

module.exports = friendsController
