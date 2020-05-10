const express = require('express')
const Project = require('../models/project')
const auth = require('../middleware/auth')
const router = new express.Router()

// create project
router.post('/projects', auth, async (req, res) => {
    //const project = new Project(req.body)
    const project = new Project({
        ...req.body,
        owner: req.member._id
    })

    try {
        await project.save()
        res.status(201).send(project)
    } catch (e) {
        res.status(400).send(e)
    }
})

//get all projects
router.get('/projects', auth, async (req, res) => {
    try {
        await req.member.populate('projects').execPopulate()
        res.send(req.member.projects)
    } catch (e) {
        res.status(500).send()
    }
})

//get project by ID
router.get('/projects/:id',auth, async (req, res) => {
    const _id = req.params.id

    try {
        
        //const project = await Project.findById(_id)
        const project = await Project.findOne({_id, owner: req.member._id})
        
        if(!project) {
            return res.status(404).send()
        }
    
        res.send(project)
    }catch(e)  {
        res.status(500).send()
    }
})

//Update project
router.patch('/projects/:id',auth , async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['projectdescription', 'projectdue', 'projectcost']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid Updates!'})
    }

    try {
        const project = await Project.findOne({_id: req.params.id, owner: req.member._id})

        if (!project) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await project.save()

        res.send(project)
    } catch (e) {
        res.status(400).send(e)
    }
})


//delete project
router.delete('/projects/:id', auth, async (res, req) => {
    try {
        
        const project = await Project.findOneAndDelete({ _id: req.params.id, owner: req.member._id })
    
        if (!project) {
            res.status(404).send()
        }

        res.send(project)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router