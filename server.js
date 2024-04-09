const express = require('express')

const app =  express()

app.get('/',(req,res)=>{
res.send('API Running')
})

app.listen(process.env.PORT ||4000 ,()=>{
    console.log(`Server Up and Running`);
})