const express = require('express');
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_Pdko5yKBw8fH@ep-lucky-voice-atf6na7j-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
})
const app = express();
app.use(express.json());

app.post("/signup",async (req,res)=>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const result = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id', [username, email, password]);
    res.json({message: "User created successfully", userId: result.rows[0].id});
})
app.post("/signin",async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const result = await pool.query('SELECT id FROM users WHERE email = $1 AND password = $2', [email, password]);
    if (result.rows.length > 0) {
        res.json({message: "Signin successful", userId: result.rows[0].id});
    } else {
        res.status(401).json({message: "Invalid credentials"});
    }
})
app.listen(3000);