const BASE_URL = "https://neuesprojekt-39186-default-rtdb.europe-west1.firebasedatabase.app/";

let allTasks = [];
let allUsers = [];

function init() {
    document.getElementById('form').addEventListener('submit', addTask);
    loadTasks();
}

async function addTask(event) {
    event.preventDefault();

    let inputContent = document.getElementById('task-input');
    let taskInput = inputContent.value;
    let response = await postData("tasks", { Aufgabe: taskInput });
    allTasks.push({ Aufgabe: taskInput, id: response.name });

    renderTasks();
    inputContent.value = "";
}

async function registerUser() {
    try {
        let email = document.getElementById('email');
        let password = document.getElementById('password');
        let phoneNumber = document.getElementById('tel');
        let response = await postData('users', { email: email.value, password: password.value, phoneNumber: phoneNumber.value });
        allUsers.push({ id: response.name, email: email.value, password: password.value, phoneNumber: phoneNumber.value});
        let registerForm = document.getElementById('register-form');
        registerForm.reset(); // dazu noch eine Notiz machen
    } catch (error) {
        console.error("Fehler beim Hochladen der Userdaten", error);
    }
}

async function deleteTask(i) {
    let id = allTasks[i].id;
    allTasks.splice(i, 1);
    renderTasks();
    await deleteData("tasks/" + id);
}

function renderTasks() {
    let taskRef = document.getElementById('taskboard-content');
    taskRef.innerHTML = "";
    for (let i = 0; i < allTasks.length; i++) {
        taskRef.innerHTML += getTaskTemplate(i)
    }
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

