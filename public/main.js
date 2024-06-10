document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    addTaskBtn.addEventListener('click', addTask);
    taskList.addEventListener('click', handleTaskAction);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <span>${taskText}</span>
                <div>
                    <button class="complete-btn">✔️</button>
                    <button class="delete-btn">❌</button>
                </div>
            `;
            taskList.appendChild(taskItem);
            taskInput.value = '';
        }
    }

    function handleTaskAction(e) {
        if (e.target.classList.contains('complete-btn')) {
            const taskItem = e.target.closest('li');
            taskItem.classList.toggle('completed');
        } else if (e.target.classList.contains('delete-btn')) {
            const taskItem = e.target.closest('li');
            taskList.removeChild(taskItem);
        }
    }

    fetch('http://localhost:3000/tarefas')
    .then(response => response.json())
    .then(dados => {
        dados.forEach(tarefa => {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <span>${tarefa.descricao}</span>
                <div>
                    <button class="complete-btn">✔️</button>
                    <button class="delete-btn">❌</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    })
    .catch(error => {
        console.error('Ocorreu um erro:', error);
    });
});

function enviarNovaTarefa(){
    fetch('http://localhost:3000/novaTarefa',
        {
            method:'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({"descricao" : inputTarefa.value})
        })
        .then(response => response.json())
        .then(dados => {
            console.log(dados)
        })
}