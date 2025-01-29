const express= require("express")
const app=express()

const cors=require("cors")
const mongoos=require("mongoose")
const uri="mongodb://127.0.0.1:27017/user"
require('dotenv').config();

    mongoos.connect(uri).then(()=>{
        console.log("connected to mongoos...")
 

    }).catch((e)=>{
        console.log(e.message)
    })
    const schema=new mongoos.Schema({
        name:String,
        email:String,
        number:Number
    })

    const user=new mongoos.model("detail",schema)
cors.config
app.use(express.json())
app.use(cors())
const port =process.env.port||7000
app.use(async(req,res,next)=>{
    const {name}= await req.body
    console.log(name)
    try {
        const nameExists = await user.findOne({ name });
        if (nameExists) {
          return res.status(400).json("Name already exists");
        }
        next();
      } catch (e) {
        console.log(e.message);
        res.status(500).json("Internal Server Error");
      }
    
})
app.use(async(req,res,next)=>{
    const {email}= await req.body
    console.log(email)
    try {
        const emailExists = await user.findOne({ email });
        if (emailExists) {
          return res.status(400).json("email already exists");
        }
        next();
      } catch (e) {
        console.log(e.message);
        res.status(500).json("Internal Server Error");
      }
   
})
app.use(async(req,res,next)=>{
    const {number}= await req.body
    console.log(number)
    try {
        const numberExists = await user.findOne({ number });
        if (numberExists) {
          return res.status(400).json("number already exists");
        }
        next();
      } catch (e) {
        console.log(e.message);
        res.status(500).json("Internal Server Error");
      }

})

app.get("/",async(req,res)=>{
    res.send("<h1>Hello world<h1/>")
})
app.post("/add",async(req,res)=>{
    res.send("<h1>Hello world add<h1/>")
    const {name,email,number}=req.body
   await user.insertMany({"name":name,"email":email,"number":number})
   res.status(200)


})


app.listen(port,()=>{
    console.log(`server is working on ${port}....`)
})