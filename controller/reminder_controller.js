const getUserById = require('./userController.js').getUserById
const formatRelative = require('date-fns/formatRelative')

const formatSubtasks = (body) => {
    let subtasks = []
    //Takes req.body and returns formatted subtasks in a list of objects
    Object.keys(body).forEach(key => {
        if (parseInt(key) == key){
            let currSubtask = {id: key}
            if (Array.isArray(body[key])){
                currSubtask["title"] = body[key][0]
                currSubtask["completed"] = true
            } else {
                currSubtask["title"] = body[key]
                currSubtask["completed"] = false
            }
            subtasks.push(currSubtask)
        }
    })
    return subtasks
}
const parseTags = (body) => {
    let newTags = []
    Object.keys(body).forEach(key => {
        if (key.startsWith('tag-')) {
            newTags.push(body[key].slice(4))
        }
    })
    return newTags
}

let remindersController = {
    list: (req, res) => {
      let friends = []
      req.user.friends.forEach( friend => {
        let user = getUserById(friend)
        friends.push({
          email: user.email,    
          reminders: user.reminders
        })
      })
      res.render("reminder/index", { 
        userFriends: friends,
        profilePic: req.user.profilePic,
        reminders: req.user.reminders,
      });
    },

    new: (req, res) => {
        res.render("reminder/create", {profilePic: req.user.profilePic});
    },

    listOne: (req, res) => {
        let reminderToFind = req.params.id;
        let searchResult = req.user.reminders.find(function(reminder) {
            return reminder.id == reminderToFind;
        });
        if (searchResult != undefined) {
            if (searchResult.reminderTime != '') {
                let reminderDay = new Date(searchResult.reminderTime);
                let gap = formatRelative(reminderDay, new Date());
                let formatGap = gap.charAt(0).toUpperCase() + gap.slice(1);
                res.render("reminder/single-reminder", { reminderItem: searchResult, distanceToNow: formatGap, profilePic: req.user.profilePic});
            } else {
                const formatGap = '';
                res.render("reminder/single-reminder", { reminderItem: searchResult, distanceToNow: formatGap, profilePic: req.user.profilePic});
            }
        } else {
            res.render("reminder/index", { 
                reminders: req.user.reminders,
                profilePic: req.user.profilePic,
            });
        }
    },

    create: (req, res) => {
        let reminderTime = ''
        if (req.body.reminderDate != '' && req.body.reminderTime != '') {
            let date = req.body.reminderDate;
            let time = req.body.reminderTime;
            reminderTime = date + 'T' + time;
        }
        let reminder = {
            id: req.user.reminders.length + new Date().getTime(),
            title: req.body.title,
            description: req.body.description,
            completed: false,
            reminderTime: reminderTime,
            subtasks: formatSubtasks(req.body),
            tags: parseTags(req.body)
        };
        req.user.reminders.push(reminder);
            res.redirect("/reminders");
    },

    edit: (req, res) => {
        let reminderToFind = req.params.id;
        let searchResult = req.user.reminders.find(function(reminder) {
            return reminder.id == reminderToFind;
        });
        let searchResultTime = searchResult.reminderTime
        if (searchResultTime != '') {
            let date = searchResultTime.split('T')[0];
            let time = searchResultTime.split('T')[1];
            res.render("reminder/edit", { 
                reminderItem: searchResult,
                reminderDate: date,
                reminderTime: time,
                profilePic: req.user.profilePic,
                });
        } else {
            let date = '';
            let time = '';
            res.render("reminder/edit", { 
                reminderItem: searchResult, 
                reminderDate: date, 
                reminderTime: time,
                profilePic: req.user.profilePic,
            });
        }
    },

    update: (req, res) => {
        let reminderToUpdate = req.params.id;
        let searchIndex = req.user.reminders.findIndex(function(reminder) {
            return reminder.id == reminderToUpdate
        });
        let date = req.body.reminderDate;
        let time = req.body.reminderTime;
        if (date != '' && time != '') {
          var reminderTime = date + 'T' + time;
        } else {
          var reminderTime = '';
        }
        let updatedReminderDict = {
            id: parseInt(reminderToUpdate),
            title: req.body.title,
            description: req.body.description,
            //json parse evalutes the string true, false to bool
            completed: JSON.parse(req.body.completed),
            reminderTime: reminderTime,
            subtasks: formatSubtasks(req.body),
            tags: parseTags(req.body)
        };
        req.user.reminders.splice(searchIndex, 1, updatedReminderDict)
        res.redirect("/reminders");
    },

    delete: (req, res) => {
        let reminderToDelete = req.params.id;
        let searchIndex = req.user.reminders.findIndex(function(reminder) {
            return reminder.id == reminderToDelete
        });
        req.user.reminders.splice(searchIndex, 1);
        res.redirect("/reminders");
    },

    deleteTime: (req, res) => {
        let reminderToDelete = req.params.id;
        let searchIndex = req.user.reminders.find(function(reminder) {
            return reminder.id == reminderToDelete
        });
        searchIndex.reminderTime = '';
        res.redirect(req.get('referer'));
    },
}

module.exports = remindersController;