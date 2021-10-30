const database = require("../database");

const userModel = {
    findOne: (email) => {
        for (let person in database) {
            let user = database[person]
            if (user.email === email) {
                return user;
            }
        }
        return null
    },

    findById: (id) => {
        for (let person in database) {
            let user = database[person]
            if (user.id === id) {
                return user;
            }
        }
        return null
    },
}

module.exports = { userModel };