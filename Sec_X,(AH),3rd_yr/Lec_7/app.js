const express = require("express")
const app = express()
const PORT = 4444;
const path=require("path")
const hbs=require("hbs")
const { v4: uuidv4 } = require('uuid');

let blogs=[]
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.get("/getblogs",(req,res)=>{
    res.render('blogpage',{
     blogs   
    })
})

app.post("/addblog",(req,res)=>{
    const {name,Class,blog}=req.body
    const obj={
        name,
        Class,
        blog,
        blogId:uuidv4()
    }
    blogs.push(obj)
    res.redirect("/getblogs")
})

app.get("/delete/:blogId",(req,res)=>{
    blogs=blogs.filter((item)=>item.blogId!=req.params.blogId)
    res.redirect("/getblogs")
})

app.get("/update/:blogId",(req,res)=>{
    console.log(req.params);
    const updateblog=blogs.filter((item)=>item.blogId==req.params.blogId)
    console.log(updateblog);
    res.render("updateblog",{
        updateblog:updateblog[0]
    })
})



app.post("/updateblog",(req,res)=>{
    const {name,Class,blog,blogId}=req.body
    const newObj={
        name,
        Class,
        blog,
        blogId
    }
 
    blogs=blogs.map((item)=>{
        if(item.blogId==blogId){
            return newObj
        }
        return item
    })
   
    res.redirect("/getblogs")
})


app.listen(PORT,()=>{
    console.log("http://localhost:"+PORT);
})