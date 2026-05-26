const express = require("express");
const path = require("path");

const app = express();

app.get("/",function(req,res){
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/sum/:a/:b",function(req,res){
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    const sum = a + b;
    res.json({ result: `The sum of ${a} and ${b} is ${sum}` });
});
app.get("/multiply/:a/:b",function(req,res){
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    const product = a * b;
    res.json({ result: `The product of ${a} and ${b} is ${product}` });
});
app.get("/sub/:a/:b",function(req,res){
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    const difference = a - b;
    res.json({ result: `The difference of ${a} and ${b} is ${difference}` });
});
app.get("/div/:a/:b",function(req,res){
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    const quotient = a / b;
    res.json({ result: `The quotient of ${a} and ${b} is ${quotient}` });
});

app.listen(3002);