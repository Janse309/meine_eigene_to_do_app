const BASE_URL = "https://neuesprojekt-39186-default-rtdb.europe-west1.firebasedatabase.app/";

let allTasks = [];

function init() {
    document.getElementById('form').addEventListener('submit', addTask);
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




























// ============================================================
// TODO: getData(path) - lädt Tasks von Firebase (GET)
// ============================================================
// async function getData(path = "") {
//     let response = await fetch(BASE_URL + path + ".json");
//     return await response.json();
//     // Ergebnis sieht so aus: { "-Nabc123": { Aufgabe: "...", erledigt: false }, "-Nxyz789": {...} }
//     // (ein Objekt, key = von Firebase generierte ID, value = der Task)
// }


// ============================================================
// TODO: loadTasks() - füllt allTasks beim Start mit den Firebase-Daten
// ============================================================
// async function loadTasks() {
//     let tasks = await getData("tasks");
//     allTasks = [];
//
//     if (tasks) {
//         for (let id in tasks) {
//             allTasks.push({
//                 id: id,
//                 Aufgabe: tasks[id].Aufgabe,
//                 erledigt: tasks[id].erledigt
//             });
//         }
//     }
//
//     renderTasks();
// }
//
// WICHTIG: in init() muss loadTasks() aufgerufen werden, sonst passiert das nie
// function init() {
//     document.getElementById('form').addEventListener('submit', addTask);
//     loadTasks();
// }


// ============================================================
// TODO: addTask() anpassen - jetzt Objekte statt Strings speichern
// ============================================================
// async function addTask(event) {
//     event.preventDefault();
//
//     let inputContent = document.getElementById('task-input');
//     let taskInput = inputContent.value;
//
//     let newTask = { Aufgabe: taskInput, erledigt: false };
//     let response = await postData("tasks", newTask);
//     // response.name enthält die von Firebase generierte ID des neuen Eintrags
//
//     allTasks.push({ id: response.name, Aufgabe: taskInput, erledigt: false });
//
//     renderTasks();
//     inputContent.value = "";
// }


// ============================================================
// TODO: toggleTask(id, erledigt) - wird beim Anklicken der Checkbox aufgerufen
// ============================================================
// async function toggleTask(id, erledigt) {
//     let task = allTasks.find(t => t.id === id);
//     task.erledigt = erledigt;
//
//     await patchData("tasks/" + id, { erledigt: erledigt });
//     // PATCH ändert in Firebase NUR das Feld "erledigt" bei GENAU diesem Eintrag
// }


// ============================================================
// TODO: patchData(path, data) - analog zu postData, aber method: "PATCH"
// ============================================================
// async function patchData(path = "", data = {}) {
//     let response = await fetch(BASE_URL + path + ".json", {
//         method: "PATCH",
//         headers: { 'Content-Type': 'application/json', },
//         body: JSON.stringify(data)
//     });
//     return await response.json();
// }


// ============================================================
// TODO: renderTasks() anpassen
// ============================================================
// function renderTasks() {
//     let taskRef = document.getElementById('content-area');
//     taskRef.innerHTML = "";
//     for (let i = 0; i < allTasks.length; i++) {
//         let task = allTasks[i];
//         taskRef.innerHTML += `
//             <ul>
//                 <li>
//                     <input type="checkbox" name="task" onchange="toggleTask('${task.id}', this.checked)" ${task.erledigt ? "checked" : ""}>
//                     <span>${task.Aufgabe}</span>
//                 </li>
//             </ul>
//                 `
//     }
// }
// - allTasks ist jetzt ein Array von Objekten -> task.Aufgabe statt allTasks[i]
// - onchange ruft toggleTask() mit der id des Tasks und this.checked (neuer Checkbox-Zustand) auf
// - ${task.erledigt ? "checked" : ""} sorgt dafür, dass bereits erledigte Tasks nach
//   einem Reload auch als angehakt angezeigt werden

