const add = document.getElementById('add');
const list = document.getElementById('list');
const template = document.getElementById('template');

// Load tasks on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Add new task
add.addEventListener('click', () => {
    const todoValue = document.getElementById('todo').value.trim();
    if (!todoValue) return;

    addTask(todoValue);
    saveTasks(); // save to localStorage

    document.getElementById('todo').value = '';
});

// Create + display a task
function addTask(text, checked = false) {
    const clone = template.content.cloneNode(true);

    const li = clone.querySelector('.item');
    const textSpan = clone.querySelector('.text');
    const checkbox = clone.querySelector('.check');
    const deleteBtn = clone.querySelector('.delete');

    textSpan.textContent = text;
    checkbox.checked = checked;

    // strike-through
    if (checked) textSpan.classList.add("checked");

    checkbox.addEventListener("change", () => {
        textSpan.classList.toggle("checked", checkbox.checked);
        saveTasks();
    });

    deleteBtn.addEventListener("click", () => {
        li.remove();
        saveTasks();
    });

    list.appendChild(clone);
}

// Save all tasks to localStorage
function saveTasks() {
    const tasks = [];
    list.querySelectorAll(".item").forEach(li => {
        tasks.push({
            text: li.querySelector(".text").textContent,
            checked: li.querySelector(".check").checked
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.forEach(t => addTask(t.text, t.checked));
}
