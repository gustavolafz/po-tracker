# app.py
from dotenv import load_dotenv
load_dotenv()

from flask import Flask, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager

# --- Configuração e utilitários
from server.core.config import Config
from server.core.error_handlers import register_error_handlers
from middleware import jwt_middleware

# --- Blueprints
from server.api.endpoints.auth import auth_bp
from server.api.endpoints.users import users_bp
from server.api.endpoints.customers import customer_bp
from server.api.endpoints.orders import orders_bp
from server.api.endpoints.commits import commits_bp
from server.api.endpoints.password_reset import password_reset_bp
from server.api.endpoints import dashboard

# Carrega variáveis de ambiente

def create_app() -> Flask:
    app = Flask(__name__)

    CORS(app,
        resources={r"/api/*": {"origins": [
            "http://localhost:5173",
            "https://frontend-campeoes.vercel.app"
        ]}},
        supports_credentials=True,
        allow_headers=["Content-Type", "Authorization"],
        methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"])

    # Configurações da aplicação
    app.config.from_object(Config)
    JWTManager(app)

    # Registro de handlers globais de erro
    register_error_handlers(app)

    # Registro dos blueprints
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(users_bp, url_prefix="/api/users")
    app.register_blueprint(customer_bp, url_prefix="/api/customers")
    app.register_blueprint(orders_bp, url_prefix="/api/orders")
    app.register_blueprint(commits_bp, url_prefix="/api/commits")
    app.register_blueprint(password_reset_bp, url_prefix="/api/auth/password-reset")
    app.register_blueprint(dashboard.dashboard_bp, url_prefix="/api/dashboard")

    return app


app = create_app()

# --- Ativação opcional do banco de dados
# with app.app_context():
#     Base.metadata.create_all(bind=engine)

# --- Middleware JWT (funcional apenas se usado como before_request)
@app.before_request
def check_jwt_middleware():
    if request.method == "OPTIONS":
        return

    if request.endpoint is None:
        return

    # Rotas públicas
    open_endpoints = [
        "auth.auth_login",
        "auth.auth_register",
        "auth.auth_verify",
        "password_reset.request_password_reset",
        "password_reset.verify_reset_token",
        "password_reset.reset_password_with_token"
    ]

    if request.endpoint not in open_endpoints:
        response = jwt_middleware()
        if response:
            return response

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
