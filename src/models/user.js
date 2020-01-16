const mongoose = require('mongoose')
const moment = require('moment')
const validator = require('validator')
const bcrypt = require('bcryptjs') 
const jwt = require('jsonwebtoken')
const Project = require('./project')

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    freelancerfirstname: {
        type: String,
        required: true,
        trim: true
    },
    freelancerlastname:{
        type: String,
        required: true,
        trim: true
    },    
    dob:{
        type: String,
        required: true,
    
    },
    age:{
        type: Number,
        required: true,
        },
    email:{
        type: String,
        unique: true,
        required: true,
        // trim: true,
        // lowercase: true,
        // validate(value){
        //     if(!validator.isEmail(value)) {
        //         throw new Error('Email is invalid')
        //     }
        // }
    },
    password:{
        type: String,
        required: true,
        minlength: 7,
        unique: true,
        //trim: true,
        // validate(value){
        //     if(value.toLowerCase().includes('password')) {
        //         throw new Error('Password cannot contain "password"')
        //     }
        // }
    },
    projectName:{
        type: String,
        required: true,
    },
    dateOfAccept:{
        type: String,
        required: true,
    },
    projectCost:{
        type: String,
        required: true,
    },
    projectStatus:{
        type: String,
        required: true,
        trim: true
    },
    duedate:{
        type: String,
        required: true,
    },
    completed:{
        type: Boolean,
        required: true
    },
    tokens:[{
        token:{
            type: String,
            required:true
        }
    }],
    avatar:{
        type: Buffer
    }
}, {
    timestamps: true
})

userSchema.virtual('projects', {
    ref: 'Project',
    localField: '_id',
    foreignField: 'client'

})

userSchema.methods.getPublicProfile = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    
    return userObject
}




//generate Token for user
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}



userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('unable to login')
    }
    return user
}


//Hash the plain text password before saving
userSchema.pre('save', async function (next) {
   const user = this

   if (user.isModified('password')) {
       user.password = await bcrypt.hash(user.password, 8)
   }

   next()
})

//Delete user tasks when user is removed
userSchema.pre('remove', async function (next)  {
    const user = this
    await Project.deleteMany({ client: user._id})

    next()

})


const User = mongoose.model('User', userSchema)


module.exports = User