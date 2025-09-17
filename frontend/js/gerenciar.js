// gerenciar.js - CRUD de Chamados

document.addEventListener('DOMContentLoaded', function() {
    carregarChamados();
    document.getElementById('btnNovoChamado').onclick = abrirModalNovo;
    document.getElementById('btnImprimir').onclick = () => window.print();
    document.getElementById('closeModal').onclick = fecharModal;
    document.getElementById('formChamado').onsubmit = salvarChamado;
});

function carregarChamados() {
    fetch('http://localhost:5001/chamados')
        .then(res => res.json())
        .then(chamados => {
            const tbody = document.getElementById('chamadosList');
            tbody.innerHTML = '';
            chamados.forEach(chamado => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${chamado.id}</td>
                    <td><a href="#" onclick="verDetalhes(${chamado.id});return false;">${chamado.titulo}</a></td>
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

function abrirModalNovo() {
    document.getElementById('modalTitulo').textContent = 'Novo Chamado';
    document.getElementById('formChamado').reset();
    document.getElementById('chamadoId').value = '';
    document.getElementById('datasChamado').innerHTML = '';
    document.getElementById('modalChamado').style.display = 'block';
}

function fecharModal() {
    document.getElementById('modalChamado').style.display = 'none';
}

function verDetalhes(id) {
    fetch('http://localhost:5001/chamados')
        .then(res => res.json())
        .then(chamados => {
            const chamado = chamados.find(c => c.id === id);
            if (chamado) {
                document.getElementById('modalTitulo').textContent = 'Detalhes do Chamado';
                document.getElementById('chamadoId').value = chamado.id;
                document.getElementById('titulo').value = chamado.titulo;
                document.getElementById('descricao').value = chamado.descricao;
                document.getElementById('status').value = chamado.status;
                document.getElementById('datasChamado').innerHTML =
                    `<b>Criado em:</b> ${formatarData(chamado.data_criacao)}<br>` +
                    (chamado.data_atualizacao ? `<b>Atualizado em:</b> ${formatarData(chamado.data_atualizacao)}` : '');
                document.getElementById('btnSalvar').style.display = 'none';
                document.getElementById('titulo').readOnly = true;
                document.getElementById('descricao').readOnly = true;
                document.getElementById('status').disabled = true;
                document.getElementById('modalChamado').style.display = 'block';
            }
        });
}

function editarChamado(id) {
    fetch('http://localhost:5001/chamados')
        .then(res => res.json())
        .then(chamados => {
            const chamado = chamados.find(c => c.id === id);
            if (chamado) {
                document.getElementById('modalTitulo').textContent = 'Editar Chamado';
                document.getElementById('chamadoId').value = chamado.id;
                document.getElementById('titulo').value = chamado.titulo;
                document.getElementById('descricao').value = chamado.descricao;
                document.getElementById('status').value = chamado.status;
                document.getElementById('datasChamado').innerHTML =
                    `<b>Criado em:</b> ${formatarData(chamado.data_criacao)}<br>` +
                    (chamado.data_atualizacao ? `<b>Atualizado em:</b> ${formatarData(chamado.data_atualizacao)}` : '');
                document.getElementById('btnSalvar').style.display = 'inline-block';
                document.getElementById('titulo').readOnly = false;
                document.getElementById('descricao').readOnly = false;
                document.getElementById('status').disabled = false;
                document.getElementById('modalChamado').style.display = 'block';
            }
        });
}

function salvarChamado(e) {
    e.preventDefault();
    const id = document.getElementById('chamadoId').value;
    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const status = document.getElementById('status').value;
    const body = JSON.stringify({ titulo, descricao, status });
    if (id) {
        // Update
        fetch('http://localhost:5001/chamados/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body
        }).then(() => { fecharModal(); carregarChamados(); });
    } else {
        // Create
        fetch('http://localhost:5001/chamados', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body
        }).then(() => { fecharModal(); carregarChamados(); });
    }
}

function deletarChamado(id) {
    if (confirm('Deseja realmente deletar o chamado ' + id + '?')) {
        fetch('http://localhost:5001/chamados/' + id, { method: 'DELETE' })
            .then(() => carregarChamados());
    }
}
