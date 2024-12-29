// Seletores dos elementos do DOM
const addForm = document.querySelector('.add-form');
const inputTask = document.querySelector('.input-task');
const tableBody = document.querySelector('tbody');

// Função para adicionar uma nova tarefa
function addTask(event) {
    event.preventDefault(); // Evita o envio do formulário
    
    // Verifica se o input não está vazio
    if (inputTask.value.trim() === '') {
        return;
    }

    const taskTitle = inputTask.value.trim();
    const currentDate = new Date().toLocaleDateString(); // Data atual formatada
    
    // Criação de uma nova linha para a tabela
    const newRow = document.createElement('tr');
    
    // Criação das células para o título, data e status da tarefa
    newRow.innerHTML = `
        <td class="task-title">${taskTitle}</td>
        <td class="task-date">${currentDate}</td>
        <td>
            <select class="status">
                <option value="pendente">Pendente</option>
                <option value="andamento">Andamento</option>
                <option value="feito">Feito</option>
            </select>
        </td>
        <td>
            <button class="btn-action edit">
                <span class="material-symbols-outlined">edit</span>
            </button>
            <button class="btn-action delete">
                <span class="material-symbols-outlined">delete</span>
            </button>
        </td>
    `;

    // Adiciona a nova linha à tabela
    tableBody.appendChild(newRow);

    // Limpa o campo de entrada
    inputTask.value = '';

    // Adiciona o event listener para o novo select de status
    const statusSelect = newRow.querySelector('select.status');
    statusSelect.addEventListener('change', updateStatus);
}

// Função para editar uma tarefa
function editTask(event) {
    const target = event.target.closest('.edit');
    if (!target) return;

    const row = target.closest('tr');
    const taskTitleCell = row.querySelector('.task-title');
    const taskDateCell = row.querySelector('.task-date');

    // Permite editar o título da tarefa
    const newTitle = prompt('Editar título da tarefa:', taskTitleCell.textContent);
    if (newTitle && newTitle.trim() !== '') {
        taskTitleCell.textContent = newTitle.trim();
    }

    // Permite editar a data da tarefa
    const newDate = prompt('Editar data criada da tarefa (dd/mm/aaaa):', taskDateCell.textContent);
    if (newDate && isValidDate(newDate)) {
        taskDateCell.textContent = newDate;
    } else if (newDate) {
        alert('Data inválida! Por favor, insira no formato dd/mm/aaaa.');
    }
}

// Função para excluir uma tarefa
function deleteTask(event) {
    const target = event.target.closest('.delete');
    if (!target) return;

    const row = target.closest('tr');
    row.remove();
}

// Função para validar a data
function isValidDate(dateString) {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    return regex.test(dateString);
}

// Função para atualizar o estilo da opção de status
function updateStatus(event) {
    const select = event.target;
    const selectedOption = select.options[select.selectedIndex]; // Obtém a opção selecionada

    // Atualiza a cor da option com base no valor selecionado
    if (selectedOption.value === 'pendente') {
        selectedOption.style.backgroundColor = '#fff'; // Cor de fundo Branco
        selectedOption.style.color = '#000'; // Cor do texto para "Pendente"
        select.style.backgroundColor = '#ed2a2ae6'; // Cor para "Pendente"
    } else if (selectedOption.value === 'andamento') {
        select.style.backgroundColor = '#f5b744'; // Cor para "Andamento"
        selectedOption.style.backgroundColor = '#fff'; // Cor de fundo Branco
        selectedOption.style.color = '#000'; // Cor do texto para "Andamento"
    } else if (selectedOption.value === 'feito') {
        select.style.backgroundColor = '#379e37'; // Cor para "Feito"
        selectedOption.style.backgroundColor = '#fff'; // Cor de fundo Branco
        selectedOption.style.color = '#000'; // Cor do texto para "Feito"
    }
}

// Adiciona um ouvinte de evento para o formulário
addForm.addEventListener('submit', addTask);

// Adiciona ouvintes de evento para editar e excluir tarefas
tableBody.addEventListener('click', (event) => {
    if (event.target.closest('.edit')) {
        editTask(event);
    } else if (event.target.closest('.delete')) {
        deleteTask(event);
    }
});

// Adiciona o listener para os selects de status existentes
const statusSelects = document.querySelectorAll('select.status');
statusSelects.forEach(select => {
    select.addEventListener('change', updateStatus);
});
