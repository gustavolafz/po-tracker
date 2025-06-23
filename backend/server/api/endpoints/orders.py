# server\api\endpoints\orders.py

from flask import Blueprint, request, jsonify, current_app
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
from server.db.database import get_db
from server.models.orders import Order
from server.schemas.orders import OrderCreateSchema
from server.services.orders import OrderService
import json
from server.schemas.orders import OrderCreateSchema, OrderCreateResponseSchema
from server.core.validation_middleware import validate_json

orders_bp = Blueprint("orders", __name__, url_prefix="/api/orders")
service = OrderService()

@orders_bp.route("/<int:order_id>/comment", methods=["PATCH"])
def add_order_comment(order_id: int):
    """Adiciona um comentário à ordem de compra"""
    try:
        data = request.get_json()
        comment = data.get("comment", "").strip()

        if not comment:
            return jsonify({"error": "Comentário é obrigatório"}), 400

        db: Session = next(get_db())
        result = OrderService().add_comment_to_order(db, order_id, comment)

        if not result:
            return jsonify({"error": "Pedido não encontrado"}), 404

        return jsonify({
            "message": "Comentário adicionado com sucesso",
            "orderId": result.OrderID,
            "comment": result.OrderComments
        }), 200

    except Exception as e:
        current_app.logger.error(f"Erro ao adicionar comentário: {e}")
        return jsonify({"error": "Erro interno ao adicionar comentário"}), 500

# --- GET /api/orders
@orders_bp.route("", methods=["GET"])
def list_orders():
    """Lista pedidos com filtros, paginação, ordenação e tratamento de erros."""
    try:
        db: Session = next(get_db())
        result = service.list_orders(db, request.args)
        return jsonify(result), 200
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        current_app.logger.error(f"Erro ao buscar pedidos: {e}")
        return jsonify({"error": "Erro interno ao buscar pedidos"}), 500

@orders_bp.route("/count-by-customer", methods=["GET"])
def get_order_count_by_customer():
    """Returns the number of orders per customer (optionally filtered by status)."""
    try:
        db: Session = next(get_db())
        status = request.args.get("status")  # ← permite ?status=Atrasado
        result = service.count_orders_by_customer(db, status=status)
        return jsonify(result), 200
    except Exception as e:
        current_app.logger.error(f"Error counting orders by customer: {e}")
        return jsonify({"error": "Error while counting orders"}), 500

@orders_bp.route("/<int:order_id>", methods=["GET"])
def get_order_by_id(order_id: int):
    """Retorna os detalhes de um pedido específico pelo ID."""
    try:
        db: Session = next(get_db())
        order = db.query(Order).filter(Order.OrderID == order_id).first()
        if not order:
            return jsonify({"error": "Pedido não encontrado"}), 404
        return jsonify(service.serialize_order(order)), 200
    except Exception as e:
        current_app.logger.error(f"Erro ao buscar pedido {order_id}: {e}")
        return jsonify({"error": "Erro interno ao buscar pedido"}), 500

# --- POST /api/orders
@orders_bp.route("", methods=["POST"])
@validate_json(OrderCreateSchema)
def create_order(data: OrderCreateSchema):
    """Cria um novo pedido a partir dos dados fornecidos no corpo da requisição."""
    try:
        with next(get_db()) as db:
            order_id = service.create_order(db, data)

        response = OrderCreateResponseSchema(
            message="Pedido criado com sucesso",
            order_id=order_id
        )
        return jsonify(response.model_dump()), 201

    except SQLAlchemyError as e:
        current_app.logger.error(f"Erro no banco: {e}")
        return jsonify({"error": "Erro no banco de dados"}), 500
    except Exception as e:
        current_app.logger.error(f"Erro inesperado: {e}")
        return jsonify({"error": "Erro interno no servidor"}), 500

# --- DELETE /api/orders
@orders_bp.route("/<int:order_id>", methods=["DELETE"])
def delete_order(order_id: int):
    """Remove um pedido existente."""
    try:
        db: Session = next(get_db())

        deleted = service.delete_order(db, order_id)
        if not deleted:
            return jsonify({"error": "Pedido não encontrado"}), 404

        return jsonify({"message": f"Pedido {order_id} deletado com sucesso."}), 200

    except Exception as e:
        current_app.logger.error(f"Erro ao deletar pedido {order_id}: {e}")
        return jsonify({"error": "Erro interno ao deletar pedido"}), 500


# --- PUT /api/orders/batch/update-status
@orders_bp.route("/batch/update-status", methods=["PUT"])
def update_order_status():
    """Atualiza o status de pedidos atrasados para 'Atrasado'."""
    try:
        with next(get_db()) as db:
            updated_count = service.update_overdue_orders_status(db)

        return jsonify({
            "success": True,
            "updated_count": updated_count,
            "message": f"{updated_count} pedidos atualizados para 'Atrasado'."
        }), 200

    except Exception as e:
        current_app.logger.error(f"Erro ao atualizar status de pedidos atrasados: {e}")
        return jsonify({
            "success": False,
            "error": "Erro interno ao atualizar status dos pedidos",
            "details": str(e)
        }), 500


from server.schemas.orders import OrderUpdateSchema
from server.core.validation_middleware import validate_json

@orders_bp.route("/<int:order_id>", methods=["PUT"])
@validate_json(OrderUpdateSchema)
def update_order(order_id, data: OrderUpdateSchema):
    """Atualiza um pedido existente com base nos dados enviados."""
    try:
        db: Session = next(get_db())
        order = db.query(Order).filter(Order.OrderID == order_id).first()

        if not order:
            return jsonify({"error": "Pedido não encontrado"}), 404

        if data.OrderComments is not None:
            order.OrderComments = data.OrderComments
        if data.OrderStatus is not None:
            order.OrderStatus = data.OrderStatus
        if data.CaseNumber is not None:
            order.CaseNumber = data.CaseNumber
        if data.CustomerID is not None:
            order.CustomerID = data.CustomerID
        if data.OrderFase is not None:
            order.OrderFase = json.dumps(data.OrderFase)

        db.commit()
        db.refresh(order)

        return jsonify({
            "message": "Pedido atualizado com sucesso",
            "order": {
                "OrderID": order.OrderID,
                "OrderComments": order.OrderComments,
                "OrderStatus": order.OrderStatus,
                "CaseNumber": order.CaseNumber,
                "CustomerID": order.CustomerID,
                "OrderFase": json.loads(order.OrderFase) if order.OrderFase else [],
            }
        }), 200

    except Exception as e:
        current_app.logger.error(f"Erro ao atualizar pedido {order_id}: {e}")
        return jsonify({"error": "Erro interno ao atualizar pedido"}), 500
