let database = require("../database");

let remindersController = {
  profile:(req,res) => {
    res.render("reminder/profile");
  },
  list: (req, res) => {
    let name = req.query.name;
    let reminder = null;
    for (let user in database) {
      if (database[user].password === name) {
        reminder = database[user].reminders;
        break;
      }
    }
    res.render("reminder/index", { reminders: reminder });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
      subtask: req.body.subtask
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let new_reminder = {
      id: database.cindy.reminders.length,
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
      subtask: req.body.subtask
    };
    database.cindy.reminders.splice(new_reminder.id-1, 1, new_reminder);
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    database.cindy.reminders.splice(searchResult.id-1, 1);
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
