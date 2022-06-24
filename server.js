const app = require('./app')
const mongoose = require('mongoose')
const dotenv = require('dotenv')


dotenv.config()

const port = 4000 || process.env.PORT


const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true
}).then(()=> console.log('DB connection successful!'))


app.listen(port, ()=> {
    console.log(`The App is running on ${4000}.....`)
})