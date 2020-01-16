const express = require('express')
const Project = require('../models/project')
const auth = require('../middleware/auth')
const outsourcer = new express.Router()

outsourcer.post('/projects', auth, async (req,res) => {
    //const project = new Project(req.body)
    const project = new Project({
        ...req.body,
        client: req.user._id
    })

    try {
        await project.save()
        res.status(201).send(project)
    } catch (e){
        res.status(400).send(e)
    }
})


//return projects for authenticated user, limit projects you get back
//GET /projects?completed=true
//GET /projectts?limit=10&skip=20
//GET /tasks?sortBy=createdAt:desc
outsourcer.get('/projects', auth ,async (req, res) => {
    const match = {}
    const sort = {}

    if(req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    //sort by 
    if (req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        // const projects = await Project.find({ client: req.user._id})
        await req.user.populate({
            path: 'projects',
            match,
            options: {
               limit: parseInt(req.query.limit),
               skip: parseInt(req.query.skip),
               sort               
               
            }          
        }).execPopulate()
            

        res.send(req.user.projects)
    } catch (e) {
        res.status(500).send()
    }
})

outsourcer.get('/projects/:id',  auth ,async (req, res) => {
    const _id = req.params.id

    try {
      
        const project = await Project.findOne({ _id, client: req.user._id })

        if(!project){
            return res.status(404).send()
        }

        res.send(project)

    } catch (e) {
        return res.status(404).send()
    }
})

outsourcer.patch('/projects/:id', auth ,async(req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['skillRequired', 'projectCost', 'projectLocation', 'duration' ]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid Update'})
    }

    try {
        // find project by prject owner
        const project = await Project.findOne({_id: req.params.id, client: req.user._id})

        

        if(!project) { // if no project to update
            return res.status(404).send()
        }

        updates.forEach((update) => project[update] = req.body[update])
        await project.save()

        res.send(project) //send updated project back
    } catch (e) {
        res.status(400).send(e)
    }
})

outsourcer.delete('/projects/:id', auth ,async (req, res) => {
    try {
        const project = await Project.findOneAndDelete({_id: req.params.id, client: req.user._id})

        if(!project) {
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = outsourcer