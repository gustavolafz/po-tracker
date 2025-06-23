# server\core\token_utils.py

from flask import request, jsonify, current_app
from functools import wraps
from jose import jwt
from server.core.config import Config

def decode_token(token: str):
    return jwt.decode(token, Config.SECRET_KEY, algorithms=["HS256"])

def require_admin(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token:
            return jsonify({"error": "Token não fornecido"}), 401
        try:
            payload = decode_token(token.split(" ")[1])
            if payload.get("role") != "admin":
                return jsonify({"error": "Acesso negado"}), 403
        except Exception as e:
            current_app.logger.error(f"Token inválido ou erro de decodificação: {e}")
            return jsonify({"error": "Token inválido ou expirado"}), 401
        return f(*args, **kwargs)
    return wrapper
