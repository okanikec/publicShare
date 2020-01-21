const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/users')
const projectRouter = require('./routers/projects')

const lystra = express()
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

lystra.post('/upload', upload.single('upload'), (req, res) =>{
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

lystra.use(express.json()) // parses user data to JSON so it can be accessed by res & req
lystra.use(userRouter)
lystra.use(projectRouter)


lystra.listen( port, () => {
    console.log('Server is up on port ' + port)
})



