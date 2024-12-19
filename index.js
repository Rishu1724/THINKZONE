const express= require("express");
const app= express();
const port= 8080;
const path= require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");


app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id: uuidv4(),
        username: "Rishuraj",
        content: " i love coding",
    },
    {
        id: uuidv4(),
        username: "Rishukumar",
        content: "hard work is important to achive sucsess",
    },
    {
        id: uuidv4(),
        username: "Rahul kumar",
        content:"i got selected fot my 1st job",
    },
];



app.get("/posts",(req,res) =>{
    res.render("index.ejs",{ posts });
});

app.get("/posts/new",(req,res) =>{
    res.render("new.ejs");
});

app.post("/posts", (req, res) =>{
    let { username, content} = req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    // id = parseInt(id); // Convert id to a number if p.id is numeric
    let post = posts.find((p) => p.id === id);

    if (post) {
        console.log(post);
        res.json(post); // Send the found post as JSON
    } else {
        res.status(404).send("Post not found"); // Handle the case where no post is found
    }
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => p.id === id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("edit.ejs", {post});
});

app.delete("/posts/:id", (req ,res) =>{
    let { id } = req.params;
    posts = posts.filter((p) => p.id !== id);
    res.redirect("/posts");
})

app.listen(port,() =>{
    console.log("listening to port:8080");
});