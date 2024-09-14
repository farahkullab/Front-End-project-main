var colorCircles = document.getElementsByClassName('color-circle');
var toggleButton = document.getElementById('toggleButton');
var colorPalette = document.getElementById('colorPalette');
var todoInput = document.getElementById("todoText");
var addTaskButton = document.getElementById("AddUpdateClick");
var taskList = document.getElementById("list-items");
var deleteAllBtn = document.getElementById("clearAllTasks");

toggleButton.addEventListener('click', () => {
    if (colorPalette.style.display === 'grid') {
        colorPalette.style.display = 'none';
    } else {
        colorPalette.style.display = 'grid';
    }
});

for (let i = 0; i < colorCircles.length; i++) {
    colorCircles[i].addEventListener('click', () => {
        const color = getComputedStyle(colorCircles[i]).backgroundColor;
        document.body.style.backgroundColor = color;
        localStorage.setItem('backgroundColor', color);
    });
}

const savedColor = localStorage.getItem('backgroundColor');
if (savedColor) {
    document.body.style.backgroundColor = savedColor;
}

// Font Selection Handling
const fontSelect = document.getElementById("fontSelect");
fontSelect.addEventListener("change", () => {
    const selectedFont = fontSelect.value;
    document.body.style.fontFamily = selectedFont;
    localStorage.setItem('selectedFont', selectedFont);
});

const savedFont = localStorage.getItem('selectedFont');
if (savedFont) {
    document.body.style.fontFamily = savedFont;
    fontSelect.value = savedFont;
}
function loadTasks() {
    let tasks = localStorage.getItem("tasks");
    if (tasks) {
        tasks = tasks.split(",");
    } else {
        tasks = [];
    }

    for (let i = 0; i < tasks.length; i++) {
        addTaskToDOM(tasks[i]);
    }
}
window.addEventListener("load", loadTasks);

function addTaskToDOM(task) {
    const li = document.createElement("li");
    
    li.innerHTML = '<input type="checkbox" class="todo-checkbox"> ' + 
                    '<span>' + task + '</span>' + 
                    '<img src="./logo/trash.png" alt="Delete task" class="todo-controls delete-btn">';

    taskList.appendChild(li);

    li.querySelector(".delete-btn").addEventListener("click", () => {
        deleteTask(task, li);
    });

    li.querySelector(".todo-checkbox").addEventListener("change", function () {
        if (this.checked) {
            li.querySelector("span").style.textDecoration = "line-through";
        } else {
            li.querySelector("span").style.textDecoration = "none";
        }
    });
}

function addTask() {
    const task = todoInput.value.trim();
    if (task === "") {
        return;
    }

    let tasks = localStorage.getItem("tasks");
    if (tasks) {
        tasks = tasks.split(",");
    } else {
        tasks = [];
    }
    tasks.push(task);
    localStorage.setItem("tasks", tasks);

    addTaskToDOM(task);
    todoInput.value = "";
}

function deleteTask(task, li) {
    let tasks = localStorage.getItem("tasks");
    if (tasks) {
        tasks = tasks.split(",");
        let updatedTasks = [];
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i] !== task) {
                updatedTasks.push(tasks[i]);
            }
        }
        localStorage.setItem("tasks", updatedTasks);
    }
    
    li.remove();
    
}

function clearAllTasks() {
    localStorage.removeItem("tasks");
    taskList.innerHTML = "";
}

addTaskButton.addEventListener("click", addTask);
deleteAllBtn.addEventListener("click", clearAllTasks);

todoInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        addTask();
    }
});