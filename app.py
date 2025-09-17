from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
import psycopg2.extras
from db import get_db_connection

app = Flask(__name__)
app.secret_key = 'chave_super_secreta_123'  # Troque por uma chave forte em produção
CORS(app)


# 1. ENDPOINT DE LOGIN
from flask import session
from functools import wraps

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get('logged_in'):
            return jsonify({'message': 'Não autorizado'}), 401
        return f(*args, **kwargs)
    return decorated_function

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if data and data.get('username') == 'admin' and data.get('password') == 'senha123':
        session['logged_in'] = True
        return jsonify({'message': 'Login bem-sucedido!'}), 200
    return jsonify({'message': 'Usuário ou senha inválidos'}), 401

# 1.1. ENDPOINT DE LOGOUT
@app.route('/logout', methods=['POST'])
def logout():
    session.pop('logged_in', None)
    return jsonify({'message': 'Logout realizado!'}), 200

# 2. ENDPOINTS CRUD PARA CHAMADOS
@app.route('/chamados/recentes', methods=['GET'])
@login_required
def get_recent_chamados():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute('SELECT * FROM chamados ORDER BY data_criacao DESC LIMIT 10')
    chamados = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(chamados)

# [READ] Listar TODOS os chamados 
@app.route('/chamados', methods=['GET'])
@login_required
def get_all_chamados():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute('SELECT * FROM chamados ORDER BY id ASC')
    chamados = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(chamados)
    
# [CREATE] Criar um novo chamado
@app.route('/chamados', methods=['POST'])
@login_required
def create_chamado():
    data = request.get_json()
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        'INSERT INTO chamados (titulo, descricao, status, data_criacao) VALUES (%s, %s, %s, %s) RETURNING id',
        (data['titulo'], data['descricao'], data['status'], datetime.now())
    )
    new_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({'message': 'Chamado criado com sucesso!', 'id': new_id}), 201

# [UPDATE] Atualizar um chamado existente
@app.route('/chamados/<int:id>', methods=['PUT'])
@login_required
def update_chamado(id):
    data = request.get_json()
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        'UPDATE chamados SET titulo = %s, descricao = %s, status = %s, data_atualizacao = %s WHERE id = %s',
        (data['titulo'], data['descricao'], data['status'], datetime.now(), id)
    )
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({'message': 'Chamado atualizado com sucesso!'})

# [DELETE] Deletar um chamado
@app.route('/chamados/<int:id>', methods=['DELETE'])
@login_required
def delete_chamado(id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('DELETE FROM chamados WHERE id = %s', (id,))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({'message': 'Chamado deletado com sucesso!'})

if __name__ == '__main__':
    app.run(debug=True, port=5001) # Rodando em uma porta diferente da padrão para evitar conflitos