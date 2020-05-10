const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Project = require('./project')

const memberSchema = new mongoose.Schema({
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
        unique: true,
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
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

})

memberSchema.virtual('projects',{
    ref: 'Project',
    localField: '_id',
    foreignField: 'owner'
})

memberSchema.methods.toJSON = function () {
    const member = this 
    const memberObject = member.toObject()

    delete memberObject.password
    delete memberObject.tokens

    return memberObject
}

memberSchema.methods.generateAuthToken = async function () {
    const member = this
    const token = jwt.sign({ _id: member._id.toString()}, 'thisismycourse')

    member.tokens = member.tokens.concat({ token }) // add new token object to tokens array
    await member.save() // saves token to database

    return token

}


memberSchema.statics.findByCredentials = async (email, password) => {
    const member = await Member.findOne({ email })

    if (!member) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, member.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return member
}


// Hash the plain text password before saving
memberSchema.pre('save', async function (next) {
    const member = this

    if (member.isModified('password')) {
        member.password = await bcrypt.hash(member.password, 8)
    }

    next()
})

//Delete user's tasks when user is removed
memberSchema.pre('remove', async function (next) {
    const member = this
    await Project.deleteMany({ owner: member._id})
    next()
})

const Member = mongoose.model('Member', memberSchema)

module.exports = Member