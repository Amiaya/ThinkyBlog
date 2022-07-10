const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const { MongoMemoryServer } = require('mongodb-memory-server')

const request = supertest(app);

dotenv.config()
const user = {
    email: "charles@gmail.com",
    password: "qazwsxed"
}


describe('user', () => {
    let db
    beforeAll(async() => {
        const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD)

        db = mongoose.connect(DB, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true
        }).then(()=> console.log('DB connection successful!'))
         
          
    })

    afterAll(async () => {
        await db.close();
      });
    describe('user registration', () =>{
        describe('Given the user password and email are valid', () =>{
            it('should return the user reponse 200', async () => {
                const res = await request.post('/ThinkyBlog/login', user)
                expect(res.status).toBe(200)
            })
        })
        describe('Given the user password and email do not match', () =>{
            it('should return the user reponse 400', () => {
                
            })
        })
    })
})
// describe('POST /ThinkyBlog/login' ,() => {
//     beforeAll(async () => {
//         const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD)

//         mongoose.connect(DB, { 
//         useNewUrlParser: true, 
//         useUnifiedTopology: true
//         }).then(()=> console.log('DB connection successful!'))

//       });    it('should have a statusCode of 200', async ()=> {
//         const response = await request(app).post("/ThinkyBlog/login").send(user)
//         expect(response.statusCode).toEqual(200)
       
//     })

//     it('should return an error if a parameter is missing', async ()=> {
       
//         const response = await request(app).post("/ThinkyBlog/login").send({
//             email: "charles@gmail.com",
//             password: ""
//         })
//         expect(response.statusCode).toEqual(401)
//     })

//     afterAll(async  (done) => {
//         mongoose.disconnect();
//         mongoose.connection.close()
//         done();
//     });
// })

