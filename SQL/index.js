const express = require('express');
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_Pdko5yKBw8fH@ep-lucky-voice-atf6na7j-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
})
const app = express();
app.use(express.json());

// Sign up a new user.
app.post("/signup", async (req, res) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "username, email, and password are required" });
        }

        const result = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id',
            [username, email, password]
        );

        res.status(201).json({ message: "User created successfully", userId: result.rows[0].id });
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({ message: "Email already exists" });
        }

        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Sign in an existing user.
app.post("/signin", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            return res.status(400).json({ message: "email and password are required" });
        }

        const result = await pool.query(
            'SELECT id FROM users WHERE email = $1 AND password = $2',
            [email, password]
        );

        if (result.rows.length > 0) {
            res.json({ message: "Signin successful", userId: result.rows[0].id });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Create a todo for a user.
app.post("/todos", async (req, res) => {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const userId = req.body.userId;

        if (!title || !description || !userId) {
            return res.status(400).json({ message: "title, description, and userId are required" });
        }

        const todoResult = await pool.query(
            'INSERT INTO todos (title, description, done, user_id) VALUES ($1, $2, $3, $4) RETURNING id, title, description, done, user_id, created_at',
            [title, description, false, userId]
        );

        res.status(201).json({ message: "Todo created successfully", todo: todoResult.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get all todos for a specific user.
app.get("/todos/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        const result = await pool.query(
            'SELECT id, title, description, done, user_id, created_at FROM todos WHERE user_id = $1 ORDER BY created_at DESC',
            [userId]
        );

        res.json({ todos: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get a single todo by its id.
app.get("/todo/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const result = await pool.query(
            'SELECT id, title, description, done, user_id, created_at FROM todos WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.json({ todo: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Update a todo's title, description, or done status.
app.put("/todos/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const title = req.body.title;
        const description = req.body.description;
        const done = req.body.done;

        if (title === undefined && description === undefined && done === undefined) {
            return res.status(400).json({ message: "At least one field (title, description, done) is required" });
        }

        const currentTodoResult = await pool.query('SELECT id, title, description, done FROM todos WHERE id = $1', [id]);

        if (currentTodoResult.rows.length === 0) {
            return res.status(404).json({ message: "Todo not found" });
        }

        const currentTodo = currentTodoResult.rows[0];
        const updatedTitle = title !== undefined ? title : currentTodo.title;
        const updatedDescription = description !== undefined ? description : currentTodo.description;
        const updatedDone = done !== undefined ? done : currentTodo.done;

        const result = await pool.query(
            'UPDATE todos SET title = $1, description = $2, done = $3 WHERE id = $4 RETURNING id, title, description, done, user_id, created_at',
            [updatedTitle, updatedDescription, updatedDone, id]
        );

        res.json({ message: "Todo updated successfully", todo: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Toggle the done status of a todo.
app.patch("/todos/:id/done", async (req, res) => {
    try {
        const id = req.params.id;

        const result = await pool.query(
            'UPDATE todos SET done = NOT done WHERE id = $1 RETURNING id, title, description, done, user_id, created_at',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.json({ message: "Todo status toggled successfully", todo: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Delete a todo.
app.delete("/todos/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const result = await pool.query(
            'DELETE FROM todos WHERE id = $1 RETURNING id',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.listen(3000);