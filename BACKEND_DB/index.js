const express = require('express');
const { authMiddleware } = require('./middleware');
const jwt = require('jsonwebtoken');
const { userModel, todoModel } = require('./models');

const app = express();
app.use(express.json());


app.post("/signup",async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const existing = await userModel.findOne({username: username, password: password});
    if(existing){
        res.status(400).json({message: "User already exists"});
        return
    }
    const newuser = await userModel.create({username: username, password: password});
    res.status(200).json({message: "User created successfully"});

})
app.post("/signin", (req, res) => {
})
app.post("/todo", authMiddleware, (req, res) => {
    const userId = req.userId;
    const title = req.body.title
    const description = req.body.description

    
})
app.delete("/todo/:todoId", authMiddleware, (req, res) => {
    const userId = req.userId;
    const todoId = req.params.todoId;


})
app.post("/todos", authMiddleware, (req, res) => {
    const userId = req.userId;
})

app.listen(3000);