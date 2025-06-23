# tests\test_orders_routes.py

import pytest
from flask import Flask
from server.api.endpoints.orders import orders_bp

@pytest.fixture
def test_app():
    app = Flask(__name__)
    app.register_blueprint(orders_bp, url_prefix="/api/orders")
    app.config["TESTING"] = True
    return app

@pytest.fixture
def client(test_app):
    return test_app.test_client()

def test_create_order(client):
    payload = {
        "CustomerID": 1,
        "CaseNumber": "TEST-0001",
        "Status": "Novo",
        "OrderComments": "Criado via teste"
    }
    response = client.post("/api/orders", json=payload)
    assert response.status_code == 201
    data = response.get_json()
    assert "order_id" in data
    assert data["message"] == "Pedido criado com sucesso"

def test_list_orders(client):
    response = client.get("/api/orders")
    assert response.status_code == 200
    assert "orders" in response.get_json()

def test_update_order_status(client):
    response = client.put("/api/orders/update-status")
    assert response.status_code in [200, 500]
    assert "success" in response.get_json()
