//Data saved in a file using mongoose




const express=require("express");
const path=require("path");
const fs=require("fs");
const app=express();
const port = process.env.PORT || 2200;


// const bodyparser=require("body-parser");

// Getting started .js for mongoose
var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/contactDance",{useNewUrlParser:true,useUnifiedTopology: true });

//Define mongoose schema
var DcontactSchema= new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
   address:String,
    desc:String

});

var Contact = mongoose.model("Contact",DcontactSchema);

//EXPRESS SPECIFIC STUFF

app.use('/static',express.static('static'))
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'))


//ENDPOINTS

app.get('/',(req,res)=>{
    const params={}
    res.status(200).render('home.pug',params);
})

app.get('/contact',(req,res)=>{
    const params={}
    res.status(200).render('contact.pug',params);
})

app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
       res.send("This item has been saved to the database")
      
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
 
})



//START THE SERVER
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
});