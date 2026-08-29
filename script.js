const BASE_URL = "https://neuesprojekt-39186-default-rtdb.europe-west1.firebasedatabase.app/";

let currentDraggedElement = null;
let allTasks = [];
let allUsers = [];
let categoryColumns = ["to-dos", "in-progress", "await-feedback", "done"];


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
        allUsers.push({ id: response.name, email: email.value, password: password.value, phoneNumber: phoneNumber.value });
        let registerForm = document.getElementById('register-form');
        registerForm.reset(); // dazu noch eine Notiz machen
        window.location.href = './login.html?msg=Du hast dich erfolgreich registriert'
    } catch (error) {
        console.error("Fehler beim Hochladen der Userdaten", error);
    }
}

function renderTasks() {
    // leert erst alle Spalten, damit beim erneuten Rendern (z.B. nach loadTasks) keine Duplikate entstehen
    for (let category of categoryColumns) {
        document.getElementById(category).innerHTML = "";
    }

    for (let i = 0; i < allTasks.length; i++) {
        let task = allTasks[i];
        // ohne gespeicherte category landet die Task in "to-dos" (z.B. direkt nach dem Erstellen)
        let category = task.category || "to-dos";
        let taskRef = document.getElementById(category);
        // getTaskTemplate liest u.a. allTasks[i].checked und setzt darüber das HTML-checked-Attribut,
        // dadurch bleibt der Haken-Status auch nach einem Reload sichtbar
        taskRef.innerHTML += getTaskTemplate(i);
    }
}

async function deleteTask(i) {
    let id = allTasks[i].id;
    allTasks.splice(i, 1);
    renderTasks();
    await deleteData("tasks/" + id);
}

async function loadTasks() {
    let tasks = await getData("tasks");
    allTasks = [];

    for (let id in tasks) {
        allTasks.push({ id: id, Aufgabe: tasks[id].Aufgabe, category: tasks[id].category, checked: tasks[id].checked || false });
    }
    renderTasks();
    console.log(allTasks);
}

async function checkOffToDos(checkbox, id) {
    let label = checkbox.nextElementSibling;
    let task = allTasks.find(task => task.id === id)

    if (checkbox.checked) {
        label.classList.add('checked');
    } else {
        label.classList.remove('checked');
    }

    if (task) {
        task.checked = checkbox.checked;
    }
    await patchData(`tasks/${id}`, { checked: checkbox.checked });
}

function startDragging(id) { //ondragstart
    currentDraggedElement = id; // hier wird die id des gerade gezogenen Elements in der globalen Variable currentDraggedElement gespeichert.
}

//ondragover
function allowDrop(event) { // damit sage ich dem browser hier ist droppen erlaubt (Browser blockieren standmäßig das droppen)
    event.preventDefault();
}

async function dropElement(event, category) { //ondrop
    event.preventDefault(); //verhindert das Standardverhalten des Browsers (z. B. dass ein Link geöffnet oder Text abgelegt wird).

    let taskElement = document.getElementById(`task-${currentDraggedElement}`); //holt sich das DOM-Element der Task-Karte anhand der zuvor instartDragging` gespeicherten ID.
    event.currentTarget.appendChild(taskElement); //hängt diese Karte in den Container ein, auf den gedroppt wurde (event.currentTarget = die Drop-Zone, z. B. #done).

    let task = allTasks.find(task => task.id === currentDraggedElement);
    if (task) {
        task.category = category;
    }
    await patchData(`tasks/${currentDraggedElement}`, { category: category });
}