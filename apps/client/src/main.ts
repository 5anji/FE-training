import './style.css';

const inputEl = document.getElementById('todo-input') as HTMLInputElement;
const addBtn = document.getElementById('add-btn') as HTMLButtonElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;

addBtn.addEventListener('click', addTask);
inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask();
});

function addTask() {
    const task = inputEl.value.trim();
    if (!task) return;

    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => {
        li.classList.toggle('done', checkbox.checked);
    });

    const span = document.createElement('span');
    span.textContent = task;

    const delBtn = document.createElement('button');
    delBtn.textContent = 'X';
    delBtn.addEventListener('click', () => {
        li.remove();
    });

    li.append(checkbox, span, delBtn);
    todoList.appendChild(li);

    inputEl.value = '';
}
