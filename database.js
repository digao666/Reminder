let Database = [
    {
        id: 1,
        email: "cindy.smith@gmail.com",
        password: "12345678",
        reminders: [
            { 
              id: 1,
              title: "Finish web dev term project",
              description: "Remember to make everything pretty. When you're grading, remember to add tags and timers to your reminders so you see what they all look like",
              completed: false, reminderTime:"2021-04-01T21:30",
              subtasks: [{id: 1, title:"Sprint 1", completed: true}, {id: 2, title:"Sprint 2", completed: true}],
              tags:["Important","Urgent"]
            },
            { 
              id: 2,
              title: "Buy potatoes from the supermarket",
              description: "You need to get 5 potatoes. Get some eggs while you're there",
              completed: true,
              reminderTime:"2021-05-01T09:30",
              subtasks: [],
              tags:[]
            },
            { 
              id: 3,
              title: "Crying face 😭",
              description: "Loudly Crying Face conveys uncontrollable feelings and overwhelming sentiments, ranging from grief and disappointment to hilarity and joy. Its tone is often meant to be hyperbolic.",
              reminderTime:'',
              completed: true,
              subtasks: [],
              tags:[]
            }
        ],
        friends: [2],
        profilePic: "https://images.unsplash.com/photo-1617181477990-9be4b33ddec5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjA3Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MTc2NjYyODk&ixlib=rb-1.2.1&q=80&h=120"
    },
    {
        id: 2,
        email: "alex.johnson@gmail.com",
        password: "12345678",
        reminders: [
          { 
            id: 2,
            title: "Finish doing the python project",
            description: "Remember that you have to use pygame and flask to make a RESTful WebApi",
            completed: false,
            reminderTime:"2021-04-01T03:30",
            subtasks: [{id: 1, title:"Make virtual environment", completed: false}, {id: 2, title:"Find groupmate", completed: true}],
            tags:['Important', 'Urgent', 'Hard']
          },
          { 
            id: 1,
            title: "Hey checkout the github page for our project!",
            description: "Link is over here: https://github.com/confy/2520-ReminderProject. Thanks!",
            completed: false,
            reminderTime: '',
            subtasks: [],
            tags:[]
          },
        ],
        friends: [],
        profilePic: "https://images.unsplash.com/photo-1617181669028-27de15642b18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjA3Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MTc2NjMyOTg&ixlib=rb-1.2.1&q=80&h=120"
    },
    {
      id: 3,
      email: "alice.potato@gmail.com",
      password: "12345678",
      reminders: [
        { 
          id: 2,
          title: "Study for math",
          description: "The cumulative final for math looks like it'll be really hard, we better study",
          completed: false,
          reminderTime: "2021-08-01T21:30",
          subtasks: [],
          tags:[]
        }
      ],
      friends: [],
      profilePic: "https://images.unsplash.com/photo-1617223777538-5698e655a613?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjE3NjcxMzc4&ixlib=rb-1.2.1&q=80&h=120"
  },
  {
    id: 4,
    email: "fenrir@gmail.com",
    password: "12345678",
    reminders: [
      {
        id: 2,
        title: "Get rid of my chains and kill the gods",
        description: "Why would the gods betray me like that.",
        completed: false,
        reminderTime: "2021-04-19T18:30",
        subtasks: [],
        tags:[]
      }
    ],
    friends: [],
    profilePic: "https://images.unsplash.com/photo-1617181669028-27de15642b18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjA3Njh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MTc2NjMyOTg&ixlib=rb-1.2.1&q=80&h=120"
},
]

module.exports = Database;