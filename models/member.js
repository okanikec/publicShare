const mongoose = require('mongoose')
const validator = require('validator')

const Member = mongoose.model('Member', {
    firstname: {
        type: String,
        //default: "Jane",
        //required: true,
        trim: true
    },
    lastname: {
        type: String,
        //default: "Doe",
        //required: true,
        trim: true
    },
    email: {
        type: String,
        //required: true,
        //default: "jane.doe@mail.com",
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    country:{
        type: String,
        //default: "France",
        //required: true
    },
    phone: {
        type: Number,
        //required: true,
        default: 0000000000
    },
    username:{
        type: String,
        //default: "janedoe",
        //required: true,
        trim: true
    },
    password: {
        type: String,
        minlength: 7,
        //default: "secretthree",
        trim: true,
        //required: true,
        validate(value) {
             if ( value.toLowerCase().includes('password')) {
                 throw new Error(' Password cannot contain "password" ')
             }
         }
    }

})

module.exports = Member