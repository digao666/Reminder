const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
email='cindy2213@123.com'
password='123'
photoSmall='123'

const xhr = new XMLHttpRequest();
const api=`http://localhost:8080/auth/user`;
xhr.open("POST", api, true);
xhr.setRequestHeader('Content-Type', 'application/json');

// const newuser = {
//   "email": email, 
//   "password": password, 
//   "profilePic": photoSmall
// }

// data = JSON.stringify(newuser)
// xhr.send(data)
currDate = new Date()
const id = currDate.getTime()
xhr.send(JSON.stringify({
  id:id,
  email: email, 
  password: password, 
  reminders: [], 
  friends: [],
  profilePic: photoSmall
})
)