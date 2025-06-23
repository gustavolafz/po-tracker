# server\api\endpoints\customers.py

import traceback
from sqlalchemy.orm import Session
from flask import Blueprint, request, jsonify, current_app
from server.db.database import get_db
from server.models.customers import Customer
from server.services.customers import CustomerService
from server.schemas.customers import (
    CustomerCreateSchema,
    CustomerUpdateNameSchema,
    CustomerUpdateCommentsSchema,
)
from server.services.orders import OrderService

customer_bp = Blueprint("customer", __name__)

@customer_bp.route("/<int:customer_id>/comment", methods=["PATCH"])
def add_customer_comment(customer_id: int):
    try:
        data = request.get_json()
        comment = data.get("comment", "").strip()

        if not comment:
            return jsonify({"error": "Comment is required"}), 400

        db: Session = next(get_db())
        result = CustomerService.add_comment(db, customer_id, comment)

        if result is None:
            return jsonify({"error": "Customer not found"}), 404

        return jsonify({
            "message": "Comment added successfully",
            "customerId": result.CustomerID,
            "comment": result.CustomerComments
        }), 200

    except Exception as e:
        current_app.logger.error(f"Error while adding customer comment: {e}")
        return jsonify({"error": "Internal server error while adding comment"}), 500

@customer_bp.route("/<int:customer_id>", methods=["GET"])
def get_customer_by_id(customer_id):
    """Retorna um cliente específico pelo ID."""
    try:
        with next(get_db()) as db:
            customer = CustomerService.buscar_por_id(db, customer_id)
            if not customer:
                return jsonify({"error": "Cliente não encontrado"}), 404

            return jsonify({
                "CustomerID": customer.CustomerID,
                "CustomerName": customer.CustomerName,
                "CustomerComments": customer.CustomerComments,
                "CreatedAt": customer.CreatedAt.isoformat() if customer.CreatedAt else None,
            }), 200

    except Exception as e:
        current_app.logger.error(f"Erro ao buscar cliente {customer_id}: {e}")
        return jsonify({"error": "Erro interno"}), 500

@customer_bp.route("", methods=["GET"])
def get_customers():
    """Retorna clientes com filtros opcionais por nome, paginação e ordenação."""
    name_filter = request.args.get("name")
    limit = request.args.get("limit", type=int)
    offset = request.args.get("offset", type=int)
    order_by = request.args.get("order_by", default="CustomerID")
    order_dir = request.args.get("order_dir", default="asc")

    try:
        with next(get_db()) as db:
            result = CustomerService.listar_clientes(
                db,
                name_filter=name_filter,
                limit=limit,
                offset=offset,
                order_by=order_by,
                order_dir=order_dir
            )
            return jsonify(result), 200

    except Exception as e:
        current_app.logger.error(f"Erro ao buscar clientes: {e}")
        return jsonify({"error": "Erro interno ao buscar clientes"}), 500

@customer_bp.route("/<int:customer_id>/orders", methods=["GET"])
def get_orders_by_customer(customer_id):
    """Retorna as ordens de um cliente com paginação."""
    try:
        limit = int(request.args.get("limit", 10))
        offset = int(request.args.get("offset", 0))

        with next(get_db()) as db:
            result = OrderService().listar_por_cliente(db, customer_id, limit, offset)
            return jsonify(result), 200

    except Exception as e:
        current_app.logger.error(f"Erro ao buscar orders do cliente {customer_id}: {e}")
        traceback.print_exc()
        return jsonify({"error": "Erro interno ao buscar orders do cliente"}), 500

@customer_bp.route("", methods=["POST"])
def create_customer():
    try:
        payload = CustomerCreateSchema(**request.get_json())

        with next(get_db()) as db:
            novo = CustomerService.criar_cliente(db, payload.CustomerName, payload.CustomerComments)
            return jsonify({
                "CustomerID": novo.CustomerID,
                "CustomerName": novo.CustomerName,
                "CustomerComments": novo.CustomerComments,
                "CreatedAt": novo.CreatedAt.isoformat()
            }), 201

    except Exception as e:
        current_app.logger.error(f"Erro ao criar cliente: {e}")
        return jsonify({"error": "Erro ao criar cliente"}), 500

@customer_bp.route("/<int:customer_id>/update-name", methods=["PUT"])
def update_customer_name(customer_id):
    try:
        payload = CustomerUpdateNameSchema(**request.get_json())

        with next(get_db()) as db:
            customer = CustomerService.atualizar_nome(db, customer_id, payload.CustomerName)
            return jsonify({
                "CustomerID": customer.CustomerID,
                "CustomerName": customer.CustomerName,
                "CustomerComments": customer.CustomerComments,
                "CreatedAt": customer.CreatedAt.isoformat()
            }), 200

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 404
    except Exception as e:
        current_app.logger.error(f"Erro ao atualizar nome: {e}")
        return jsonify({"error": "Erro interno"}), 500


@customer_bp.route("/<int:customer_id>/update-comments", methods=["PUT"])
def update_customer_comments(customer_id):
    try:
        payload = CustomerUpdateCommentsSchema(**request.get_json())

        with next(get_db()) as db:
            customer = CustomerService.atualizar_comentario(db, customer_id, payload.CustomerComments)
            return jsonify({
                "CustomerID": customer.CustomerID,
                "CustomerName": customer.CustomerName,
                "CustomerComments": customer.CustomerComments,
                "CreatedAt": customer.CreatedAt.isoformat()
            }), 200

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 404
    except Exception as e:
        current_app.logger.error(f"Erro ao atualizar comentário: {e}")
        return jsonify({"error": "Erro interno"}), 500

@customer_bp.route("/<int:customer_id>", methods=["DELETE"])
def delete_customer(customer_id):
    try:
        with next(get_db()) as db:
            CustomerService.deletar_cliente(db, customer_id)
            return jsonify({"message": "Cliente deletado com sucesso."}), 200
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 404
    except Exception as e:
        current_app.logger.error(f"Erro ao deletar cliente: {e}")
        return jsonify({"error": "Erro interno ao deletar cliente"}), 500
