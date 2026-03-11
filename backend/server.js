const express = require("express")
const cors = require("cors")
const path = require("path")

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

/* -------------------------
   In-memory Task Database
--------------------------*/

let tasks = [
    { id: 1, task: "Learn Docker", status: "pending" },
    { id: 2, task: "Learn Terraform", status: "pending" },
    { id: 3, task: "Deploy Project", status: "pending" }
]

/* -------------------------
   API ROUTES
--------------------------*/

/* Get all tasks */
app.get("/api/tasks", (req, res) => {
    res.json({
        success: true,
        count: tasks.length,
        data: tasks
    })
})

/* Add new task */
app.post("/api/tasks", (req, res) => {

    const { task } = req.body

    if (!task) {
        return res.status(400).json({
            success: false,
            message: "Task text is required"
        })
    }

    const newTask = {
        id: tasks.length + 1,
        task: task,
        status: "pending"
    }

    tasks.push(newTask)

    res.status(201).json({
        success: true,
        message: "Task added",
        data: newTask
    })
})

/* Toggle task status (pending / completed) */
app.put("/api/tasks/:id", (req, res) => {

    const id = parseInt(req.params.id)

    const task = tasks.find(t => t.id === id)

    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Task not found"
        })
    }

    task.status = task.status === "pending" ? "completed" : "pending"

    res.json({
        success: true,
        message: "Task updated",
        data: task
    })
})

/* Delete task */
app.delete("/api/tasks/:id", (req, res) => {

    const id = parseInt(req.params.id)

    const exists = tasks.find(t => t.id === id)

    if (!exists) {
        return res.status(404).json({
            success: false,
            message: "Task not found"
        })
    }

    tasks = tasks.filter(t => t.id !== id)

    res.json({
        success: true,
        message: "Task deleted"
    })
})

/* -------------------------
   Serve Frontend
--------------------------*/

app.use(express.static(path.join(__dirname, "../frontend")))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"))
})

/* -------------------------
   Start Server
--------------------------*/

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})