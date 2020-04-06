const express = require('express')
const Member = require('../models/member')
const router = new express.Router()


// Create-signup new member  
router.post('/members', async (req, res) => {
        console.log(req.body)
        const member = new Member(req.body)
    
    try {
        await member.save()
        res.status(201).send(member)
    } catch(e) {
        res.status(400).send(e)
    
    }
})

// get specified member
 router.get('/memberspage', (req, res) => {
    
    Member.find({}).then((members) => {

        res.render('memberspage', {title: members[0].email})
    }).catch((e) => {
        res.status(400).send(e)
    })
})



// get all members
router.get('/members', async (req, res) => {
    try {
        const members = await Member.find({})
        res.send(members)
    } catch (e) {
        res.status(500).send()
    }

})

// get specific member
router.get('/members/:id', async ( req, res) => {
const _id = req.params.id
try {
    const member = await Member.findById(_id)
    if (!member) {
        return res.status(404).send()
    }

    res.send(member)

} catch (e) {
    res.status(500).send()
}

})

// edit-update member by ID
router.patch('/members/:id', async (req, res) => {
const updates = Object.keys(req.body)
const allowedUpdates = ["firstname", "lastname", "email", "country", "phone", "username", "password" ]
const isValidOperation = updates.every((update) =>  allowedUpdates.includes(update))

if(!isValidOperation){
    return res.status(400).send({ error: 'invalid updates!' })
}

try{
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if(!member) {
        return res.status(404).send()
    }

    res.send(member)
} catch (e) {
    res.status(400).send(e)
}
})

// delete individual member
router.delete('/members/:id', async (req, res) => {
try {
    const member = await Member.findByIdAndDelete(req.params.id)

    if (!member) {
        return res.status(404).send()
    }

    res.send(member)
}catch (e) {
    res.status(500).send()
}
})



module.exports = router