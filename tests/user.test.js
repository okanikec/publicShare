const request = require('supertest')
const app = require('../src/app')

test ('Should signup a new user', async () => {
    await request(app).post('/users').send ({
    id : 7,
    freelancerfirstname : "Ike",
    freelancerlastname : "Okanu",
    dob : "new Date('June 18 1982')",
    age : 37,
    email : "andrewmead@example.com",
    password : "password7",
    projectName : "Excel",
    dateOfAccept: "new Date('September 1 2019')",
    projectCost : "7,000",
    projectStatus : "not completed",
    duedate : "new Date('Sepember 3 2019')",
    completed : false,
    }).expect(201)
})