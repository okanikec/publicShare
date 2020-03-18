const express = require('express')
require('./mongoose')
const Member = require('./member')
const path = require('path')
const hbs = require('hbs')
const bodyparser = require("body-parser")
//const request = require('request')
//const yargs = require('yargs')

const datamart = express()
const port = process.env.PORT || 3000

//define paths for express configuration
const publicDirectoryPath = path.join(__dirname)
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')

// setup handlebars engine and views location
datamart.set('view engine', 'hbs')
datamart.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
datamart.use(express.static(publicDirectoryPath))
datamart.use(express.json())
//datamart.use(bodyparser.urlencoded({ extended: false }))
//datamart.use(bodyparser.json())

datamart.get('/index', (req, res) => {
    res.render('index')
})

datamart.get('/signup', (req, res) => {
    res.render('signup')
})

datamart.get('/login', (req, res) => {
    res.render('login')
})

datamart.get('/postajob', (req, res) => {
    res.render('postajob')
})

datamart.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found'
    })
})


// signup new member  
    datamart.post('/members', (req, res) => {
        const member = new Member(req.body)
        console.log('hi')
        member.save().then(() => {
            res.status(201).send(member)
        }).catch((e) => {
            res.status(400).send(e)
            console.log(e)
        })
            
    })



// get all members
datamart.get('/members', (req, res) => {
    Member.find({}).then((members) => {
        res.send(members)
    }).catch((e) => {
        res.status(500).send()
    })
})

// get specific member
datamart.get('/members/:id', ( req, res) => {
    const _id = req.params.id
    
    Member.findById(_id).then((member) => {
        if (!member) {
            return res.status(404).send()
        }
    
        res.send(member)
    }).catch((e) => {
        res.status(500).send()
    })
})




datamart.listen (port, () => {
    console.log('Server is up on port ' + port)
})

