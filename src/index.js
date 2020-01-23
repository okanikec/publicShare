const lystra = require('./app')
// const express = require('express')
// require('./db/mongoose')
// const userRouter = require('./routers/users')
// const projectRouter = require('./routers/projects')

//const lystra = express()
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

lystra.post('/upload', upload.single('upload'), (req, res) =>{
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})


lystra.listen( port, () => {
    console.log('Server is up on port ' + port)
})



