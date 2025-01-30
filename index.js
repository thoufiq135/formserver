const express= require("express")
const app=express()

const cors=require("cors")
const mongoos=require("mongoose")
const uri="mongodb+srv://thoufiq:Shaik13579@cluster0.3g7bd.mongodb.net/user?retryWrites=true&w=majority&appName=Cluster0"
require('dotenv').config();

    mongoos.connect(uri).then(()=>{
        console.log("connected to mongoos...")
 

    }).catch((e)=>{
        console.log(e.message)
    })
    const schema=new mongoos.Schema({
        name:String,
        email:String,
        number:String
    })

    const user=new mongoos.model("detail",schema)

app.use(express.json())
app.use(cors())
const port =process.env.port||7000
app.use(async(req,res,next)=>{
    const {name,email,number}=req.body
    console.log(req.body)
    try {
        const nameExists = await user.findOne({ name:name });
        const emailExists = await user.findOne({ email:email });
        const numberExists = await user.findOne({ number:String(number) });

        if (!nameExists&&!emailExists&&!numberExists) {
            console.log("name=",nameExists,emailExists,numberExists)
          return res.status(200).json("Registered");
        
        }else{
            return res.json("Already exists")
        }
        
      } catch (e) {
        console.log(e.message);
        res.status(500).json("Internal Server Error");
      }finally{
        next()
      }
      
    
})
app.get("/",async(req,res)=>{
    res.send("<h1>Hello world<h1/>")
})
app.post("/add",async(req,res)=>{

    const {name,email,number}=req.body
   await user.insertMany({"name":name,"email":email,"number":number})
   res.status(200)


})


app.listen(port,()=>{
    console.log(`server is working on ${port}....`)
})