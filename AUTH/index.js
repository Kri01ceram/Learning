const express = require('express');
const path = require('path');

const app = express();
const notes = [];

app.post("/notes", (req, res) => {
    const note = req.body.note;
    notes.push(note);
    res.json({ message: "Note added successfully" });
});

app.get("/notes", (req, res) => {
    res.json({ notes });
});
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "Frontend", "index.html"));
});

app.listen(3004);