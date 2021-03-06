const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const userModel = {
    findOne: (email) => {
        api = `http://localhost:8080/auth/user/email/${email}`
        function Get(api){
            const Httpreq = new XMLHttpRequest();
            Httpreq.open("GET",api,false);
            Httpreq.send(null);
            return Httpreq.responseText;
        }
        if (Get(api) != '[]') {
            let userbyemail = JSON.parse(Get(api))[0]
            if (userbyemail.email === email){
                return userbyemail;
            }
            return null
        }
        return null
    },

    findById: (id) => {
        api = `http://localhost:8080/auth/user/${id}`
        function Get(api){
            const Httpreq = new XMLHttpRequest();
            Httpreq.open("GET",api,false);
            Httpreq.send(null);
            return Httpreq.responseText;
        }
        let userbyid = JSON.parse(Get(api))[0];

        if (userbyid.id === id){
            return userbyid;
            }
        return null
    },
}

module.exports = { userModel };
