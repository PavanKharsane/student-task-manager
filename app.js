const API = "http://localhost:3000/api/tasks"

function loadTasks() {

    fetch(API)
        .then(res => res.json())
        .then(data => {

            const list = document.getElementById("taskList")
            list.innerHTML = ""

            data.forEach(t => {

                const li = document.createElement("li")

                li.innerText = t.task

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

loadTasks()