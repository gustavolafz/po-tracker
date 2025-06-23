# server/models/orders.py

from sqlalchemy import Column, Integer, String, TIMESTAMP, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func
from server.db.database import Base

class Order(Base):
    __tablename__ = "Orders"

    OrderID: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    OrderComments: Mapped[str | None] = mapped_column(String(255), nullable=True)
    CustomerID: Mapped[int] = mapped_column(
        ForeignKey("Customers.CustomerID", onupdate="CASCADE", ondelete="RESTRICT"),
        nullable=False
    )
    CaseNumber: Mapped[str] = mapped_column(String(100), nullable=False)
    CreationDate: Mapped[str] = mapped_column(
        TIMESTAMP, nullable=False, server_default=func.now()
    )
    OrderFase: Mapped[str | None] = mapped_column(String(1000), nullable=True)
    OrderStatus: Mapped[str | None] = mapped_column(String(100), nullable=True)

    def __repr__(self) -> str:
        return f"<Order id={self.OrderID} case={self.CaseNumber} status={self.OrderStatus}>"
