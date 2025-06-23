import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from server.db.database import Base

# Engine global para reaproveitamento
engine = create_engine("sqlite:///:memory:", echo=False)

# Sessão configurada para testes
TestingSessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

@pytest.fixture(scope="function")
def db_session():
    """Cria uma sessão de banco de dados limpa para cada teste."""
    # Cria as tabelas uma vez por teste (garante isolamento)
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()
