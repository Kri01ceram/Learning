const express = require("express");

const app = express();

app.get("/sum/:a/:b",function(req,res){
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    const sum = a + b;
    res.send(`The sum of ${a} and ${b} is ${sum}`);
});
app.get("/multiply/:a/:b",function(req,res){
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    const product = a * b;
    res.send(`The product of ${a} and ${b} is ${product}`);
});
app.get("/sub/:a/:b",function(req,res){
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    const difference = a - b;
    res.send(`The difference of ${a} and ${b} is ${difference}`);
});
app.get("/div/:a/:b",function(req,res){
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    const quotient = a / b;
    res.send(`The quotient of ${a} and ${b} is ${quotient}`);
});

app.listen(3002);