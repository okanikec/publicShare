const express = require('express')
const Member = require('../models/member')
const auth = require('../middleware/auth')
const router = new express.Router()


// Create-signup new member  
router.post('/members', async (req, res) => {
        //console.log(req.body)
        const member = new Member(req.body)
    try {
        await member.save()
        //res.redirect('/postajob')
        const token = await member.generateAuthToken()
        res.redirect(201,'/login').send({ member, token })
    } catch(e) {
        res.status(400).send(e)
    
    }

})

//login member
router.post('/login', async (req, res) => {
    try {
        const member = await Member.findByCredentials(req.body.email, req.body.password)
        const token = await member.generateAuthToken()
        //res.redirect('/postajob')
        res.send({ member, token })
    } catch (e) {
        res.status(400).send()   
    }
})

// logout member
router.post('/logout', auth, async (req, res) => {
    try{
        req.member.tokens = req.member.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.member.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


// get specified member
 router.get('/memberspage', (req, res) => {
    
    Member.find({}).then((members) => {
        //res.render('memberspage')
        res.render('memberspage',{title: members[1].email})
    }).catch((e) => {
        res.status(400).send(e)
    })
})

//get member profile
router.get('/members/me', auth, async (req, res) => {
    res.send(req.member)
})


//get all members without authenticating
router.get('/members', async (req, res) => {
    try {
        const members = await Member.find({})
        res.send(members)
    } catch (e) {
        res.status(500).send()
    }
})



// edit-update member by ID
router.patch('/members/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['firstname', 'lastname', 'email', 'country', 'phone', 'username', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ error: 'invalid updates!' })
    }

    try{
        
        updates.forEach((update) => {
            req.member[update] = req.body[update]
        })
            
        await req.member.save() // save updated member to database

        res.send(req.member)
    } catch (e) {
        res.status(400).send(e)
    }
})

// delete individual member
router.delete('/members/me', auth, async (req, res) => {
    try {
        
        await req.member.remove()
        res.send(req.member)
    }catch (e) {
        res.status(500).send()
    }
})

module.exports = router