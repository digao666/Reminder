const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

email = "test2@abc.com"

url = `http://localhost:8080/auth/user/email/${email}`
function Get(url){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",url,false);
    Httpreq.send(null);
    return Httpreq.responseText;
}
let userbyemail = JSON.parse(Get(url))[0];
console.log(user.email);