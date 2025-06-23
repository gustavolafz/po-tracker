# server\api\endpoints\auth.py

from flask import Blueprint, request, jsonify, current_app
from server.db.database import get_db
from server.services.auth import AuthService
from server.services.users import UserService
from server.core.validation_middleware import validate_json
from server.schemas.auth import (
    UserCreateSchema, UserLoginSchema
)
from server.core.token_utils import require_admin

auth_bp = Blueprint("auth", __name__)
auth_service = AuthService()
user_service = UserService()

@auth_bp.route("/login", methods=["POST"])
@validate_json(UserLoginSchema)
def auth_login(data: UserLoginSchema):
    current_app.logger.info("→ POST /auth/login")
    with next(get_db()) as db:
        payload = auth_service.login(db, data.model_dump())
    return jsonify(payload), 200

@auth_bp.route("/logout", methods=["POST"])
def auth_logout():
    current_app.logger.info("→ POST /auth/logout")
    return jsonify({"message": "Logout efetuado com sucesso (client-side only)"}), 200

@auth_bp.route("/verify", methods=["POST"])
def auth_verify():
    data = request.get_json()
    token = data.get("token")

    if not token:
        return jsonify({"error": "Token não fornecido"}), 400

    try:
        is_valid = auth_service.verify_token(token)
        return jsonify({"message": "Token válido" if is_valid else "Token inválido"}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 401
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": "Erro interno no servidor"}), 500
