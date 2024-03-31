const jwt=require('jsonwebtoken')
const verifyToken=(req,res,next)=>{
    let bearerToken=req.headers.authorization
    if(bearerToken==undefined){
        res.send("Unauthorized Access.")
    }
    let token=bearerToken.split(' ')[1]
    try{
        let decodedToken=jwt.verify(token,'Scarlet')
        next()
    }catch(err){
        res.send(err)
    }
}
module.exports=verifyToken