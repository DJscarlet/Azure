const express=require('express')
const homeApp=express.Router()
const mongoose=require('mongoose')
homeApp.use(express.json())

const trending_anime_schema=new mongoose.Schema({
    mal_id:Number,
    number:String,
    name:String,
    imageid:String
})

const slideSchema = new mongoose.Schema({
    mal_id:Number,
    name:String,
    imageid:String,
    spotlight:String,
    mode:String,
    ep_time:String,
    realease_date:String,
    quality:String,
    description:String
})

const slide=mongoose.model("slidedata",slideSchema);
const trending_Slide=mongoose.model("trending_anime_data",trending_anime_schema);

homeApp.post('/trending_anime_data',async (req,res)=>{
    const new_trending_slide= new trending_Slide({
        mal_id:req.body.mal_id,
        number:req.body.number,
        name:req.body.name,
        imageid:req.body.imageid
    })
    new_trending_slide.save()
    .then(
        res.send("Success")
    ).catch(err=>{
        res.sendStatus(400).send("Error:",err)
    })
})
homeApp.get('/trending_anime_data_retrieve',async(req,res)=>{
    try{
      const data=await  trending_Slide.find().exec();
      res.json(data)  
    }catch(err){
      console.log(err);
      res.status(500).send("Error occured")
    }
})

homeApp.post('/slide_data',(req,res)=>{
    const newslide=new slide({
      mal_id:req.body.mal_id,
      name: req.body.name,
      imageid : req.body.imageid,
      spotlight:req.body.spotlight,
      mode:req.body.mode,
      ep_time:req.body.ep_time,
      realease_date:req.body.realease_date,
      quality:req.body.quality,
      description:req.body.description
    })
    newslide.save()
    .then(()=>{
      res.send("Success")
    }).catch(error=>{
      res.status(400).send(error)
    });
})
homeApp.get('/slide_data',async(req,res)=>{
    try{
        const slidedata = await slide.find().exec();
        res.json(slidedata)
    }catch(err){
        console.error(err);
        res.status(500).send('Error fetching slide data');
    }
})

homeApp.delete('/',async(req,res)=>{
    await trending_Slide.deleteOne().then(()=>{
        res.send("deleted")
    })
})

module.exports=homeApp