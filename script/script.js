'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted, todoContainer) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
        this.todoContainer = document.querySelector(todoContainer);
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
        console.log(li.key);
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
            this.render();
            this.input.value = '';
        }
        else {
            alert('Пустое поле добавлять нельзя!');
        }
    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    //Удалить элемент
    deleteItem() {
        console.log(this);


        //const pane = event.target.closest('.text-todo');
        //pane.remove();

        //this.todoData.splice(index, 1);

        //this.render();

    }
    //Отметка о выполнении
    completedItem() {
        // this.todoData.forEach(this.createItem, this);
    }
    //Изменить элемент
    editItem() {

    }

    handler() {
        //delegirovanie
        console.log(this.todoContainer);


        //this.todoContainer.addEventListener('click', function (event) {
        // event.preventDefault();
        //if (event.target.className === 'todo-remove') {
        //  console.log(event.target.closest('.text-todo'));
        //}
        //  this.todoData.forEach(this.deleteItem, this);
        // this.addToStorage();
        //  },this);
    }


    init() {
        this.form.addEventListener('submit', this.addToDo.bind(this));
        this.render();
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-container');
todo.init();
todo.handler();