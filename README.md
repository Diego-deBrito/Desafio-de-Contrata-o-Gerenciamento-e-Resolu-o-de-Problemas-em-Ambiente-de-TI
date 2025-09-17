# Sistema de Chamados

Este projeto é composto por um **backend em Flask** e um **frontend simples em HTML/CSS/JS**.

## Estrutura do Projeto
```
/sistema-chamados/
|--- /backend/
|    |--- venv/
|    |--- app.py
|    |--- db.py
|    |--- requirements.txt
|    |--- .env
|
|--- /frontend/
|    |--- css/
|    |--- js/
|    |--- login.html
|    |--- dashboard.html
|    |--- gerenciar.html
|
|--- README.md
```

## Como executar

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
pip install -r requirements.txt
python app.py
```

### Frontend
Basta abrir os arquivos HTML no navegador.
