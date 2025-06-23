# test_db_connection.py

from server.db.database import engine
from sqlalchemy import text

try:
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))
        print("Conexão bem-sucedida:", result.fetchone())
except Exception as e:
    print("Erro na conexão:", e)
