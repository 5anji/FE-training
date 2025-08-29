const inputEl = document.getElementById('todo-input') as HTMLInputElement;
const addBtn = document.getElementById('add-btn') as HTMLButtonElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;

addBtn.addEventListener('click', () => {
    const task = inputEl.value.trim();
    if (task === '') return;

    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = task;

    span.addEventListener('click', () => {
        li.classList.toggle('done');
    });

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
