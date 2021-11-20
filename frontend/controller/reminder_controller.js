const getUserById = require('./userController.js').getUserById
const formatRelative = require('date-fns/formatRelative')
const http = require('http')
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const formatSubtasks = (body) => {
    let subtasks = []
    //Takes req.body and returns formatted subtasks in a list of objects
    Object.keys(body).forEach(key => {
        if (parseInt(key) == key){
            let currSubtask = {id: key.slice(11)}
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
    list:  (req, res) => {
      let friends = []
      //get all current user's friends 
      let friendapi = `http://localhost:8080/friends/${req.user.id}`
      //get all reminders of current user
      let remidnersapi=`http://localhost:8080/reminders/${req.user.id}`
      //get api request
      let Get = (api) => {
        const xhr =  new XMLHttpRequest();
        xhr.open("GET",api,false);
        xhr.send(null);
        return xhr.responseText;

    }

    // get the friend
    let friendid = JSON.parse(Get(friendapi));
    // get all the reminders
    let reminders= JSON.parse(Get(remidnersapi));
    
    // loop the friend to correct data structure
     friendid.forEach( friend => {
        let user = getUserById(friend.frn_friend_user_id)
        let remindersF = JSON.parse(Get(`http://localhost:8080/reminders/${friend.frn_friend_user_id}`));
        
        friends.push({
          email: user.email,    
          reminders: remindersF
        })
      })
      // send the data to the page
      res.render("reminder/index", { 
        userFriends: friends,
        profilePic: req.user.profilePic,
        reminders: reminders,
      });
    },

    new: (req, res) => {
        res.render("reminder/create", {profilePic: req.user.profilePic});
    },

    listOne: (req, res) => {
        let reminderToFind = req.params.id;
        
        // get request
        let Get = (api) => {
            const xhr =  new XMLHttpRequest();
            xhr.open("GET",api,false);
            xhr.send(null);
            return xhr.responseText;
    
        }
        // signle reminder api
        let signlereminderapi= `http://localhost:8080/reminders/${req.user.id}/${reminderToFind}`
        // single reminder data
        let signlereminder = JSON.parse(Get(signlereminderapi));
        // console.log(signlereminder)

        // check whether there is reminder
        if (signlereminder != undefined) {
            if (signlereminder[0].reminder_date != '') {
                let reminderDay = new Date(signlereminder[0].reminder_date);
                let gap = formatRelative(reminderDay, new Date());
                let formatGap = gap.charAt(0).toUpperCase() + gap.slice(1);
                res.render("reminder/single-reminder", { reminderItem: signlereminder[0], distanceToNow: formatGap, profilePic: req.user.profilePic});
            } else {
                const formatGap = '';
                res.render("reminder/single-reminder", { reminderItem: signlereminder[0], distanceToNow: formatGap, profilePic: req.user.profilePic});
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
        // get request
        let Get = (api) => {
            const xhr =  new XMLHttpRequest();
            xhr.open("GET",api,false);
            xhr.send(null);
            return xhr.responseText;
    
        }
        // post request
        let Post =(api,data)=>{
            const xhr = new XMLHttpRequest();
            xhr.open("POST", api, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        }

        //get all reminders of current user
        let remidnersapi=`http://localhost:8080/reminders/${req.user.id}`
        // get all the reminders
        let reminders= JSON.parse(Get(remidnersapi));
        let reminder = {
            data:{
                reminder_id: (reminders.length == 0 ) ? 1 : reminders[reminders.length-1].reminder_id+1,
                // reminder_id:  1 ,
                frn_user_reminder_id:req.user.id,
                title: req.body.title,
                description: req.body.description,
                completed: false,
                reminder_date: reminderTime,
                subtask: formatSubtasks(req.body),
                tags: parseTags(req.body)
            }
        };
        
        // console.log(reminder.data.subtask)
        // create a new remidner
        Post(remidnersapi,reminder)

        // req.user.reminders.push(reminder);
            res.redirect("/reminders");
    },

    edit: (req, res) => {
        // reminderToFind = req.params.id
        // let searchResult = req.user.reminders.find(function(reminder) {
        //     return reminder.id == reminderToFind;
        // });
        // let searchResultTime = searchResult.reminderTime


        // edit api start here
        let remidnersapi=`http://localhost:8080/reminders/${req.user.id}`
        let Get = (api) => {
            const xhr =  new XMLHttpRequest();
            xhr.open("GET",api,false);
            xhr.send(null);
            return xhr.responseText;
        }
        reminders = Get(remidnersapi)
        reminders.forEach(obj => {
            if(obj.id == req.params.id) {
                return obj
            } else {
                return null
            }
        })
        let searchResultTime = obj.reminderTime


        if (searchResultTime != '') {
            let date = searchResultTime.split('T')[0];
            let time = searchResultTime.split('T')[1];
            res.render("reminder/edit", { 
                reminderItem: searchResult,
                reminderDate: date,
                reminderTime: time,
                profilePic: req.user.profilePic,
                });
        } 
        
        else {
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
        // let reminderToUpdate = req.params.id;
        // let searchIndex = req.user.reminders.findIndex(function(reminder) {
        //     return reminder.id == reminderToUpdate
        // });

        //reminder context
        let date = req.body.reminderDate;
        let time = req.body.reminderTime;
        if (date != '' && time != '') {
          var reminderTime = date + 'T' + time;
        } 
        else {
          var reminderTime = '';
        }
        let data = {
            id: parseInt(reminderToUpdate),
            title: req.body.title,
            description: req.body.description,
            completed: JSON.parse(req.body.completed),
            reminderTime: reminderTime,
            subtasks: formatSubtasks(req.body),
            tags: parseTags(req.body)
        };

        //update start here
        updateapi = `http://localhost:8080/reminders/${req.user.id}/${req.params.id}`
        let Put =(api,data)=>{
            const xhr = new XMLHttpRequest();
            xhr.open("PUT", api, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function () {
                let reminder = JSON.parse(xhr.responseText);
                if (xhr.readyState == 4 && xhr.status == "200") {
                    console.table(reminder);
                } else {
                    console.error(reminder);
                }
            }
            xhr.send(JSON.stringify(data));
        }
        Put(updateapi,data)

        // req.user.reminders.splice(searchIndex, 1, updatedReminderDict)

        res.redirect("/reminders");
    },

    delete: (req, res) => {
        // let reminderToDelete = req.params.id;
        // let searchIndex = req.user.reminders.findIndex(function(reminder) {
        //     return reminder.id == reminderToDelete
        // });
        // req.user.reminders.splice(searchIndex, 1);
        deleteapi = `http://localhost:8080/reminders/${req.user.id}/${req.params.id}`
        let Delete =(api)=>{
            const xhr = new XMLHttpRequest();
            xhr.open("DELETE", api, true);
            xhr.onload = function () {
                let result = JSON.parse(xhr.responseText);
                if (xhr.readyState == 4 && xhr.status == "200") {
                    console.table(result);
                } else {
                    console.error(result);
                }
            }
            xhr.send(NULL);
        }

        Delete(deleteapi)
        res.redirect("/reminders");
    },

    deleteTime: (req, res) => {
        let reminderToDelete = req.params.id;

        let Get = (api) => {
            const getreminders =  new XMLHttpRequest();
            getreminders.open("GET",api,false);
            getreminders.send(null);
            return getreminders.responseText;
    
        }
        // put request
        let Put =(api,data)=>{
            const deletetime = new XMLHttpRequest();
            deletetime.open("PUT", api, true);
            deletetime.setRequestHeader('Content-Type', 'application/json');
            deletetime.send(JSON.stringify(data));
        }

        let singlereminderapi=`http://localhost:8080/reminders/${req.user.id}/${reminderToDelete}`
        // get all the reminders
        let reminders= JSON.parse(Get(singlereminderapi));
        let data = reminders.find(function(reminder) {
            return reminder.id == reminderToDelete
        });
        data.reminder_date = '';
        Put(singlereminderapi,data);
        res.redirect(req.get('referer'));
    },
}

module.exports = remindersController;