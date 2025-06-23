from flask import jsonify
from pydantic import ValidationError
from werkzeug.exceptions import HTTPException
from flask_jwt_extended import JWTManager

jwt = JWTManager()

def register_error_handlers(app):
    jwt.init_app(app)

    @jwt.unauthorized_loader
    def handle_missing_token(error):
        app.logger.warning(f"JWT sem autorização: {error}")
        return jsonify({
            "error": "Token JWT ausente ou não autorizado",
            "detail": error
        }), 401

    @jwt.invalid_token_loader
    def handle_invalid_token(error):
        app.logger.warning(f"JWT inválido: {error}")
        return jsonify({
            "error": "Token JWT inválido",
            "detail": error
        }), 422

    @jwt.expired_token_loader
    def handle_expired_token(jwt_header, jwt_payload):
        app.logger.warning("JWT expirado")
        return jsonify({
            "error": "Token JWT expirado"
        }), 401

    @app.errorhandler(ValidationError)
    def handle_validation_error(error):
        app.logger.error(f'Validation Error: {str(error)}')
        return jsonify({'error': 'Dados inválidos', 'details': str(error)}), 400

    @app.errorhandler(ValueError)
    def handle_value_error(error):
        app.logger.error(f'Value Error: {str(error)}')
        return jsonify({'error': 'Erro de valor inválido', 'details': str(error)}), 400

    @app.errorhandler(HTTPException)
    def handle_http_exception(error):
        app.logger.error(f'HTTP Exception: {error.description}')
        return jsonify({'error': error.description}), error.code

    @app.errorhandler(Exception)
    def handle_general_exception(error):
        app.logger.error(f'Unhandled Exception: {str(error)}')
        return jsonify({'error': 'Erro interno no servidor'}), 500
