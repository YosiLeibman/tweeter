const { v4 } = require("uuid")

module.exports.db = [
    {
        username: "Jo",
        password: "$2b$10$x8CvKTU0aUpyOoiaAUxzxeq1jOCNCFXlEUqopWSodTZmazSPM9sKO",
        nickname:"Johnnihahoo",
        avatar:"https://ps.w.org/simple-user-avatar/assets/icon-256x256.png",
        following:[
            "Johana"
        ],
        tweets:[
            {
                id: v4(),
                author:"Jo",
                text:"First tweeeet ever!!",
                published: new Date(),
                likes:[
                    "Johana",
                    "Jenny"
                ],
                comments:[
                    {
                        username:"Jenny",
                        text:"Ouch! I tought I would be first :(",
                        published: new Date()
                    }
                ]
            },
            {
                id: v4(),
                author:"Jo",
                text:"Second tweeeet ever!!",
                published: new Date(),
                likes:[
                    "Jenny"
                ],
                comments:[
                    {
                        username:"Johana",
                        text:"common!",
                        published: new Date()
                    }
                ]
            },
        ]
    },
    {
        username: "Johana",
        password: "$2b$10$x8CvKTU0aUpyOoiaAUxzxeq1jOCNCFXlEUqopWSodTZmazSPM9sKO",
        nickname:"Johana",
        avatar:"https://ps.w.org/simple-user-avatar/assets/icon-256x256.png",
        following:[
            "Jo",
            "Jenny"
        ],
        tweets:[
            {
                id: v4(),
                author:"Johana",
                text:"Hey y'all!",
                published: new Date(),
                likes:[
                    "Jo",
                    "Jenny"
                ],
                comments:[
                    {
                        username:"Jenny",
                        text:"Hey yourself!",
                        published: new Date()
                    }
                ]
            }
        ]
    },
    {
        username: "Jenny",
        password: "$2b$10$x8CvKTU0aUpyOoiaAUxzxeq1jOCNCFXlEUqopWSodTZmazSPM9sKO",
        nickname:"Jen",
        avatar:"https://ps.w.org/simple-user-avatar/assets/icon-256x256.png",
        following:[],
        tweets:[]
    }
]
