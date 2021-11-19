const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function add() {
    let userid = 2
    newFriend = 3
    api = `http://localhost:8080/friends/${userid}`
    const xhr = new XMLHttpRequest();
    xhr.open("POST", api, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        "user_id":userid,
        "friend_id":newFriend
      })
      );
}
add()

// function list() {
//     let userid = 1
//     api = `http://localhost:8080/friends/${userid}`
//         function Get(api){
//             const getfriends = new XMLHttpRequest();
//             getfriends.open("GET",api,false);
//             getfriends.send(null);
//             return getfriends.responseText;
//         }
//     let friendid = JSON.parse(Get(api))[0];
//         friendid.forEach(friends => {
//         friend.email = "123"
//         friend.reminders = [1,2,3]
//         friend. profilePic = "123"
//       friends.push({
//         email: friend.email,
//         amount: friend.reminders.length,
//         profilePic: friend.profilePic
//       })
//     })
// }

// list()