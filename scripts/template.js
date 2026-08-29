function getTaskTemplate(i) {
    return `
        <div id="task-${allTasks[i].id}" class="task-card-container task" draggable="true" ondragstart="startDragging('${allTasks[i].id}')" onmousedown="this.style.cursor='grabbing'" onmouseup="this.style.cursor='grab'" onmousemove="this.style.cursor='grab'">
            <div class="task-item">
                <input class="checkbox" id="checkbox" type="checkbox" name="task" ${allTasks[i].checked ? 'checked' : ''} onchange="checkOffToDos(this, '${allTasks[i].id}')">
                <span class="${allTasks[i].checked ? 'checked' : ''}">${allTasks[i].Aufgabe}</span>
                <button class="btn to-do-btn" onclick="deleteTask(${i})" class="btn-font">
                    <img class="trash-icon" src="../assets/icons/delete-icon.svg" alt="delete">
                </button>
            </div>
        </div>
    `
}