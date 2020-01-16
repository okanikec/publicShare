const mongoose = require('mongoose')
const moment = require('moment')


mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
})



