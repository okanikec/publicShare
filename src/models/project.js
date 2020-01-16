const mongoose = require('mongoose')
const moment = require('moment')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    skillRequired: {
        type: String,
        required: true,
        trim: true
    },
    projectCost:{
        type: String,
        required: true,
        trim: true
    },
    projectLocation:{
        type: String,
        required: true,
        trim: true
    },
    duration:{
        type: String,
        required: true,
        trim: true

    },completed:{
        type: Boolean,
        required: true
    },
    client:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    contractor:{
        type:mongoose.Schema.Types.ObjectId,
        //required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
    const project = this
 
    if (project.isModified('password')) {
        project.password = await bcrypt.hash(user.password, 8)
    }
 
    next()
})


const Project = mongoose.model('Project', userSchema)

module.exports = Project
