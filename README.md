## Documentação do Projeto

### Tecnologias escolhidas
- **Linguagem:** Python 3 — Simples, produtiva e com ótima comunidade para web.
- **Framework:** Flask — Leve, fácil de aprender e suficiente para APIs REST.
- **Banco de dados:** PostgreSQL — Robusto, gratuito e fácil integração com Python.
- **Frontend:** HTML5, CSS3, JavaScript puro — Para facilitar a correção e evitar dependências extras.

### Decisões de design e arquitetura
- Separação clara entre backend (API Flask) e frontend (HTML/JS estático).
- CRUD completo via API REST, facilitando manutenção e integração futura.
- Uso de variáveis de ambiente para dados sensíveis.
- Autenticação básica por sessão, protegendo rotas críticas.
- Interface responsiva e moderna, sem frameworks JS pesados.

### Dificuldades e soluções
- **Integração frontend-backend:** Ajuste de CORS e rotas para garantir comunicação.
- **Persistência de sessão:** Uso de sessão Flask para proteger endpoints.
- **Validação de dados:** Implementação de mensagens de erro claras no frontend.
- **Layout responsivo:** Ajuste manual de CSS para garantir boa experiência em diferentes telas.

---

# Sistema de Chamados OMTX

![Logo OMTX](frontend/img/logo1.png)

## Visão Geral
Sistema web para registro, acompanhamento e gerenciamento de chamados de TI, com backend em Flask (Python) e frontend HTML/CSS/JS puro.

## Funcionalidades
- **Login seguro** (usuário fixo: admin/senha123)
- **Dashboard**: lista os 10 últimos chamados
- **CRUD completo**: criar, visualizar, editar e deletar chamados
- **Impressão de chamados**
- **Status do chamado**: Aberto, Em Andamento, Fechado
- **Proteção de rotas**: apenas usuários autenticados acessam o sistema

## Estrutura do Projeto
```
backend/
├── app.py              # API Flask (endpoints, autenticação, CRUD)
├── db.py               # Conexão com PostgreSQL
├── requirements.txt    # Dependências Python
├── .env                # Variáveis de ambiente do banco
└── frontend/
	 ├── index.html      # Dashboard
	 ├── gerenciar.html  # Tela de gerenciamento CRUD
	 ├── login.html      # Tela de login
	 ├── css/
	 │   └── style.css   # Estilos
	 ├── js/
	 │   ├── main.js     # Login
	 │   ├── dashboard.js# Dashboard
	 │   └── gerenciar.js# CRUD
	 └── img/
		  └── logo1.png   # Logo da empresa
```

## Como rodar localmente
1. Clone o repositório e acesse a pasta `backend`
2. Crie o ambiente virtual:
	```
	python -m venv venv
	venv\Scripts\activate  # Windows
	# ou
	source venv/bin/activate  # Linux/Mac
	```
3. Instale as dependências:
	```
	pip install -r requirements.txt
	```
4. Configure o arquivo `.env` com os dados do seu PostgreSQL:
	```
	DB_HOST=localhost
	DB_NAME=sistema_chamados
	DB_USER=postgres
	DB_PASSWORD=123
	```
5. Certifique-se de que a tabela `chamados` existe no banco:
	```sql
	CREATE TABLE chamados (
	  id SERIAL PRIMARY KEY,
	  titulo VARCHAR(100) NOT NULL,
	  descricao TEXT NOT NULL,
	  status VARCHAR(30) NOT NULL,
	  data_criacao TIMESTAMP NOT NULL,
	  data_atualizacao TIMESTAMP
	);
	```
6. Inicie o backend:
	```
	python app.py
	```
7. Abra os arquivos HTML da pasta `frontend` no navegador (ex: `login.html`)

## Endpoints principais
- `POST /login` — autenticação
- `POST /logout` — encerra sessão
- `GET /chamados/recentes` — últimos 10 chamados
- `GET /chamados` — todos os chamados
- `POST /chamados` — cria chamado
- `PUT /chamados/<id>` — atualiza chamado
- `DELETE /chamados/<id>` — deleta chamado

## Usuário de Teste
- **Usuário:** admin
- **Senha:** senha123

## Tecnologias
- Python 3, Flask, psycopg2, python-dotenv
- PostgreSQL
- HTML5, CSS3, JavaScript puro

## Segurança
- Autenticação por sessão Flask
- Proteção de rotas (CRUD só para logados)

## Licença
Projeto acadêmico/experimental — OMTX 2025
