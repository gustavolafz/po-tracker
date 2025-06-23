# server\api\endpoints\users.py

from flask import Blueprint, current_app, request, jsonify
from flask_jwt_extended import jwt_required
from pydantic import ValidationError
from server.core.validation_middleware import validate_json
from server.db.database import get_db
from server.schemas.auth import UserCreateSchema, UserUpdateSchema, UserResponseSchema
from server.services.users import UserService

users_bp = Blueprint("users", __name__)
user_service = UserService()

@users_bp.route("", methods=["POST"])
@validate_json(UserCreateSchema)
# @require_admin  # Descomente se desejar restringir criação a admins
def create_user(data: UserCreateSchema):
    current_app.logger.info("→ POST /users")
    with next(get_db()) as db:
        user_service.register(db, data.model_dump())
    return jsonify({"message": "Usuário criado com sucesso"}), 201

@users_bp.route("", methods=["GET"])
def list_users():
    """Lista usuários com filtros, paginação e ordenação."""
    filters = {
        "limit": request.args.get("limit", default=20, type=int),
        "offset": request.args.get("offset", default=0, type=int),
        "order_by": request.args.get("order_by", default="UserID"),
        "order_dir": request.args.get("order_dir", default="asc"),
        "name": request.args.get("name"),
        "email": request.args.get("email"),
        "role": request.args.get("role"),
    }

    with next(get_db()) as db:
        result = user_service.list_users(db, filters)
        serialized = [
            UserResponseSchema.model_validate(u).model_dump()
            for u in result["users"]
        ]
        return jsonify({
            "total": result["total"],
            "count": result["count"],
            "users": serialized
        }), 200

@users_bp.route("/<int:user_id>", methods=["PUT"])
@jwt_required()
def update_user(user_id: int):
    try:
        update_data = UserUpdateSchema(**request.get_json())
    except ValidationError as e:
        return jsonify({"error": e.errors()}), 400

    with next(get_db()) as db:
        try:
            updated = user_service.update_user(db, user_id, update_data)
            if not updated:
                return jsonify({"error": "Usuário não encontrado"}), 404

            return jsonify(UserResponseSchema.model_validate(updated).model_dump()), 200

        except ValueError as e:
            if "não encontrado" in str(e).lower():
                return jsonify({"error": str(e)}), 404
            return jsonify({"error": str(e)}), 400

@users_bp.route("/<int:user_id>/orders", methods=["GET"])
@jwt_required()
def get_user_orders(user_id: int):
    """
    Lista todos os pedidos (orders) de um usuário (CustomerID).
    """
    with next(get_db()) as db:
        orders = user_service.list_orders_by_customer(db, user_id)
        return jsonify({
            "count": len(orders),
            "orders": orders
        }), 200
