const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/users')
const projectRouter = require('./routers/projects')

const outsourcer = express()
const port = process.env.PORT

const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits:{
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        //if(!file.originalname.endsWith('.pdf')){
          if(!file.originalname.match(/\.(doc|docx)$/)){  
            //return cb(new Error('Please upload a PDF'))
            return cb(new Error('Please upload a word document'))
        }
        
        cb(undefined, true)
    }
})

// const errorMiddleware = (req, res, next) => {
//     throw new Error('from my middleware')
// }

outsourcer.post('/upload', upload.single('upload'), (req, res) =>{
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

outsourcer.use(express.json()) // parses user data to JSON so it can be accessed by res & req
outsourcer.use(userRouter)
outsourcer.use(projectRouter)


outsourcer.listen( port, () => {
    console.log('Server is up on port ' + port)
})



