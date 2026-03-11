const API = "/api/tasks"

function loadTasks() {

    fetch(API)
        .then(res => res.json())
        .then(data => {

            const list = document.getElementById("taskList")
            list.innerHTML = ""

            data.forEach(task => {

                const li = document.createElement("li")

                li.innerText = task.task

                const del = document.createElement("button")

                del.innerText = "Delete"
                del.className = "delete-btn"

                del.onclick = () => deleteTask(task.id)

                li.appendChild(del)

                list.appendChild(li)

            })

        })

}

function addTask() {

    const input = document.getElementById("taskInput")

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

function deleteTask(id) {

    fetch(API + "/" + id, {
        method: "DELETE"
    })
        .then(() => loadTasks())

}

loadTasks()