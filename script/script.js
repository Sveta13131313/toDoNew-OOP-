'use strict';
class Todo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
    }

    addToStorage() {
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    }

    createItem(todo) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `
        <span class="text-todo">${todo.value}</span>
				<div class="todo-buttons">
                <button class="todo-edit"></button>
					<button class="todo-remove"></button>
					<button class="todo-complete"></button>
				</div>
      `);

        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }

    addToDo(e) {
        e.preventDefault();

        if (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
            this.todoData.set(newTodo.key, newTodo);

            this.input.value = '';
            this.render();
        } else {
            alert('Пустое поле добавлять нельзя!');
            return;
        }
    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    handler() {
        document.querySelector('.todo-container').addEventListener('click', this.completedItem.bind(this));
        document.querySelector('.todo-container').addEventListener('click', this.deleteItem.bind(this));
        document.querySelector('.todo-container').addEventListener('click', this.editItem.bind(this));
    }

    //Удалить элемент
    deleteItem(e) {
        const button = e.target;
        const todoItem = button.closest('.todo-item');

        if (button.matches('.todo-remove')) {
            this.todoData.forEach(el => {
                if (el.key === todoItem.key) this.todoData.delete(el.key);
            });

            this.render();
        }
    }

    //Отметка о выполнении
    completedItem(e) {
        const button = e.target;
        const todoItem = button.closest('.todo-item');

        if (button.matches('.todo-complete') && (button.closest('.todo-completed'))) {
            this.todoList.append(todoItem);

            this.todoData.forEach(el => {
                if (el.key === todoItem.key) el.completed = false;
            });
        } else if (button.matches('.todo-complete') && (button.closest('.todo-list'))) {
            this.todoCompleted.append(todoItem);

            this.todoData.forEach(el => {
                if (el.key === todoItem.key) el.completed = true;
            });
        }

        this.render();

    }
    //Изменить элемент
    editItem(e) {
        const button = e.target;
        const todoItem = button.closest('.todo-item');

        if (button.matches('.todo-edit')) {
            this.todoData.forEach(el => {
                if (el.key === todoItem.key) {
                   todoItem.setAttribute('contenteditable', 'true');
                }
            });
           
        }
    }

    init() {
        this.form.addEventListener('submit', this.addToDo.bind(this));
        this.render();
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');
todo.init();
todo.handler();
