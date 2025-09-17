# Copilot Instructions for AI Agents

## Visão Geral
Este projeto é um sistema de chamados dividido em dois componentes principais:
- **Backend**: API REST em Flask (Python), localizada em `backend/`
- **Frontend**: HTML/CSS/JS estático, localizado em `frontend/`

## Estrutura e Fluxo
- O backend expõe endpoints para autenticação e CRUD de chamados.
- O frontend consome a API do backend, mas não há integração JS implementada (apenas um console.log).
- O banco de dados utilizado é PostgreSQL, com variáveis de ambiente definidas em `backend/.env`.

## Backend
- Entrypoint: `backend/app.py`
- Conexão com banco: `backend/db.py` (usa variáveis do `.env`)
- Endpoints principais:
  - `POST /login` — autenticação simples (usuário: admin, senha: senha123)
  - `GET /chamados/recentes` — últimos 10 chamados
  - `GET /chamados` — todos os chamados
  - `POST /chamados` — cria chamado
  - `PUT /chamados/<id>` — atualiza chamado
  - `DELETE /chamados/<id>` — deleta chamado
- Para rodar localmente:
  1. `cd backend`
  2. `python -m venv venv`
  3. `venv\Scripts\activate` (Windows) ou `source venv/bin/activate` (Linux/Mac)
  4. `pip install -r requirements.txt`
  5. `python app.py` (roda na porta 5001)
- O backend usa CORS liberado para facilitar o desenvolvimento do frontend.

## Frontend
- Localizado em `frontend/`.
- Não há build: basta abrir os arquivos HTML no navegador.
- O JS (`frontend/js/main.js`) atualmente só faz um log no console.

## Convenções e Padrões
- Variáveis de ambiente do banco devem ser definidas em `backend/.env`.
- O nome da variável de senha no `.env` é `DB_PASS`, mas o código espera `DB_PASSWORD` (atenção: pode causar erro de conexão).
- O backend espera que a tabela `chamados` já exista no banco.
- Não há testes automatizados nem scripts de build.

## Integrações e Dependências
- Backend depende de: Flask, psycopg2-binary, dotenv (ver `backend/requirements.txt`).
- Frontend é estático, sem frameworks JS.
- Comunicação entre frontend e backend é via HTTP (CORS liberado).

## Exemplos de Uso
- Para autenticar: envie `{ "username": "admin", "password": "senha123" }` para `/login`.
- Para criar chamado: envie JSON com `titulo`, `descricao`, `status` para `/chamados` (POST).

## Pontos de Atenção
- O backend roda na porta 5001 por padrão.
- O frontend não faz requisições automáticas para o backend (integração JS pode ser necessária).
- O código não implementa autenticação real nem proteção de endpoints.

Consulte `README.md` para instruções rápidas de execução.
