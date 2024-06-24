document.addEventListener('DOMContentLoaded', function() {
    const formReceita = document.getElementById('form-receita');
    const formDespesa = document.getElementById('form-despesa');
    const listaTransacoes = document.getElementById('lista-transacoes');
    const toggleDarkModeBtn = document.getElementById('toggle-dark-mode');
    let darkMode = false;

    let transacoes = [];

    formReceita.addEventListener('submit', function(event) {
        event.preventDefault();
        const descricao = document.getElementById('descricao-receita').value;
        const valor = document.getElementById('valor-receita').value;
        adicionarTransacao(descricao, valor, 'Receita');
        formReceita.reset();
    });

    formDespesa.addEventListener('submit', function(event) {
        event.preventDefault();
        const descricao = document.getElementById('descricao-despesa').value;
        const valor = document.getElementById('valor-despesa').value;
        adicionarTransacao(descricao, valor, 'Despesa');
        formDespesa.reset();
    });

    function adicionarTransacao(descricao, valor, tipo) {
        const transacao = {
            id: Date.now(),
            descricao,
            valor,
            tipo
        };
        transacoes.push(transacao);
        renderizarTransacoes();
    }

    function editarTransacao(id) {
        const transacao = transacoes.find(t => t.id === id);
        const novaDescricao = prompt("Editar Descrição:", transacao.descricao);
        const novoValor = prompt("Editar Valor:", transacao.valor);
        if (novaDescricao !== null && novoValor !== null) {
            transacao.descricao = novaDescricao;
            transacao.valor = novoValor;
            renderizarTransacoes();
        }
    }

    function excluirTransacao(id) {
        transacoes = transacoes.filter(t => t.id !== id);
        renderizarTransacoes();
    }

    function renderizarTransacoes() {
        listaTransacoes.innerHTML = '';
        transacoes.forEach(transacao => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${transacao.descricao}</td>
                <td>${transacao.valor}</td>
                <td>${transacao.tipo}</td>
                <td>
                    <button class="btn btn-primary btn-sm mr-2" onclick="editarTransacao(${transacao.id})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="excluirTransacao(${transacao.id})">Excluir</button>
                </td>
            `;
            listaTransacoes.appendChild(tr);
        });
    }

    // Para disponibilizar funções editarTransacao e excluirTransacao no escopo global
    window.editarTransacao = editarTransacao;
    window.excluirTransacao = excluirTransacao;

    toggleDarkModeBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        darkMode = !darkMode;
        toggleDarkModeBtn.textContent = darkMode ? 'Modo Claro' : 'Modo Escuro';
    });
});
