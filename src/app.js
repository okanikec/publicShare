const path = require('path')
const express = require('express')
const hbs = require('hbs')
const commodity = require('./utils/commodity')
const date1 = require('./utils/date1')



// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const lystra = express()
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

lystra.set('view engine', 'hbs')
lystra.set('views', viewsPath)
hbs.registerPartials(partialsPath)

lystra.use(express.static(publicDirectoryPath))

lystra.get('/', (req, res) => {
    res.render('index')
})

lystra.get('/login', (req, res) => {
    res.render('login')
})

lystra.get('/signup', (req, res) => {
    res.render('signup')
})

lystra.get('/postajob', (req, res) => {
    res.render('postajob')
})

lystra.get('/categories', (req, res) => {
    res.render('categories')
})

lystra.get('/loggedin', (req, res) => {
    res.render('loggedin')
})

lystra.get('/loggedout', (req, res) => {
    res.render('loggedout')
})

lystra.get('/about', (req, res) => {
    res.render('about')
})


lystra.get('/commodity', (req, res) => {
    res.render('commodity',{ 
        
    })
})

lystra.get('/information', (req, res) => {
    
    if(!req.query.code) {
        return res.send({
            error: 'You must provide a code'
        })
    }
            
    commodity(req.query.code, (error, {date , code} = {}) => {
        if (error) {
            return res.send({error})
        }

        date1(date, code, (error, volumedata) => {
                    
            if (error) {
                return res.send({error})
            }
                
                
            res.send({
                volumedata: volumedata
            })
                
        })
            
    })
    
})





lystra.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found'
    })
})



lystra.listen(port, () => {
    console.log('Server is up and running on port ' + port)
})