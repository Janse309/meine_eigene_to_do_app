function getTaskTemplate(i) {
    return `
        <div class="task-card-container">
            <div draggable="true" class="task-item">
                <input class="checkbox" type="checkbox" name="task" onchange="checkOffToDos(this)">
                <span>${allTasks[i].Aufgabe}</span>
                <button class="btn to-do-btn" onclick="deleteTask(${i})" class="btn-font"><img src="../assets/icons/delete-icon.svg" alt="delete"></button>
            </div>
        </div>
    `
}