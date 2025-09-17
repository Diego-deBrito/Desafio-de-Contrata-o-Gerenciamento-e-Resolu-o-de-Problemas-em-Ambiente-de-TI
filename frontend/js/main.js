
// Funções e lógica principal do front-end
console.log('Frontend carregado!');

document.addEventListener('DOMContentLoaded', function() {
	const loginForm = document.getElementById('loginForm');
	if (loginForm) {
		loginForm.addEventListener('submit', async function(e) {
			e.preventDefault();
			const username = document.getElementById('username').value;
			const password = document.getElementById('password').value;
			const errorDiv = document.getElementById('loginError');
			errorDiv.style.display = 'none';

			try {
				const response = await fetch('http://localhost:5001/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ username, password })
				});
				if (response.ok) {
					// Login bem-sucedido, redireciona para a página principal
					window.location.href = 'index.html';
				} else {
					const data = await response.json();
					errorDiv.textContent = data.message || 'Usuário ou senha inválidos.';
					errorDiv.style.display = 'block';
				}
			} catch (err) {
				errorDiv.textContent = 'Erro ao conectar ao servidor.';
				errorDiv.style.display = 'block';
			}
		});
	}
});
