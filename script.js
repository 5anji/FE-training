const inputEl = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

addBtn.addEventListener('click', () => {
    const task = inputEl.value.trim();
    if (task === '')
        return;
    // Create new list item
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = task;
    // Mark as done when clicked
    span.addEventListener('click', () => {
        li.classList.toggle('done');
    });
    // Delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = 'X';
    delBtn.addEventListener('click', () => {
        li.remove();
    });
    li.appendChild(span);
    li.appendChild(delBtn);
    todoList.appendChild(li);
    inputEl.value = '';
});
