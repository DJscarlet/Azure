const express=require('express')
const mongoose=require('mongoose')
const userApp=express.Router()
const bcryptjs=require('bcryptjs')
const jwt = require('jsonwebtoken')
const verifyToken=require('../MiddleWare/verifyToken')
userApp.use(express.json())


const loginSchema = new mongoose.Schema({
    username: String,
    phoneno: String,
    email: String,
    password: String
});
const Login = mongoose.model("newlogins", loginSchema);


//use registration
userApp.use('/register',async(req,res)=>{
    let new_login=new Login(req.body);
    let username=new_login.username;
    console.log(new_login,username)
    let user=await Login.findOne({username:username})
    if(user!==null){
        res.send({
            message:"User already exists"
        })
    }
    //hashing the password
    new_login.password=await bcryptjs.hash(new_login.password,6)
    new_login.save()
    .then(()=>{
        res.send({
            message:"Registration Success",
            payload:new_login
        })
    }).catch(err=>{
        res.send({
            message:"Error",
            payload:err
        })
    })
})


//user login
userApp.post('/login',async(req,res)=>{
    let userData=req.body
    let dbUser=await Login.findOne({username:userData.username})
    if(dbUser==null){
        res.send({
            message:"Invalid User"
        })
    }
    await bcryptjs.compare(userData.password,dbUser.password)
    .then(result=>{
        if(result==true){
            let userToken=jwt.sign({username:dbUser.username},'Scarlet',{expiresIn:"30min"})
            res.send({
                message:"Login Success",
                token:userToken,
                currentUser:dbUser
            })
        }else{
            res.send({
                message:"Invalid Password"
            })
        }
    })
})

//schema for user history
const HistorySchema=mongoose.Schema({
    username:String,
    history:[{
        animename:String,
        episodes:[{
            number:Number,
            time:Date
        }]
    }]
})
const History=mongoose.model('History',HistorySchema)
//user history
userApp.post('/history',verifyToken,async(req,res)=>{
    let newData=req.body
    //checking that the user already had a history
    let dbUser=await History.findOne({username:newData.username})
    if(dbUser===null){
        //if the user dont have a history create one
        let newHistory=new History(newData)
        await newHistory.save().then(
            res.send({
                message:"New Anime History is created",
                payload:newHistory
            })
        )
    }else{
        let animeIndex=dbUser.history.findIndex(x=>{
            return x.animename==newData.history.animename
        })
        if(animeIndex===-1){
            dbUser.history.push(newData.history)
        }else{
            dbUser.history[animeIndex].episodes.push(newData.history.episodes)
            dbUser.history[animeIndex].episodes.sort((a,b)=>{
                return new Date(b.time).getTime()-new Date(a.time).getTime()
            })
        }
        dbUser.history.sort((a,b)=>{
            const A=a.episodes[0].time;
            const B=b.episodes[0].time;
            return new Date(B).getTime()-new Date(A).getTime()
        })
        res.send({
            message:"New Data is added to the user",
            payload:dbUser
        })
        await History.findOneAndUpdate(
            {username:dbUser.username},
            {$set:{history:dbUser.history}}
        )
    }
})

//to get the continue watching list of animes
userApp.get('/userHistory/:username',verifyToken,(req,res)=>{
    let username=req.params.username
    History.findOne({username:username})
    .then(data=>{
        if(!data){
            res.send({
                message:"No data found"
            })
        }
        let jsonData=data.history.map(item=>{
            return {
                animename:item.animename,
                episode:item.episodes[0].number
            }
        })
        res.send({
            message:"User history retrieved",
            payload:jsonData
        })
    })
})

module.exports=userApp