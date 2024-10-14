const express = require("express");
const zod = require("zod");
const cors = require("cors");
const app = express();
const TodoModel = require("./db");

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json());

const todosSchema = zod.object({
    title: zod.string(),
    completed: zod.boolean(),
});

// Create
app.post('/api/todos', async (req, res) => {
    const { success } = todosSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "Incorrect inputs"
        });
    }
    try {
        const newTodo = await TodoModel.create({
            title: req.body.title,
            completed: req.body.completed,
        });
        res.status(201).json({
            message: "Todo created successfully",
            data: newTodo,
        });
    } catch (error) {
        console.error("Error creating todo:", error);
        res.status(500).json({
            message: "Server error",
            error: error.message 
        });
    }
});

// Read
app.get('/api/todos', async (req, res) => {
    try {
        const allTodos = await TodoModel.find(); 
        res.json(allTodos); 
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Update 
app.put('/api/todos', async (req, res) => {
    if (!req.body.title) {
        return res.status(400).json({ msg: "title is required." });
    }
    try {
        const updatedTodos = await TodoModel.updateOne(
            { title: req.body.title },
            {
                completed: req.body.completed,
            }
        );

        if (updatedTodos.modifiedCount === 0) {
            return res.status(404).json({ msg: "To-Do not found or no changes made." });
        }

        res.json({
            msg: "To-Do Updated!"
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
});

// Delete
app.delete('/api/todos', async (req, res) => {
    if (!req.body.title) {
        return res.status(400).json({ msg: "title is required." });
    }

    try {
        const deletedTodos = await TodoModel.deleteOne({ title: req.body.title });

        if (deletedTodos.deletedCount === 0) {
            return res.status(404).json({ msg: "To-Do not found." });
        }

        res.send("Deleted"); // No content to return
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

app.listen(3110, () => {
    console.log("Server is running on port 3110");
});
