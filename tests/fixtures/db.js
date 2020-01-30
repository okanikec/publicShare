const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Project = require('../../src/models/project')


const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    id : 7,
    freelancerfirstname : "Ike",
    freelancerlastname : "Okanu",
    dob : "new Date('June 18 1982')",
    age : 37,
    email : "mike@example.com",
    password : "password8",
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

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    id : 7,
    freelancerfirstname : "John",
    freelancerlastname : "Doe",
    dob : "new Date('June 18 1982')",
    age : 37,
    email : "John@example.com",
    password : "password8",
    projectName : "Excel",
    dateOfAccept: "new Date('September 1 2019')",
    projectCost : "7,000",
    projectStatus : "not completed",
    duedate : "new Date('Sepember 3 2019')",
    completed : false,
    tokens: [{
        token: jwt.sign({_id: userTwoId}, process.env.JWT_SECRET)
    }]
}


const projectOne = {
    _id: new mongoose.Types.ObjectId(),
    skillRequired : "astronut",
    projectCost : "$6,000",
    projectLocation : "Mars",
    duration : "10 weeks",
    completed : false,
    "client" : userOne._id
}

const projectTwo = {
    _id: new mongoose.Types.ObjectId(),
    skillRequired : "spaceman",
    projectCost : "$6,000",
    projectLocation : "pluto",
    duration : "10 weeks",
    completed : false,
    "client" : userOne._id
}

const projectThree = {
    _id: new mongoose.Types.ObjectId(),
    skillRequired : "rocketdesign",
    projectCost : "$6,000",
    projectLocation : "Venus",
    duration : "10 weeks",
    completed : false,
    "client" : userTwo._id
}


const setupDatabase = async () => {
    await User.deleteMany()
    await Project.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Project(projectOne).save()
    await new Project(projectTwo).save()
    await new Project(projectThree).save()
}

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    projectOne,
    projectTwo,
    projectThree,
    setupDatabase
}


