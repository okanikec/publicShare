const request = require('supertest')
const Project = require('../src/models/project')
const app = require('../src/app')
const { 
    userOneId, 
    userOne, 
    userTwoId, 
    userTwo, 
    projectOne, 
    projectTwo, 
    projectThree, 
    setupDatabase,  
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create project for user', async () => {
    const response = await request(app)
        .post('/projects')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            skillRequired : "scraping",
            projectCost : "$8,000",
            projectLocation : "Rome",
            duration : "10 weeks",
            completed : false,
            client: userOne._id
            
        })
        .expect(201)
    const project = await Project.findById(response.body._id)
    expect(project).not.toBeNull()  
    expect(project.completed).toEqual(false)   
})


test('Should fetch user projects', async () => {
    const response = await request(app)
        .get('/projects')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    expect(response.body.length).toEqual(2)    
})


test('Should not delete other users tasks', async () => {
    const response = await request (app)
        .delete(`/projects/${projectOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
    const project = await Project.findById(projectOne._id)  
    expect(project).not.toBeNull()  
})