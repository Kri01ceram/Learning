const express = require('express');
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_Pdko5yKBw8fH@ep-lucky-voice-atf6na7j-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
})
const app = express();
app.use(express.json());

app.post("/signup",async (req,res)=>{
    const username = req.body.username;
    const emoll = req.body.emoll;
    const password = req.body.password;

    await pool.query('INSERT INTO users (username, emoll, password) VALUES ($1, $2, $3)', [username, emoll, password]);
    res.json({message: "User created successfully"});

})
app.post("/signin",(req,res)=>{

})
app.listen(3000);