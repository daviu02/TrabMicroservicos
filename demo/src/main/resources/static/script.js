const API_URL = '/api/filmes';

async function carregarFilmes() {
    try {
        const response = await fetch(API_URL);
        const filmes = await response.json();
        const listaBody = document.getElementById('listaFilmesBody');
        listaBody.innerHTML = '';

        filmes.forEach(filme => {
            const row = listaBody.insertRow();

            const idCell = row.insertCell(0);
            idCell.textContent = filme.id;
            idCell.className = "px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500";

            const tituloCell = row.insertCell(1);
            tituloCell.textContent = filme.titulo;
            tituloCell.className = "px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900";

            const diretorCell = row.insertCell(2);
            diretorCell.textContent = filme.diretor;
            diretorCell.className = "px-6 py-4 whitespace-nowrap text-left text-sm text-gray-500";

            const anoCell = row.insertCell(3);
            anoCell.textContent = filme.anoLancamento;
            anoCell.className = "px-6 py-4 whitespace-nowrap text-left text-sm text-gray-500";

            const generoCell = row.insertCell(4);
            generoCell.textContent = filme.genero;
            generoCell.className = "px-6 py-4 whitespace-nowrap text-left text-sm text-gray-500";

            const duracaoCell = row.insertCell(5);
            duracaoCell.textContent = filme.duracaoMinutos;
            duracaoCell.className = "px-6 py-4 whitespace-nowrap text-left text-sm text-gray-500";

            const acoesCell = row.insertCell(6);
            acoesCell.className = "px-6 py-4 whitespace-nowrap text-center text-sm font-medium";
            
            // Botão EDITAR (NOVO)
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs mr-2';
            editButton.onclick = (e) => { e.preventDefault(); editarFilme(filme.id); };
            acoesCell.appendChild(editButton);

            // Botão EXCLUIR
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.className = 'bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs';
            deleteButton.onclick = (e) => { e.preventDefault(); excluirFilme(filme.id); };
            acoesCell.appendChild(deleteButton);
        });
    } catch (error) {
        console.error('Erro ao carregar filmes:', error);
    }
}

async function editarFilme(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const filme = await response.json();

        document.getElementById('idFilme').value = filme.id;
        document.getElementById('titulo').value = filme.titulo;
        document.getElementById('diretor').value = filme.diretor;
        document.getElementById('anoLancamento').value = filme.anoLancamento;
        document.getElementById('genero').value = filme.genero;
        document.getElementById('duracaoMinutos').value = filme.duracaoMinutos;
        document.getElementById('sinopse').value = filme.sinopse;

        document.querySelector('button[type="submit"]').textContent = 'Salvar Alterações';
        alert(`Editando filme ID: ${id}. Clique em "Salvar Alterações" para confirmar.`);

    } catch (error) {
        console.error('Erro ao carregar filme para edição:', error);
        alert('Erro ao carregar dados do filme.');
    }
}


async function excluirFilme(id) {
    if (confirm(`Tem certeza que deseja excluir o filme com ID ${id}?`)) {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            carregarFilmes();
            alert('Filme excluído com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir filme:', error);
            alert('Erro ao excluir filme.');
        }
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('filmeForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const id = document.getElementById('idFilme').value;
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_URL}/${id}` : API_URL;
        const successMessage = id ? 'Filme atualizado com sucesso!' : 'Filme salvo com sucesso!';

        const filmeData = {
            titulo: document.getElementById('titulo').value,
            diretor: document.getElementById('diretor').value,
            anoLancamento: parseInt(document.getElementById('anoLancamento').value),
            genero: document.getElementById('genero').value,
            duracaoMinutos: parseInt(document.getElementById('duracaoMinutos').value),
            sinopse: document.getElementById('sinopse').value
        };

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(filmeData)
            });

            if (response.ok) {
                alert(successMessage);
                document.getElementById('idFilme').value = '';
                document.querySelector('button[type="submit"]').textContent = 'Salvar Filme';
            } else {
                alert('Erro ao processar filme.');
            }

        } catch (error) {
            console.error('Erro de requisição:', error);
            alert('Erro de conexão com o servidor.');
        }

        carregarFilmes();
        this.reset();
    });

    carregarFilmes();
});