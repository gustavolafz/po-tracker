import pytest
from app import create_app
from server.db.database import get_db
from server.models.user import User
from werkzeug.security import generate_password_hash


@pytest.fixture
def client():
    app = create_app()
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


def create_user_directly(db_session):
    """Cria usuário admin diretamente no banco com hash curto."""
    hashed_password = generate_password_hash("senha123", method="pbkdf2:sha256")  # <- aqui

    user = User(
        UserName="Admin",
        UserEmail="admin@teste.com",
        password="senha123",  # texto puro
        UserRole="admin",
        UserStatus="Ativo"
    )
    db_session.add(user)
    db_session.commit()
    return user.UserID


def get_token(client):
    """Autentica e retorna o token JWT."""
    login_data = {
        "email": "admin@teste.com",
        "password": "senha123"
    }
    response = client.post("/auth/login", json=login_data)
    print("Resposta do /auth/login:", response.status_code, response.get_data(as_text=True))
    assert response.status_code == 200
    return response.get_json()["token"]["access_token"]

def test_update_user_success(client):
    with next(get_db()) as db:
        user_id = create_user_directly(db)  # e-mail único dentro da função
        db.commit()

    token = get_token(client)
    headers = {"Authorization": f"Bearer {token}"}

    unique_email = f"unique{user_id}@teste.com"  # <- nunca colide
    payload = {
        "UserName": "Novo Nome",
        "UserEmail": unique_email,
        "UserRole": "Analista",
        "UserStatus": "Ativo",
        "UserComments": "Atualizado via teste"
    }

    response = client.put(f"/auth/users/{user_id}", json=payload, headers=headers)
    assert response.status_code == 200
    data = response.get_json()
    assert data["UserName"] == "Novo Nome"
    assert data["UserEmail"] == unique_email

def test_update_user_not_found(client):
    token = get_token(client)
    headers = {"Authorization": f"Bearer {token}"}

    payload = {
        "UserName": "Teste",
        "UserEmail": "naoexiste@teste.com"
    }

    response = client.put("/auth/users/9999", json=payload, headers=headers)
    assert response.status_code == 404
    assert "não encontrado" in response.get_json()["error"]


def test_update_user_invalid_email(client):
    with next(get_db()) as db:
        user_id = create_user_directly(db)

    token = get_token(client)
    headers = {"Authorization": f"Bearer {token}"}

    payload = {
        "UserName": "Teste",
        "UserEmail": "email-invalido"
    }

    response = client.put(f"/auth/users/{user_id}", json=payload, headers=headers)
    assert response.status_code == 400
