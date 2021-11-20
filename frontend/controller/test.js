const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// function add() {
//     let userid = 1
//     newFriend = 7
//     api = `http://localhost:8080/friends/${userid}`
//     const xhr = new XMLHttpRequest();
//     xhr.open("POST", api, true);
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.send(JSON.stringify({
//         "user_id":userid,
//         "friend_id":newFriend
//       })
//       );
// }
// add()

function list() {
    api = `http://localhost:8080/auth/users`
        function Get(api){
            const getfriends = new XMLHttpRequest();
            getfriends.open("GET",api,false);
            getfriends.send(null);
            return getfriends.responseText;
        }
    let userlist = Get(api);
    console.log(typeof userlist)
    }
    //     friendslist.forEach(obj => {
    //         let friend = getUserById(obj.frn_friend_user_id)
    //         friends.push({
    //             email: friend.email,
    //             amount: friend.reminders.length,
    //             profilePic: friend.profilePic
    //           })
    //     friend.email = "123"
    //     friend.reminders = [1,2,3]
    //     friend. profilePic = "123"
    //   friends.push({
    //     email: friend.email,
    //     amount: friend.reminders.length,
    //     profilePic: friend.profilePic
    //   })
    // })
    // console.log(friends)
// }

list()