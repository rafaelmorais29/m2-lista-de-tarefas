const tasks = [
  {title: "Comprar comida para o gato", type: "Urgente"},
  {title: "Consertar Computador", type: "Importante"},
  {title: "Beber água", type: "Normal"},
  {title: "Enviar relatório trimestral", type: "Importante"},
  {title: "Fazer exercícios físicos", type: "Normal"},
  {title: "Agendar consulta médica", type: "Urgente"},
  {title: "Ler pelo menos um capítulo de um livro", type: "Normal"},
  {title: "Limpar a despensa", type: "Importante"},
  {title: "Pagar a conta de energia", type: "Urgente"},
  {title: "Assistir a um documentário interessante", type: "Normal"},
];

document.addEventListener('DOMContentLoaded', function () {

  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];


  renderTasks(savedTasks);


  const addButton = document.querySelector('.form__button--add-task');
  addButton.addEventListener('click', addTask);


  function addTask(event) {
    event.preventDefault();


    const title = document.getElementById('input_title').value;
    const priority = document.querySelector('.form__input--priority').value;


    if (title.trim() === '' || priority === '') {
      alert('Por favor, preencha todos os campos.');
      return;
    }


    const task = {
      title,
      priority,
    };


    savedTasks.push(task);


    localStorage.setItem('tasks', JSON.stringify(savedTasks));


    document.getElementById('input_title').value = '';
    document.querySelector('.form__input--priority').value = '';


    renderTasks(savedTasks);
  }


  function renderTasks(tasks) {
    const taskList = document.querySelector('.tasks__list');
    taskList.innerHTML = ''; // Limpar a lista antes de renderizar novamente

    tasks.forEach((task, index) => {
      const listItem = document.createElement('li');
      listItem.classList.add('task__item');

      const taskInfoContainer = document.createElement('div');
      taskInfoContainer.classList.add('task-info__container');

      const taskType = document.createElement('span');
      taskType.classList.add(`span-${task.priority}`);
      taskInfoContainer.appendChild(taskType);

      const taskDescription = document.createElement('p');
      taskDescription.textContent = task.title;
      taskInfoContainer.appendChild(taskDescription);

      listItem.appendChild(taskInfoContainer);

      const removeButton = document.createElement('button');
      removeButton.classList.add('task__button--remove-task');
      removeButton.addEventListener('click', () => removeTask(index));

      listItem.appendChild(removeButton);

      taskList.appendChild(listItem);
    });
  }


  function removeTask(index) {
    savedTasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
    renderTasks(savedTasks);
  }
});

