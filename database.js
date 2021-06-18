let database = {
    cindy: {
        profilepic: "https://elireview.com/wp-content/uploads/2016/12/reed-profile-square.jpg",
        email:"cindy@bcit.ca",
        password:"cindy",
        id: 6666,
        reminders: [{id: 1, title: "Cindy First Reminder", description: "Hello", completed: false, subtask: ["test"]},
                    {id: 2, title: "Cindy Second Reminder", description: "World", completed: false, subtask: ["test"]},   
                    ],
    },

    alex: {
        profilepic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
        email:"alex@bcit.ca",
        password:"alex",
        id: 7777,
        reminders: [{id: 1, title: "Alex First Reminder", description: "Hi", completed: false, subtask: ["test"]},
                    {id: 2, title: "Alex Second Reminder", description: "BCIT", completed: false, subtask: ["test"]},   
                    ],
    },

    Sarah: {
        profilepic: "https://images.unsplash.com/photo-1557296387-5358ad7997bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
        email:"sarah@bcit.ca",
        password:"sarah",
        id: 8888,
        reminders: [{id: 1, title: "Sarah First Reminder", description: "Awesome", completed: false, subtask: ["test"]},
                    {id: 2, title: "Sarah Second Reminder", description: "Perfect", completed: false, subtask: ["test"]},   
                    ],
    } 
}

module.exports = database;