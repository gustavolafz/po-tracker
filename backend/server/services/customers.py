# server\services\customers.py

from sqlalchemy import asc, desc, func
from sqlalchemy.orm import Session
from server.models.customers import Customer
from server.models.orders import Order

class CustomerService:

    @staticmethod
    def buscar_por_id(db: Session, customer_id: int):
        return db.query(Customer).filter(Customer.CustomerID == customer_id).first()

    @staticmethod
    def listar_clientes(
        db: Session,
        name_filter: str | None = None,
        limit: int | None = None,
        offset: int | None = None,
        order_by: str = "CustomerID",
        order_dir: str = "asc"
    ) -> dict:
        if order_by == "total_orders":
            # Query com join + group by para contar pedidos
            query = (
                db.query(
                    Customer,
                    func.count(Order.OrderID).label("total_orders")
                )
                .outerjoin(Order, Customer.CustomerID == Order.CustomerID)
                .group_by(Customer.CustomerID)
            )

            if name_filter:
                query = query.filter(Customer.CustomerName.ilike(f"%{name_filter}%"))

            query = query.order_by(
                desc("total_orders") if order_dir == "desc" else asc("total_orders")
            )

            if offset is not None:
                query = query.offset(offset)
            if limit is not None:
                query = query.limit(limit)

            rows = query.all()

            return {
                "total": len(rows),
                "count": len(rows),
                "items": [
                    {
                        "CustomerID": c.CustomerID,
                        "CustomerName": c.CustomerName,
                        "CustomerComments": c.CustomerComments,
                        "CreatedAt": c.CreatedAt.isoformat() if c.CreatedAt else None,
                        "TotalOrders": total_orders
                    }
                    for c, total_orders in rows
                ]
            }

        # Default: sem total_orders
        query = db.query(Customer)

        if name_filter:
            query = query.filter(Customer.CustomerName.ilike(f"%{name_filter}%"))

        total = query.count()

        if hasattr(Customer, order_by):
            column = getattr(Customer, order_by)
            query = query.order_by(column.desc() if order_dir == "desc" else column.asc())

        if offset is not None:
            query = query.offset(offset)
        if limit is not None:
            query = query.limit(limit)

        customers = query.all()

        return {
            "total": total,
            "count": len(customers),
            "items": [
                {
                    "CustomerID": c.CustomerID,
                    "CustomerName": c.CustomerName,
                    "CustomerComments": c.CustomerComments,
                    "CreatedAt": c.CreatedAt.isoformat() if c.CreatedAt else None,
                    "TotalOrders": 0
                }
                for c in customers
            ]
        }

    @staticmethod
    def atualizar_nome(db: Session, customer_id: int, novo_nome: str):
        customer = db.query(Customer).get(customer_id)
        if not customer:
            raise ValueError("Cliente não encontrado")

        customer.CustomerName = novo_nome
        db.commit()
        db.refresh(customer)
        return customer

    @staticmethod
    def add_comment(db: Session, customer_id: int, comment: str) -> Customer | None:
        customer = db.query(Customer).filter(Customer.CustomerID == customer_id).first()
        if not customer:
            return None

        customer.CustomerComments = comment
        db.commit()
        db.refresh(customer)
        return customer

    @staticmethod
    def atualizar_comentario(db: Session, customer_id: int, novo_comentario: str):
        customer = db.query(Customer).get(customer_id)
        if not customer:
            raise ValueError("Cliente não encontrado")

        customer.CustomerComments = novo_comentario
        db.commit()
        db.refresh(customer)
        return customer

    @staticmethod
    def criar_cliente(db: Session, nome: str, comentario: str | None = None) -> Customer:
        novo_cliente = Customer(CustomerName=nome, CustomerComments=comentario)
        db.add(novo_cliente)
        db.commit()
        db.refresh(novo_cliente)
        return novo_cliente

    @staticmethod
    def deletar_cliente(db: Session, customer_id: int) -> None:
        cliente = db.query(Customer).get(customer_id)
        if not cliente:
            raise ValueError("Cliente não encontrado")
        db.delete(cliente)
        db.commit()
