const express = require('express')
const DBconnect = require('./config/db')

const app =  express()

// Connect Database
DBconnect()

//Init Middleware
app.use(express.json({extended:false}))

app.get('/',(req,res)=>{
res.send('API Running')
})

// Define Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/post', require('./routes/api/post'))
app.use('/api/profile', require('./routes/api/profile'))

app.listen(process.env.PORT ||4000 ,()=>{
    console.log(`Server Up and Running`);
})