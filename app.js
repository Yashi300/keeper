const express=require("express");
const bodyParser=require("body-parser");
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb+srv://Yashi_7103:Yashi123@cluster0.rt2ewjo.mongodb.net/notes');
const app=express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors());

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
    content: {
        type: String,
        required: true
      }
  });

  const notes = mongoose.model('note', notesSchema);
//   const fluffy = new notes({ title: 'fluffy', content:"dsf" });
//   fluffy.save().then(() => console.log('meow'));
  
  app.post("/addnote",(req, res)=>{
    console.log(req.body);
    const Note = new notes({ title: req.body.title, content:req.body.content });
    Note.save().then(() => console.log('meow'));
    res.send(Note);
})
  app.get("/getnote",async(req, res)=>{
    console.log(req.body);
    const Note = await notes.find();
    console.log(Note);
    res.send(Note);
})
  app.post("/deletenote/:id",async(req, res)=>{
    console.log(req.body);
    const Note = await notes.findByIdAndDelete(req.params.id);
    console.log(Note);
    const Notee = await notes.find();
    res.send(Notee);
})

app.listen(8000, ()=>{
    console.log("listning successfully");
})