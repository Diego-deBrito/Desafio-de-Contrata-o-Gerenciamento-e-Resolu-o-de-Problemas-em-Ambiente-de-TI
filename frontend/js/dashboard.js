// dashboard.js - Lógica do Dashboard de Chamados


document.addEventListener('DOMContentLoaded', function() {
    carregarChamados();
    document.getElementById('btnNovoChamado').onclick = abrirModalNovo;
    document.getElementById('closeModal').onclick = fecharModal;
    document.getElementById('formChamado').onsubmit = salvarChamado;
});

function abrirModalNovo() {
    document.getElementById('formChamado').reset();
    document.getElementById('modalChamado').style.display = 'block';
}

function fecharModal() {
    document.getElementById('modalChamado').style.display = 'none';
}

function salvarChamado(e) {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const status = document.getElementById('status').value;
    const body = JSON.stringify({ titulo, descricao, status });
    fetch('http://localhost:5001/chamados', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
    }).then(() => { fecharModal(); carregarChamados(); });
}

function carregarChamados() {
    fetch('http://localhost:5001/chamados/recentes')
        .then(res => res.json())
        .then(chamados => {
            const tbody = document.getElementById('chamadosList');
            tbody.innerHTML = '';
            chamados.forEach(chamado => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${chamado.id}</td>
                    <td>${chamado.titulo}</td>
                    <td>${formatarData(chamado.data_criacao)}</td>
                    <td>${chamado.status}</td>
                    <td>
                        <button onclick="editarChamado(${chamado.id})">Editar</button>
                        <button onclick="deletarChamado(${chamado.id})">Deletar</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(() => {
            document.getElementById('chamadosList').innerHTML = '<tr><td colspan="5">Erro ao carregar chamados.</td></tr>';
        });
}

function formatarData(dataStr) {
    if (!dataStr) return '';
    const d = new Date(dataStr);
    return d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});
}

function editarChamado(id) {
    alert('Funcionalidade de editar chamado: ' + id);
    // Aqui você pode abrir um modal ou redirecionar para uma página de edição
}

function deletarChamado(id) {
    if (confirm('Deseja realmente deletar o chamado ' + id + '?')) {
        fetch('http://localhost:5001/chamados/' + id, { method: 'DELETE' })
            .then(res => res.json())
            .then(() => carregarChamados());
    }
}
