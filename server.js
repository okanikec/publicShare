const express = require('express')
const memberRouter = require('./routers/members')
const projectRouter = require('./routers/projects')
const auth = require('./middleware/auth')
require('./mongoose')
const path = require('path')
const http = require('http')
const hbs = require('hbs')
//const bodyparser = require('body-parser')
const socketio = require('socket.io')

const datamart = express()
const server = http.createServer(datamart)
const io = socketio(server)
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
datamart.use(express.urlencoded({ extended: false }))
datamart.use(memberRouter)
datamart.use(projectRouter)




datamart.get('/index', (req, res) => {
    res.render('index')
})

datamart.get('/signup', (req, res) => {
    res.render('signup')
})

datamart.get('/login', (req, res) => {
    res.render('login')
})


datamart.get('/logout', (req, res) => {
    res.render('logout')
})

datamart.get('/postajob', auth,(req, res) => {
  res.render('postajob')
})



datamart.get('/messages', (req, res) => {
    res.render('messages')
})

datamart.get('/createproject', (req, res) => {
    res.render('createproject')
})


datamart.get('/memberspage', (req, res) => {
    res.render('memberspage')
})


// datamart.get('*', (req, res) =>{
//     res.render('404', {
//         title: '404',
//         errorMessage: 'Page not found'
//     })
// })


io.on('connection', (socket) => {
    console.log('New Websocket connection')

    socket.emit('message', 'welcome!')

    socket.on('sendMessage', (message) => {
        io.emit('message', message)
    })
  
})

server.listen (port, () => {
    console.log('Server is up on port ' + port)
})

const Project = require('./models/project')
const Member = require('./models/member')

// const main = async () => {
//     const project = await Project.findById('5eae62cd6e564972e49ff3b7')
//     await project.populate('owner').execPopulate()
//     console.log(project.owner)
//     console.log('\n')
//     const member = await Member.findById('5eae0605f020af251cde2f51')
//     await member.populate('projects').execPopulate()
//     console.log(member.projects)
// }

// main()