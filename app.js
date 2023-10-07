// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodosFromLocalStorage);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('input', filterTodo);

// Functions
function addTodo(event) {
    event.preventDefault();
    saveToLocalStorage(todoInput.value);
    addTodoFromString(todoInput.value);
}

function addTodoFromString(todo) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<li class="fas fa-check"></li>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<li class="fas fa-trash"></li>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
    todoInput.value = '';
}

function deleteCheck(event) {
    const item = event.target;
    let todoText;
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeTodoFromLocalStorage(todo.innerText);
        todo.addEventListener('transitionend', () => {
            todo.remove();
        })
    }
    if (item.classList[1] === 'fa-trash') {
        const todo = item.parentElement.parentElement;
        todo.classList.add('fall');
        removeTodoFromLocalStorage(todo.innerText);
        todo.addEventListener('transitionend', () => {
            todo.remove();
        })
    }

    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
    if (item.classList[1] === 'fa-check') {
        item.parentElement.parentElement.classList.toggle('completed');
    }

}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
        switch(event.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'none';
                } else {
                    todo.style.display = 'flex';
                }
                break;
            default:
                break;
        }
    });
}

function saveToLocalStorage(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodosFromLocalStorage() {
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    for (const todo of todos) {
        addTodoFromString(todo);
    }
}

function removeTodoFromLocalStorage(todoText) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.splice(todos.indexOf(todoText), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}
