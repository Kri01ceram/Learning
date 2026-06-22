const express = require('express');
const { authMiddleware } = require('./middleware');
const jwt = require('jsonwebtoken');
const { userModel, todoModel } = require('./models');

const app = express();
app.use(express.json());


app.post("/signup", (req, res) => {
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