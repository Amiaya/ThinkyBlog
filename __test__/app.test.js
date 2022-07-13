const app = require('../app')
const request = require('supertest')
const dotenv = require('dotenv')
const userValidator = require('../schema/userValidator')
const User = require('../models/User')
const Category = require('../models/category')

dotenv.config()
const user = {
    email: "charles@gmail.com",
    password: "qazwsxed"
}
const  userInput = {
    FullName:"Charles Adebeyi",
    email: "charles.A@gmail.com",
    password: "qazwsxed"
}

const categoryInput = [
    {name: 'Category' },
    {name: 'Entertainment'},
    {name: 'Games'},
    {name: 'Internet'},
    {name: 'Technology'},
    {name: 'Society'}
]

describe('user', () => {
    describe('user registration', () =>{
        describe('Given the user Fullname, password and email is valid', () => {
            it('should return the user response with 201', async ()=> {
                jest.spyOn(userValidator, 'validateAsync').mockResolvedValue(userInput)
                jest.spyOn(User, 'create').mockResolvedValue(userInput)
            
                const {statusCode} = await request(app).post('/ThinkyBlog/signup').send(userInput)
                expect(statusCode).toBe(201)
            })
        })
        // describe('Given the user email and password is valid' , () => {
        //     it('should return the user reponsew with 200', async ()=> {
        //         jest.spyOn(User, 'findOne').mockResolvedValue(user)

        //         const {statusCode} = await (await request(app).post('/ThinkyBlog/login')).send(user)
        //         expect(statusCode).toBe(200)
                
        //     })
        // })
    })
})

describe('category', () => {
    describe('/POST Category', () => {
        it('should return response with 201', async () => {
            jest.spyOn(Category, 'create').mockResolvedValue(categoryInput)
        
            const {statusCode} = await request(app).post('/ThinkyBlog/category').send(categoryInput)
            expect(statusCode).toBe(201)
        })
    })
})