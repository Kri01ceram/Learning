const express = require('express');

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

app.listen(3000);