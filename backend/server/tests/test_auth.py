# tests/test_auth_service.py
# Description: Testes unitários para AuthService com SQLAlchemy usando banco de dados em memória

import pytest
from jose import jwt
from unittest.mock import patch
from server.db.database import Base
from server.models.user import User
from sqlalchemy import create_engine
from server.core.config import Config
from sqlalchemy.orm import sessionmaker
from server.services.auth import AuthService
from server.core.security import hash_password
from server.schemas.auth import UserCreateSchema
from datetime import datetime, timedelta, timezone

# Configurações
SECRET_KEY = "f19a51f6df5b7fa6e0c01e29f146343e596a7899ae3a8f5bd241b0fc6a26abd7"

# Setup do banco em memória (SQLite)
engine = create_engine("sqlite:///:memory:", connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(bind=engine)


@pytest.fixture(scope="module")
def db():
    Base.metadata.create_all(bind=engine)
    session = TestingSessionLocal()
    yield session
    session.close()
    Base.metadata.drop_all(bind=engine)


@pytest.fixture
def auth_service():
    service = AuthService()
    service.SECRET_KEY = SECRET_KEY
    return service


def test_register_new_user(auth_service, db):
    user_data = {
        "first_name": "Test",
        "last_name": "User",
        "email": "newuser@example.com",
        "password": "senha123",
        "activity_level": "moderate",
        "birth_date": "1990-01-01",
        "gender": "male",
    }

    result = auth_service.register(db, user_data)

    assert "user.UserID" in result
    user = db.query(User).filter_by(email="newuser@example.com").first()
    assert user is not None


def test_register_existing_user(auth_service, db):
    existing_user = User(
        first_name="João",
        last_name="Silva",
        email="joao@example.com",
        password=hash_password("senha123"),
        activity_level="moderate",
        birth_date="1990-01-01",
        gender="male",
    )
    db.add(existing_user)
    db.commit()

    duplicate_data = {
        "first_name": "João",
        "last_name": "Silva",
        "email": "joao@example.com",
        "password": "outrasenha",
        "activity_level": "moderate",
        "birth_date": "1990-01-01",
        "gender": "male",
    }

    with pytest.raises(ValueError, match="Usuário com este e-mail já existe"):
        auth_service.register(db, duplicate_data)


def test_login_success(auth_service, db):
    email = "loginuser@example.com"
    raw_password = "minhasenha"
    user = User(
        first_name="Login",
        last_name="User",
        email=email,
        password=hash_password(raw_password),
        activity_level="light",
        birth_date="1992-02-02",
        gender="female",
    )
    db.add(user)
    db.commit()

    response = auth_service.login(db, {"email": email, "password": raw_password})

    assert "token" in response
    assert "access_token" in response["token"]
    assert response["user"]["email"] == email


def test_login_user_not_found(auth_service, db):
    with pytest.raises(ValueError, match="Usuário não encontrado"):
        auth_service.login(db, {"email": "inexistente@example.com", "password": "senha123"})


def test_login_invalid_password(auth_service, db):
    email = "wrongpass@example.com"
    user = User(
        first_name="Wrong",
        last_name="Pass",
        email=email,
        password=hash_password("senha_correta"),
        activity_level="high",
        birth_date="1988-03-03",
        gender="male",
    )
    db.add(user)
    db.commit()

    with pytest.raises(ValueError, match="Senha inválida"):
        auth_service.login(db, {"email": email, "password": "senha_errada"})


def test_create_token(auth_service):
    test_data = {"sub": "123"}
    expires = timedelta(days=1)
    token = auth_service._create_token(test_data, expires)

    decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    assert decoded["sub"] == "123"
    assert "exp" in decoded


def test_verify_valid_token(auth_service):
    token_data = {"sub": "999"}
    token = auth_service._create_token(token_data, timedelta(days=1))

    is_valid = auth_service.verify_token(token)
    assert is_valid is True


def test_verify_invalid_token(auth_service):
    with pytest.raises(ValueError, match="Token inválido"):
        auth_service.verify_token("token.invalido.aqui")


def test_verify_expired_token(auth_service):

    expired_payload = {
        "sub": "123",
        "exp": datetime.now(timezone.utc) - timedelta(days=1)
    }
    expired_token = jwt.encode(expired_payload, SECRET_KEY, algorithm="HS256")

    with pytest.raises(ValueError, match="Token inválido"):
        auth_service.verify_token(expired_token)
