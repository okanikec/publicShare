const mongoose = require('mongoose')
const validator = require('validator')

const Project = mongoose.model('Project',{
    projectdescription: {
        type: String,
        //default: "Jane",
        //required: true,
        trim: true
    },
    projectdue: {
        type: Date,
        default: Date.now,
        //default: "Doe",
        //required: true,
        trim: true
    },
    projectcost: {
        type: Number
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Member'

    }
})

module.exports = Project