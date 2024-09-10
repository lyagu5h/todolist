const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoUL = document.getElementById('todo-list');

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
})

function addTodo() {
    const todoText = todoInput.value.trim();

    if (todoText.length > 0) {
        const todoObj = {
            completed: false,
            task: todoText
        }
        allTodos.push(todoObj);
        saveTodos();
        updateTodoList();
        todoInput.value = '';
    }
}

function updateTodoList() {
    todoUL.innerHTML = '';

    allTodos.forEach((todoObj, index) => {
        todoItem = createTodoItem(todoObj, index);
        todoUL.append(todoItem);
    })
}

function createTodoItem(todoObj, index) {
    const todoLI = document.createElement('li');
    const todoId = `todo-${index}`;
    const todoText = todoObj.task;

    todoLI.className = "todo-list__todo"
    todoLI.innerHTML = `
                <input class="todo-list__checkbox" type="checkbox" id="${todoId}">
                <label for="${todoId}" class="todo-list__custom-checkbox">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="transparent"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                </label>
                <label class="todo-list__text" for="${todoId}">
                    ${todoText}
                </label>
                <button class="todo-list__delete-button">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--secondary-color)"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </button>
    `

    const todoDeleteButton = todoLI.querySelector('.todo-list__delete-button');
    const todoCheckbox = todoLI.querySelector('.todo-list__checkbox');
    
    todoDeleteButton.addEventListener("click", () => {
        deleteTodo(index);
    })

    todoCheckbox.addEventListener("change", () => {
        allTodos[index].completed = todoCheckbox.checked;
        saveTodos();
    })

    todoCheckbox.checked = todoObj.completed;

    return todoLI;
}

function deleteTodo(todoIndex) {
    allTodos = allTodos.filter((item, index) => index !== todoIndex)
    saveTodos();
    updateTodoList();
}

function saveTodos() {
    const todosJSON = JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJSON);
}

function getTodos() {
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}

