import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from server.core.config import Config

logging.basicConfig()
logging.getLogger("sqlalchemy.engine").setLevel(logging.INFO)

# print(f"🔗 Conectando em: {Config.SQLALCHEMY_DATABASE_URI}")

# print("🔧 URI carregada:", repr(Config.SQLALCHEMY_DATABASE_URI))  # <--- Adicione esta linha
engine = create_engine(
    Config.SQLALCHEMY_DATABASE_URI,
    pool_size=10,          # padrão é 5
    max_overflow=20,       # padrão é 10
    pool_timeout=30,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
