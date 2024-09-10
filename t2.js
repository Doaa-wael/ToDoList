class ToDoClass {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('TASKS'));
        if(!this.tasks){
            this.tasks =  [
                { task: 'Go To Dentist', isComplete: false },
                { task: 'Do Gardening', isComplete: true },
                { task: 'Renew Library Account', isComplete: false },
            ];
        }
        
        this.loadTasks();

        this.addEventListener();
    }

    addEventListener(){
        document.getElementById('addTask').addEventListener('keypress', event => {
            if(event.keyCode === 13 ){
                this.addTask(event.target.value);
                event.target.value = "";
            }
        });
    }

    //changes the toggleStatus of the checkbox 
    toggleTaskStatus(index) {
        this.tasks[index].isComplete = !this.tasks[index].isComplete;
        this.loadTasks();
    }

    deleteTask(event, taskIndex){
        event.preventDefault();
        this.tasks.splice(taskIndex, 1);
        let x = localStorage.removeItem('TASKS');
        console.log(x);
        this.loadTasks();
    }
    
    addTaskClick(){
        let target = document.getElementById('addTask');
        this.addTask(target.value);
        target.value = "";
    }

    addTask(task){
        let newTask = {
            task,
            isCompleted: false,
        };
        
        //parent div is simply uses to add the effects around the insert label if there is a text or not
        let parentDiv = document.getElementById('addTask').parentElement;
        if(task === ''){
            parentDiv.classList.add('has-error');
        } else {
            parentDiv.classList.remove('has-error');
            parentDiv.classList.add('has-success')
            this.tasks.push(newTask);
            this.loadTasks();
        }
    }

   
    generateTaskHtml(task, index) {
        return `
            <li class="list-group-item checkbox">
            <div class="row">
                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">
                <label><input id="toggleTaskStatus" type="checkbox" onchange="toDo.toggleTaskStatus(${index})" value="" class="" ${task.isComplete ? 'checked' : ''}></label>
                </div>
                <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 task-text ${task.isComplete ? 'complete' : ''}">
                ${task.task}
                </div>
                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area">
                <a class="" href="" onClick="toDo.deleteTask(event, ${index})"><i id="deleteTask" data-id="${index}" class="delete-icon glyphicon glyphicon-trash"></i></a>
                </div>
            </div>
            </li>
        `;
    }

    loadTasks() {
        //we use local storage here just incase the value in the constructor is set to null,
        //then now we will add the 3 predefine values in the task variable to the local storage right away.
        localStorage.setItem('TASKS', JSON.stringify(this.tasks));

        //research more on reduce
        let taskHtml = this.tasks.reduce((html, task, index) => html += this.generateTaskHtml(task, index), '');
        document.getElementById('taskList').innerHTML = taskHtml;
    }
}

let toDo;
window.addEventListener("load", () => {
  toDo = new ToDoClass();
});