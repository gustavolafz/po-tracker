# server/services/dashboard.py

from sqlalchemy.orm import Session
from sqlalchemy import func
from server.models.customers import Customer
from server.models.orders import Order

class DashboardService:
    def get_dashboard_stats(self, db: Session) -> dict:
        total_orders = db.query(func.count(Order.OrderID)).scalar()
        total_clients = db.query(func.count(Customer.CustomerID)).scalar()

        approved = db.query(func.count(Order.OrderID))\
            .filter(Order.OrderStatus.ilike("%Resolvido%")).scalar()

        pending = db.query(func.count(Order.OrderID))\
            .filter(Order.OrderStatus.ilike("%Em Andamento%")).scalar()

        late = db.query(func.count(Order.OrderID))\
            .filter(Order.OrderStatus.ilike("%Atrasado%")).scalar()

        return {
            "totalOrders": total_orders,
            "totalClients": total_clients,
            "approvedOrders": approved,
            "pendingOrders": pending,
            "lateOrders": late,
        }
    def count_orders_by_status(self, db: Session):
        results = (
            db.query(Order.OrderStatus, func.count(Order.OrderID))
            .group_by(Order.OrderStatus)
            .all()
        )
        return [{"name": status, "value": count} for status, count in results]

