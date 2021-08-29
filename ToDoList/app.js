// Represent the Task
class Task{
    constructor(title){
        this.title = title;
    }
}

// Handles UI 
class UI{
    static displayTasks(){

        const tasks = Store.getTasks();

        tasks.forEach((task) => UI.addTaskToList(task));
    }

    static addTaskToList(task){
        const list = document.querySelector('#task-list');
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${task.title}</td>
        <button class="delete" style='margin: 5px 0px 5px 20px; 
        font-size: .65em; 
        border: none; 
        padding: 5px; 
        border-radius: 
        5px;
        opacity: 70%;
        ;'>X</button>
        `;

        list.appendChild(row);
        
    }

    static deleteTask(el){
        if(el.classList.contains('delete')){
            el.parentElement.remove();
        }
    }

    static clearFields(){
        document.querySelector('#task').value = '';
    }
}
// handles Storage
class Store{
    static getTasks(){
        let tasks;
        if(localStorage.getItem('tasks') === null){
            tasks = [];
        }
        else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        return tasks;
    }
    static addTask(task){
        const tasks = Store.getTasks();

        tasks.push(task);

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    static removeTasks(title){
        const tasks = Store.getTasks();

        tasks.forEach((task, index) => {
            if(task.title === title){
                tasks.splice(index, 1);
            }
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    
}
// Display Books
document.addEventListener('DOMContentLoaded', UI.displayTasks);

// Add a task
document.querySelector('#Task-form').addEventListener('submit', (e) => {
   
    e.preventDefault();
   
    const title = document.querySelector('#task').value;

const task = new Task(title);

UI.addTaskToList(task);

Store.addTask(task);

UI.clearFields();
});


// Remove task
document.querySelector('#task-list').addEventListener('click', (e) => {
    UI.deleteTask(e.target)
 
    // Remove book from store
     Store.removeTasks(e.target.previousElementSibling.textContent);
 
    //UI.showAlert('Book succesfully removed', 'danger');
 })