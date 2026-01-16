const express = require("express");
const app = express();

app.use(express.json());

let todos = [
    { id: 1, title: "learn git stash", done: false },
    { id: 2, title: "build express api", done: true },
];

let products = [
    { id: 1, title: "training products" },
];

app.get("/health", (req, res) => {
    res.json({ ok: true });
});

app.get("/todos", (req, res) => {
    res.json(todos);
});

app.post("/todos", (req, res) => {
    const { title } = req.body;

    if (!title || title.trim().length < 2) {
        return res.status(400).json({ error: "title is required (min 2 chars)" });
    }

    const newTodo = {
        id: Date.now(),
        title: title.trim(),
        done: false,
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.patch("/todos/:id", (req, res) => {
    const id = Number(req.params.id);
    const todo = todos.find((t) => t.id === id);

    if (!todo) {
        return res.status(404).json({ error: "todo not found" });
    }

    const { title, done } = req.body;

    if (title !== undefined) todo.title = String(title).trim();
    if (done !== undefined) todo.done = Boolean(done);

    res.json(todo);
});

app.delete("/todos/:id", (req, res) => {
    const id = Number(req.params.id);
    const before = todos.length;

    todos = todos.filter((t) => t.id !== id);

    if (todos.length === before) {
        return res.status(404).json({ error: "todo not found" });
    }

    res.status(204).send();
});


app.get("/products", (req, res) => {
    res.json(products);
});

// Add this array
let users = [{ id: 1, name: "John Doe", email: "john@example.com" }];

// Add these routes at the bottom
app.get("/users", (req, res) => {
    res.json(users);
});

app.post("/users", (req, res) => {
    const { name, email } = req.body;
    if (!name) return res.status(400).json({ error: "name is required" });

    const newUser = { id: Date.now(), name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Auth Feature
const registeredUsers = [];

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }
    const userExists = registeredUsers.find(u => u.username === username);
    if (userExists) {
        return res.status(400).send('User already exists');
    }
    registeredUsers.push({ username, password });
    res.status(201).send('User registered successfully');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = registeredUsers.find(u => u.username === username && u.password === password);
    if (user) {
        res.send('Login successful');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

module.exports = app;

