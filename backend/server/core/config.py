# server/core/config.py

import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    DB_USER = os.getenv("DB_USER")
    DB_PASSWORD = os.getenv("DB_PASSWORD")
    DB_HOST = os.getenv("DB_HOST")
    DB_PORT = os.getenv("DB_PORT")
    DB_NAME = os.getenv("DB_NAME")
    SMTP_HOST = os.getenv("SMTP_HOST")
    SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
    SMTP_USER = os.getenv("SMTP_USER")
    SMTP_PASS = os.getenv("SMTP_PASS")

    # Pega conteúdo opcional do certificado SSL
    SSL_CA_CONTENT = os.getenv("SSL_CA_CONTENT")

    # Se existir, cria arquivo temporário dentro do container
    if SSL_CA_CONTENT:
        import tempfile
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pem") as f:
            f.write(SSL_CA_CONTENT.encode())
            ssl_path = f.name
    else:
        ssl_path = None

    # Monta a string final do SQLAlchemy
    SQLALCHEMY_DATABASE_URI = (
        f"mysql+mysqlconnector://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
        + (f"?ssl_ca={ssl_path}" if ssl_path else "")
        if all([DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME])
        else None
    )

    SECRET_KEY = os.getenv("SECRET_KEY")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

