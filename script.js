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

    allTasks.push(taskInput);
    await postData("tasks", { Aufgabe: taskInput });
    console.log(allTasks);
    renderTasks();
    inputContent.value = "";
}

function renderTasks() {
    let taskRef = document.getElementById('content-area');
    taskRef.innerHTML = "";
    for (let i = 0; i < allTasks.length; i++) {
        taskRef.innerHTML += `
            <ul>
                <input type="checkbox" name="task">
                <span>${allTasks[i]}</span>
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
    let data = await response.json();
    console.log(data);
    return data;
}

async function loadTasks() {
    let tasks = await getData("tasks"); // tasks laden
    allTasks = []; 

    for (let id in tasks) {
        allTasks.push(tasks[id].Aufgabe);
    }

    renderTasks();
}





// Delete Data einfügen
// deleteData Dokumentation lesen

// - allTasks ist jetzt ein Array von Objekten -> task.Aufgabe statt allTasks[i]
// - onchange ruft toggleTask() mit der id des Tasks und this.checked (neuer Checkbox-Zustand) auf
// - ${task.erledigt ? "checked" : ""} sorgt dafür, dass bereits erledigte Tasks nach
//   einem Reload auch als angehakt angezeigt werden

