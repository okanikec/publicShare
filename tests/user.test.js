const request = require('supertest')
const app = require('../src/app')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../src/models/user')



const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    id : 7,
    freelancerfirstname : "Ike",
    freelancerlastname : "Okanu",
    dob : "new Date('June 18 1982')",
    age : 37,
    email : "mike@example.com",
    password : "password7",
    projectName : "Excel",
    dateOfAccept: "new Date('September 1 2019')",
    projectCost : "7,000",
    projectStatus : "not completed",
    duedate : "new Date('Sepember 3 2019')",
    completed : false,
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
    
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})







test ('Should signup a new user', async () => {
    const response = await request(app).post('/users').send ({
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

    //Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            freelancerfirstname: 'Ike',
            email: 'mike@example.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('password7')
})

test('Should login existing user', async () =>{
    await request(app).post('/users/login').send({
        email:userOne.email,
        password: userOne.password
    }).expect(200)
})

test('Should not log in non existing user', async () => {
    await request(app).post('/users/login').send({
        email: 'jake@example.com',
        password:'password10'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request (app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not delete account for unauthenticated user', async () => {
    await request (app)
        .delete('/users/me')
        .send()
        .expect(401)
})