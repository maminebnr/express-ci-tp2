const express = require("express");
const app = express();

app.use(express.json());

let todos = [
  { id: 1, title: "learn git stash", done: false },
  { id: 2, title: "build express api", done: true },
];



app.get("/command", (req, res) => {
  res.json(todos);
});

app.post("/command", (req, res) => {
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

app.patch("/command/:id", (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: "command not found" });
  }

  const { title, done } = req.body;

  if (title !== undefined) todo.title = String(title).trim();
  if (done !== undefined) todo.done = Boolean(done);

  res.json(todo);
});

app.delete("/command/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = todos.length;

  todos = todos.filter((t) => t.id !== id);

  if (todos.length === before) {
    return res.status(404).json({ error: "command not found" });
  }

  res.status(204).send();
});

module.exports = app;

