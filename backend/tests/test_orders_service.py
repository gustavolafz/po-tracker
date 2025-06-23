# tests\test_orders_service.py

import pytest
from datetime import datetime, timedelta, timezone
from sqlalchemy.orm import Session
from server.models.orders import Order
from server.services.orders import OrderService

@pytest.fixture
def pedidos_para_teste(db_session: Session):
    recentes = [
        Order(CaseNumber="C-OK-001", Status="Em Andamento", CustomerID=1,
              CreationDate=datetime.now(timezone.utc) - timedelta(days=5)),
        Order(CaseNumber="C-OK-002", Status="Finalizado", CustomerID=2,
              CreationDate=datetime.now(timezone.utc) - timedelta(days=10)),
    ]
    atrasados = [
        Order(CaseNumber="C-AT-001", Status="Em Andamento", CustomerID=3,
              CreationDate=datetime.now(timezone.utc) - timedelta(days=100)),
        Order(CaseNumber="C-AT-002", Status="Em Andamento", CustomerID=4,
              CreationDate=datetime.now(timezone.utc) - timedelta(days=80)),
    ]
    db_session.add_all(recentes + atrasados)
    db_session.commit()
    return recentes, atrasados

def test_update_overdue_orders_status(db_session: Session, pedidos_para_teste):
    recentes, atrasados = pedidos_para_teste
    service = OrderService()
    updated_count = service.update_overdue_orders_status(db_session)
    assert updated_count == len(atrasados)

def test_create_order_simulado(db_session: Session):
    pedido = Order(CaseNumber="TEST-001", Status="Novo", CustomerID=99,
                   OrderComments="Pedido de teste via ORM",
                   CreationDate=datetime.now(timezone.utc))
    db_session.add(pedido)
    db_session.commit()
    db_session.refresh(pedido)
    assert pedido.OrderID is not None

def test_list_orders_simples(db_session: Session):
    pedidos = [
        Order(CaseNumber=f"L-{i}", Status="Novo", CustomerID=1,
              OrderComments=f"Pedido {i}",
              CreationDate=datetime.now(timezone.utc))
        for i in range(5)
    ]
    db_session.add_all(pedidos)
    db_session.commit()
    result = db_session.query(Order).order_by(Order.OrderID.desc()).limit(3).all()
    assert len(result) == 3
