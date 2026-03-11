const API = "/api/tasks"

function loadTasks() {

    fetch(API)
        .then(res => res.json())
        .then(data => {

            const tasks = data.data
            const list = document.getElementById("taskList")

            list.innerHTML = ""

            document.getElementById("taskCount").innerText =
                tasks.length + " Tasks"

            tasks.forEach(task => {

                const li = document.createElement("li")

                const text = document.createElement("span")
                text.className = "task-text"

                if (task.status === "completed") {
                    text.classList.add("completed")
                }

                text.innerText = task.task

                const buttons = document.createElement("div")
                buttons.className = "buttons"

                const completeBtn = document.createElement("button")
                completeBtn.innerText = "✔"
                completeBtn.className = "complete-btn"

                completeBtn.onclick = () => toggleTask(task.id)

                const deleteBtn = document.createElement("button")
                deleteBtn.innerText = "✖"
                deleteBtn.className = "delete-btn"

                deleteBtn.onclick = () => deleteTask(task.id)

                buttons.appendChild(completeBtn)
                buttons.appendChild(deleteBtn)

                li.appendChild(text)
                li.appendChild(buttons)

                list.appendChild(li)

            })

        })

}

function addTask() {

    const input = document.getElementById("taskInput")

    if (input.value === "") return

    fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ task: input.value })
    })
        .then(() => {
            input.value = ""
            loadTasks()
        })

}

function toggleTask(id) {

    fetch(API + "/" + id, {
        method: "PUT"
    })
        .then(() => loadTasks())

}

function deleteTask(id) {

    fetch(API + "/" + id, {
        method: "DELETE"
    })
        .then(() => loadTasks())

}

loadTasks()