# server\models\user.py

from typing import Optional
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import Session
from server.db.database import Base

class User(Base):
    __tablename__ = "Users"  # <- Mantenha exatamente como está no banco

    UserID = Column(Integer, primary_key=True, index=True, autoincrement=True)
    UserName = Column(String(255), nullable=False)
    UserEmail = Column(String(255))
    UserRole = Column(String(100), nullable=False, default='Analista')
    UserStatus = Column(String(20), nullable=False, default='Inativo')
    UserComments = Column(String(255))
    password = Column(String(45), nullable=False, default='Senha')

    @classmethod
    def get_by_email(cls, db: Session, email: str) -> Optional["User"]:
        return db.query(cls).filter(cls.UserEmail == email).first()


