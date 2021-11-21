const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const router = express.Router();

//Unsplash setup
const fetch  = require("node-fetch")
const { createApi } =require("unsplash-js");
const { emit } = require("nodemon");

global.fetch = fetch;
const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS,
  fetch: fetch
})

const randomAnimals = ["dog", "cat", "wolf", "bird", "fennec"]

const randomAnimal = () => {
  return randomAnimals[Math.floor(Math.random() * randomAnimals.length)];
}

// Login routes
router.get("/login", forwardAuthenticated, (req, res) => {
  let failure = req.query.failed
  res.render("auth/login", { failed: failure });
})
router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/reminder/index",
        failureRedirect: "/auth/login?failed=true",
    })
);

// Register routes
router.get("/register", forwardAuthenticated, (req, res, next) => { 
  res.render("auth/register", { email: req.query.email, exists: undefined })
})
router.post(
  "/register",
  (req, res) => {
    const email = req.body.email

    // check user exist or not
    api = `http://localhost:8080/auth/user/email/${email}`
    function Get(api){
        const Httpreq = new XMLHttpRequest();
        Httpreq.open("GET",api,false);
        Httpreq.send(null);
        return Httpreq.responseText;
    }
    let userbyemail = JSON.parse(Get(api))[0];
    if (typeof userbyemail !== "undefined") {
      res.render("auth/register", { exists: true, email: undefined })
      } else {
      unsplash.photos.getRandom({
        query: randomAnimal(),
        featured: true
      }).then(result => {
        switch (result.type) {
          case 'error':
            console.log('unsplash error occurred: ', result.errors[0]);
          case 'success':
            const photo = result.response;
            photoSmall = photo.urls.full + '&h=120'
            const password = req.body.password
            currDate = new Date()
            const id = currDate.getTime()

            //register api starts here

            let Post =(api,data)=>{
              const xhr = new XMLHttpRequest();
              xhr.open("POST", api, true);
              xhr.setRequestHeader('Content-Type', 'application/json');
              xhr.send(JSON.stringify(data));
          }

            const api=`http://localhost:8080/auth/user`;

            let newuser = {data:{
              id: id, 
              email: email, 
              password: password, 
              reminders: [], 
              friends: [],
              profilePic: photoSmall
              }};

            Post(api,newuser)
            // register api end



            res.redirect("/auth/login")
        }
      })
      
    }
  }
)

// logout
router.get("/logout", (req, res) => {
      req.logout();
      res.redirect("/auth/login");
});


module.exports = router;
