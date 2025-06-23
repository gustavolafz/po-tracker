# server\api\endpoints\password_reset.py

from flask import Blueprint, request, jsonify
from pydantic import ValidationError
from server.db.database import get_db
from server.services.password_reset import PasswordResetService
from server.schemas.password_reset import PasswordResetRequestSchema

password_reset_bp = Blueprint("password_reset", __name__)
service = PasswordResetService()

@password_reset_bp.route("/request", methods=["POST"])
def request_password_reset():
    try:
        data = PasswordResetRequestSchema(**request.get_json())
    except ValidationError as e:
        return jsonify({"error": e.errors()}), 400

    with next(get_db()) as db:
        success = service.request_password_reset(db, data.email)
        if not success:
            return jsonify({"message": "Usuário não encontrado"}), 404

        return jsonify({"message": "Nova senha enviada por e-mail"}), 200
