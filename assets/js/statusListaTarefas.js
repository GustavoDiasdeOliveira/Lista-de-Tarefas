document.getElementById('status').addEventListener('change', function() {
    const select = this;
    const value = select.value;

    // Remover classes anteriores
    select.classList.remove('pendente', 'andamento', 'feito');
    
    // Adicionar a classe correspondente
    if (value === 'pendente') {
        select.classList.add('pendente');
    } else if (value === 'andamento') {
        select.classList.add('andamento');
    } else if (value === 'feito') {
        select.classList.add('feito');
    }
});
