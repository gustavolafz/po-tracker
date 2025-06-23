# server\services\orders.py

from sqlalchemy.orm import Session
from sqlalchemy import case, func, update, asc, desc
from datetime import datetime, timedelta, timezone
from server.models.orders import Order
from server.schemas.orders import OrderCreateSchema
import logging
import json

logger = logging.getLogger(__name__)

class OrderService:

    def listar_por_cliente(
        self,
        db: Session,
        customer_id: int,
        limit: int,
        offset: int
    ) -> dict:
        query = db.query(Order).filter(Order.CustomerID == customer_id)

        # Ordenação por prioridade de status
        status_order = case(
            (Order.OrderStatus == "Atrasado", 0),
            (Order.OrderStatus == "Em Andamento", 1),
            (Order.OrderStatus == "Resolvido", 2),
            else_=99
        )

        total = query.count()

        orders = (
            query.order_by(status_order.asc())
            .offset(offset)
            .limit(limit)
            .all()
        )

        return {
            "orders": [
                {
                    "OrderID": o.OrderID,
                    "OrderComments": o.OrderComments,
                    "CaseNumber": o.CaseNumber,
                    "CreationDate": o.CreationDate.isoformat() if o.CreationDate else None,
                    "OrderFase": o.OrderFase,
                    "OrderStatus": o.OrderStatus
                }
                for o in orders
            ],
            "total": total
        }

    def list_orders(self, db: Session, params: dict) -> dict:
        try:
            limit = int(params.get("limit") or 20)
            offset = int(params.get("offset") or 0)
        except (ValueError, TypeError):
            raise ValueError("Parâmetros 'limit' e 'offset' devem ser inteiros.")

        order_by = params.get("order_by", "OrderID")
        order_dir = params.get("order_dir", "asc")
        case_number = params.get("case")
        status = params.get("status")
        customer_id = params.get("customer_id")

        query = db.query(Order)

        if case_number:
            query = query.filter(Order.CaseNumber.ilike(f"%{case_number}%"))
        if status:
            query = query.filter(Order.OrderStatus.ilike(f"%{status}%"))
        if customer_id:
            try:
                customer_id = int(customer_id)
                query = query.filter(Order.CustomerID == customer_id)
            except ValueError:
                raise ValueError("Parâmetro 'customer_id' inválido. Deve ser um número inteiro.")

        if order_by == "status_priority":
            status_order = case(
                (Order.OrderStatus == "Atrasado", 0),
                (Order.OrderStatus == "Em Andamento", 1),
                (Order.OrderStatus == "Resolvido", 2),
                else_=99
            )
            query = query.order_by(status_order.desc() if order_dir == "desc" else status_order.asc())
        elif hasattr(Order, order_by):
            column = getattr(Order, order_by)
            query = query.order_by(asc(column) if order_dir == "asc" else desc(column))

        total = query.count()

        if offset > 0:
            query = query.offset(offset)
        if limit > 0:
            query = query.limit(limit)

        orders = query.all()
        result = [self.serialize_order(o) for o in orders]

        return {
            "total": total,
            "count": len(result),
            "orders": result
        }

    def count_orders_by_customer(self, db: Session, status: str | None = None) -> list[dict]:
        query = db.query(Order.CustomerID, func.count(Order.OrderID).label("total_orders"))

        if status:
            query = query.filter(Order.OrderStatus.ilike(f"%{status}%"))

        results = query.group_by(Order.CustomerID).all()

        return [{"customerId": r.CustomerID, "totalOrders": r.total_orders} for r in results]

    def add_comment_to_order(self, db: Session, order_id: int, comment: str):
        order = db.query(Order).filter(Order.OrderID == order_id).first()
        if not order:
            return None

        order.OrderComments = comment
        db.commit()
        db.refresh(order)
        return order

    def serialize_order(self, o: Order) -> dict:
        try:
            fase = json.loads(o.OrderFase) if o.OrderFase else []
            if not isinstance(fase, list):
                fase = []
        except (ValueError, TypeError, json.JSONDecodeError):
            fase = []

        return {
            "id": o.OrderID,
            "case": o.CaseNumber,
            "status": o.OrderStatus,
            "customer_id": o.CustomerID,
            "comments": o.OrderComments,
            "created_at": o.CreationDate.isoformat() if o.CreationDate else None,
            "fase": fase
        }

    def create_order(self, db: Session, data: OrderCreateSchema) -> int:
        new_order = Order(
            OrderComments=data.OrderComments,
            CustomerID=data.CustomerID,
            CaseNumber=data.CaseNumber,
            OrderStatus=data.OrderStatus,
            OrderFase=json.dumps(data.OrderFase) if data.OrderFase else None
        )
        db.add(new_order)
        db.commit()
        db.refresh(new_order)
        return new_order.OrderID

    def delete_order(self, db: Session, order_id: int) -> bool:
        order = db.query(Order).filter(Order.OrderID == order_id).first()
        if not order:
            return False
        db.delete(order)
        db.commit()
        return True

    def update_overdue_orders_status(self, db: Session, max_days: int = 73) -> int:
        try:
            cutoff_date = datetime.now(timezone.utc) - timedelta(days=max_days)

            overdue_order_ids = [
                o.OrderID for o in db.query(Order.OrderID)
                .filter(Order.CreationDate < cutoff_date, Order.OrderStatus != 'Atrasado')
                .all()
            ]

            if not overdue_order_ids:
                logger.info("Nenhum pedido atrasado encontrado para atualização.")
                return 0

            stmt = (
                update(Order)
                .where(Order.OrderID.in_(overdue_order_ids))
                .values(OrderStatus='Atrasado')
            )

            result = db.execute(stmt)
            db.commit()

            updated_count = result.rowcount or 0
            logger.info(f"{updated_count} pedidos atualizados para 'Atrasado'.")
            return updated_count

        except Exception as e:
            db.rollback()
            logger.error(f"Erro ao atualizar status de pedidos atrasados: {e}")
            raise
