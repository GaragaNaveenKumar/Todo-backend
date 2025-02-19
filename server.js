const express=require('express');
const mongoose=require('mongoose');
const TaskSchema=require('./model');
const cors=require('cors');
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;


const app=express();
app.use(express.json())
app.use(cors({
    origin:"*"
}));
mongoose.connect(mongoURI).then(
    ()=>console.log("DB connected ...")
).catch((err)=>console.log(err.message))


app.post('/addtask',async (req,res)=>{
    const {todo}=req.body;
    try{
        const newdata=new TaskSchema({
            todo:todo
        })
        await newdata.save();
        return res.json(await TaskSchema.find());

    }catch(err){
        console.log(err.message);
    }
})

app.get('/gettasks',async (req,res)=>{
    try{
        return res.json(await TaskSchema.find());

    }catch(err){
        console.log(err.message);
    }
})

app.delete('/delete/:id',async (req,res)=>{
    try{
        await TaskSchema.findByIdAndDelete(req.params.id);
        return res.json(await TaskSchema.find());

    }catch(err){
        console.log(err.message);
    }
})

app.listen(5000,()=>console.log("server running ..."));