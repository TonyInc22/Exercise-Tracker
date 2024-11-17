import express, { json } from 'express';
import { connect, Schema, model } from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(json());

// Connect to MongoDB
connect('mongodb://localhost/mern-stack-db', { useNewUrlParser: true, useUnifiedTopology: true });

// Define routes and middleware
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const todoSchema = new Schema({
    task: String,
    completed: Boolean,
});

const Todo = model('Todo', todoSchema);

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

useEffect(() => {
    axios.get('http://localhost:5000/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error(error));
}, []);

// Create a new todo
app.post('/todos', async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.json(newTodo);
});
// Update an existing todo
app.put('/todos/:id', async (req, res) => {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTodo);
});
// Delete a todo
app.delete('/todos/:id', async (req, res) => {
    await Todo.findByIdAndRemove(req.params.id);
    res.json({ message: 'Todo deleted successfully' });
});