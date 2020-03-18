const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/datamart-api'), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}



