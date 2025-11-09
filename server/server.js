const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRouter = require('./routes/auth/auth-routes')

// This can be done in separate filmongodbe
mongoose.connect('mongodb+srv://tanaytenginkai_db_user:HdvTfJgYTRZhnnpd@cluster0.j2h3cwq.mongodb.net/').then(()=>console.log("MongoDB connected")).catch(error=>console.log(error))

const app=express()
const PORT=process.env.PORT || 5000;

app.use(
    cors({
        origin : ['http://localhost:5173','https://ecommerce-tau-three-44.vercel.app'],
        methods : ['GET','POST','DELETE','PUT'],
        allowedHeaders:[
            'Content-Type',
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma'
        ],
        credentials: true
    })
)

app.use(cookieParser())
app.use(express.json())
app.use('/api/auth',authRouter)

app.listen(PORT,()=>{
    console.log(`Server is now running on Port : ${PORT}`)
})