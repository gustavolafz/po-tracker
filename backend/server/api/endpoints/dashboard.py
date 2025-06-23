# server/api/endpoints/dashboard.py

from flask import Blueprint, jsonify, current_app
from server.services.dashboard import DashboardService
from server.db.database import get_db
from sqlalchemy.orm import Session

dashboard_bp = Blueprint("dashboard", __name__, url_prefix="/api/dashboard")
service = DashboardService()

# server/api/endpoints/dashboard.py
@dashboard_bp.route("/status-distribution", methods=["GET", "OPTIONS"])
def get_order_status_distribution():
    try:
        db = next(get_db())
        result = service.count_orders_by_status(db)
        db.close()
        return jsonify(result), 200
    except Exception as e:
        current_app.logger.error(f"Erro ao buscar distribuição de status: {e}")
        return jsonify({"error": "Erro ao buscar distribuição de status"}), 500

@dashboard_bp.route("/stats", methods=["GET"])
def get_dashboard_stats():
    try:
        db: Session = next(get_db())
        result = service.get_dashboard_stats(db)
        db.close()
        return jsonify(result), 200
    except Exception as e:
        current_app.logger.error(f"Erro ao buscar estatísticas do dashboard: {e}")
        return jsonify({"error": "Erro ao buscar estatísticas"}), 500
