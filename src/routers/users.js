const express = require('express')
const multer = require('multer')
const User = require('../models/user')
const auth = require('../middleware/auth')
const lystra = new express.Router()
const  { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account')

lystra.post('/users', async (req, res) => { // create new user
    const user = new User(req.body)

    try{
        await user.save()
        sendWelcomeEmail(user.email,user.freelancerfirstname)
        res.status(201).send(user)
    } catch (e){
        res.status(400).send(e)
    }
})

lystra.post('/users/login', async (req, res) => { //login user
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user: user.getPublicProfile(), token})
       
    } catch (e) {
        res.status(400).send(e)
    }

   

})

lystra.post('/users/logout', auth, async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        

        res.send()
    } catch (e) {
        res.status(500).send()
    }

})

lystra.post('/users/logoutAll', auth, async (req, res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

lystra.get('/users/me', auth , async (req,res) => { //get all users
   res.send(req.user)
})



lystra.patch('/users/me', auth ,async (req, res) => {

    const updates = Object.keys(req.body) //converts object to array
    const allowedUpdates = ['id', 'freelancerfirstname', 'freelancerlastname', 'dob', 'age', 'email', 'password','projectName', 'dateOfAccept', 'projectCost', 'projectStatus', 'duedate', 'completed'] //array
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) // loop through and check if each member of 'updates' is in 'allowedUpdates'

    if(!isValidOperation) { // if its not a vaild operation
        return res.status(400).send({error: 'update'})
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(user) //send updated user back
    } catch (e) {
        res.status(400).send(e)
    }
})


lystra.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        sendCancelationEmail(req.user.email, req.user.freelancerfirstname)
        res.send(req.user)

    } catch (e) {
        res.status(500).send()
    }
})

const upload = multer({
    limits:{
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

lystra.post('/users/me/avatar', auth ,upload.single('avatar') , async (req, res) => {
    req.user.avatar = req.file.buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) =>{
    res.status(400).send({error: error.message})
})


lystra.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

lystra.get('/users/:id/avatar', async (req,res) => {
    try {
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar) {
            throw new Error()
        }    
    
        res.set('Content-Type', 'image/jpg')
        res.send(user.avatar)
    
    }catch (e) {
        res.status(404).send()
    }


})


module.exports = lystra