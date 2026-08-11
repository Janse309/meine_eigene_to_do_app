const BASE_URL = "https://neuesprojekt-39186-default-rtdb.europe-west1.firebasedatabase.app/";

let allTasks = [];

function init() {
    document.getElementById('form').addEventListener('submit', addTask);
    loadTasks();
}

async function addTask(event) {
    event.preventDefault();

    let inputContent = document.getElementById('task-input');
    let taskInput = inputContent.value;
    let response = await postData("tasks", { Aufgabe: taskInput });
    allTasks.push({ Aufgabe: taskInput, id: response.name});

    renderTasks();
    inputContent.value = "";
}

async function deleteTask(i) {
    let id = allTasks[i].id;
    allTasks.splice(i, 1);
    renderTasks();
    await deleteData("tasks/" + id);
}

function renderTasks() {
    let taskRef = document.getElementById('content-area');
    taskRef.innerHTML = "";
    for (let i = 0; i < allTasks.length; i++) {
        taskRef.innerHTML += `
            <ul class="to-dos">
                <input type="checkbox" name="task" onchange="checkOffToDos(this)">
                <span>${allTasks[i].Aufgabe}</span>
                <button class="btn to-do-btn" onclick="deleteTask(${i})" class="btn-font"><img src="./assets/icons/delete-icon.svg" alt="delete"</button>
            </ul>
                `
    }
}

async function postData(path = "", data = {}) {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "POST",
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(data)
    });
    return responseToJson = await response.json();
}

async function getData(path = "") {
    let response = await fetch(BASE_URL + path + ".json");
    return data = await response.json();
}

async function deleteData(path = "") {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "DELETE",
    });
    console.log(path)
    return responseToJson = await response.json();
}

async function loadTasks() {
    let tasks = await getData("tasks");
    allTasks = [];

    for (let id in tasks) {
        allTasks.push({ id: id, Aufgabe: tasks[id].Aufgabe });
    }
    renderTasks();
    console.log(allTasks);
}
 
function checkOffToDos(checkbox) {
    let label = checkbox.nextElementSibling;

    if (checkbox.checked) {
        label.classList.add('checked');
    } else {
        label.classList.remove('checked');
    }
}




// papierkorb icon hinzufügen
// deleteData Dokumentation lesen

// - allTasks ist jetzt ein Array von Objekten -> task.Aufgabe statt allTasks[i]
// - onchange ruft toggleTask() mit der id des Tasks und this.checked (neuer Checkbox-Zustand) auf
// - ${task.erledigt ? "checked" : ""} sorgt dafür, dass bereits erledigte Tasks nach
//   einem Reload auch als angehakt angezeigt werden

