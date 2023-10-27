const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Serve main.html on root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'main.html'));
});

let todos = []; // This will store our todos in memory

app.post('/todos', (req, res) => {
  const todo = { id: Date.now().toString(), text: req.body.text, done: false };
  todos.push(todo);
  res.status(201).json(todo);
});

app.get('/todos', (req, res) => {
  res.status(200).json(todos);
});

app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { text, done } = req.body;
  const todoIndex = todos.findIndex(todo => todo.id === id);
  
  if (todoIndex > -1) {
    todos[todoIndex] = { id, text, done };
    res.status(200).json(todos[todoIndex]);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id !== id);
  res.status(200).json({ message: 'Todo deleted' });
});

app.listen(3000, () => console.log('Server started'));
