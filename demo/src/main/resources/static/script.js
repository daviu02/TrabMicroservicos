const API_URL = 'http://localhost:8080/api/filmes';

async function carregarFilmes() {
    try {
        const response = await fetch(API_URL);
        const filmes = await response.json();
        const listaBody = document.getElementById('listaFilmesBody');
        listaBody.innerHTML = ''; 

        filmes.forEach(filme => {
            const row = listaBody.insertRow();
            
            // ID (ÚNICA CÉLULA CENTRALIZADA)
            const idCell = row.insertCell(0);
            idCell.textContent = filme.id;
            idCell.className = "px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"; 
            
            // TÍTULO (Alinhado à esquerda, bom para leitura)
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
            acoesCell.className = "px-6 py-4 whitespace-nowrap text-right text-sm font-medium";
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.className = 'bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs';
            deleteButton.onclick = () => excluirFilme(filme.id);
            acoesCell.appendChild(deleteButton);
        });
    } catch (error) {
        console.error('Erro ao carregar filmes:', error);
    }
}

document.getElementById('filmeForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const novoFilme = {
        titulo: document.getElementById('titulo').value,
        diretor: document.getElementById('diretor').value,
        anoLancamento: parseInt(document.getElementById('anoLancamento').value),
        genero: document.getElementById('genero').value,
        duracaoMinutos: parseInt(document.getElementById('duracaoMinutos').value),
        sinopse: document.getElementById('sinopse').value
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoFilme)
        });

        if (response.ok) {
            alert('Filme salvo com sucesso!');
        } else {
            alert('Erro ao salvar filme.');
        }

    } catch (error) {
        console.error('Erro de requisição:', error);
        alert('Erro de conexão com o servidor.');
    }

    carregarFilmes(); 
    this.reset();    
});

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

carregarFilmes();