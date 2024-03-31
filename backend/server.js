const express=require('express')
const mongoose=require('mongoose')
const bodyparser=require('body-parser')
const userApp=require('./API/user_api')
const homeApp=require('./API/home_api')
const app=express()
const path=require('path')
const port=5000
const cors=require("cors")
app.use(cors())
const dbUrl='mongodb+srv://mern_lab:mern_lab@cluster0.7eubu14.mongodb.net/NewLogin'

mongoose.connect(dbUrl).then(()=>{
    console.log("MongoDB connected succesfully")
}).catch(err=>{
    console.log("Error occured: ",err)
})
app.use(express.json())




app.use(express.static(path.join(__dirname,'../frontend/build')))


//middleware for err
app.use((err,req,res,next)=>{
    res.send({
        message:"error",
        payload:err
    })
    next()
})



app.use('/user',userApp)
app.use('/home',homeApp)


app.listen(port,()=>{
    console.log("Server running succesfully")
    console.log("http://localhost:"+port)
})