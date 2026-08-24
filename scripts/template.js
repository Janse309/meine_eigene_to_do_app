function getTaskTemplate(i) {
    return `
        <div id="task-${i}" class="task-card-container task" draggable="true" ondragstart="startDragging(${i})" ondragend="this.style.cursor='grab'" onmousedown="this.style.cursor='grabbing'" onmouseup="this.style.cursor='grab'">
            <div class="task-item">
                <input class="checkbox" type="checkbox" name="task" onchange="checkOffToDos(this)">
                <span>${allTasks[i].Aufgabe}</span>
                <button class="btn to-do-btn" onclick="deleteTask(${i})" class="btn-font">
                    <img class="trash-icon" src="../assets/icons/delete-icon.svg" alt="delete">
                </button>
            </div>
        </div>
    `
}