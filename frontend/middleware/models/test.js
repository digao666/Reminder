const http = require("http")

email = "test2@abc.com"
id = 2

http.get(`http://localhost:8080/auth/user/email/${email}`,resp =>{
    let data = "";
    resp.on("data",chunk =>{
        data += chunk
    let userbyemail = JSON.parse(data)[0]
        console.log(userbyemail.email)
    return userbyemail
    })})

http.get(`http://localhost:8080/auth/user/${id}`,resp =>{
    let data = "";
    resp.on("data",chunk =>{
        data += chunk
    let userbyid = JSON.parse(data)[0]
        console.log(userbyid.id)
    return userbyid
    })})