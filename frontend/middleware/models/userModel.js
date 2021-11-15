const http = require("http");

const userModel = {
    findOne: (email) => {
        
        http.get(`http://localhost:8080/auth/user/email/${email}`,resp =>{
            let data = "";
            resp.on("data",chunk =>{
                data += chunk
                let userbyemail = JSON.parse(data)[0]
                return userbyemail
            })
        })

        if (userbyemail.email === email){
                return userbyemail;
            }
        return null
    },

    findById: (id) => {
        
        http.get(`http://localhost:8080/auth/user/${id}`,resp =>{
        let data = "";
            resp.on("data",chunk =>{
                data += chunk
                let userbyid = JSON.parse(data)[0]
                return userbyid
            })
        })

        if (userbyid.id === id) {
                return userbyid;
            }
        return null
}
}

module.exports = { userModel };