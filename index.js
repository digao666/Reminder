const express = require("express");
const path = require("path");
const session = require("express-session");
const ejsLayouts = require("express-ejs-layouts");
const app = express();

require('dotenv').config()

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.json());
app.set("view engine", "ejs");

app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,
        },
    })
);

// Middleware for passport
const passport = require("./middleware/passport");
app.use(passport.initialize());
app.use(passport.session());

// Routes start here
const authRoute = require("./routes/authRoute");
const indexRoute = require("./routes/indexRoute");
// Routes to login an authenticated user pages
app.use("/", indexRoute)
app.use("/auth", authRoute)

app.listen(3001, function() {
    console.log(
        "Server running. Visit: https://localhost:3001/reminders in your browser 🚀"
    );
});