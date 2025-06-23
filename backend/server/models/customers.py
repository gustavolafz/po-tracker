# server\models\customers.py

from sqlalchemy import Column, Integer, String, DateTime, Text, func
from sqlalchemy.orm import relationship
from server.db.database import Base

class Customer(Base):
    __tablename__ = "Customers"

    CustomerID = Column(Integer, primary_key=True, autoincrement=True)
    CustomerName = Column(Text, nullable=False)
    CustomerComments = Column(String(255))
    CreatedAt = Column(DateTime, nullable=False, server_default=func.now())

    # Relacionamento com pedidos (assumindo chave estrangeira em Order)
    # orders = relationship("Order", back_populates="customer")
