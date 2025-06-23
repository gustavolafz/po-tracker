# server/api/endpoints/commits.py

from flask import Blueprint, request, jsonify
import requests
import os
from dotenv import load_dotenv
from flask_jwt_extended import jwt_required  # Proteção JWT

load_dotenv()

commits_bp = Blueprint("commits", __name__)
# Repositórios permitidos
ALLOWED_REPOS = {
    "backend": "insper-classroom/backend-campeoes",
    "frontend": "insper-classroom/frontend-campeoes",
    "dados": "insper-classroom/dados-campeoes",
}

@commits_bp.route("", methods=["GET"])
@jwt_required()
def get_commits():
    repo_key = request.args.get("repo", "backend")
    branch = request.args.get("branch", "main")
    page = int(request.args.get("page", 1))
    per_page = int(request.args.get("per_page", 10))

    repo = ALLOWED_REPOS.get(repo_key)
    if not repo:
        return jsonify({"error": f"Repositório inválido: {repo_key}"}), 400

    github_token = os.getenv("GITHUB_TOKEN")
    if not github_token:
        return jsonify({"error": "GITHUB_TOKEN não definido nas variáveis de ambiente"}), 500

    url = (
        f"https://api.github.com/repos/{repo}/commits"
        f"?sha={branch}&page={page}&per_page={per_page}"
    )

    headers = {
        "Authorization": f"Bearer {github_token}",
        "Accept": "application/vnd.github+json"
    }

    response = requests.get(url, headers=headers)

    github_token = os.getenv("GITHUB_TOKEN")
    if not github_token:
        return jsonify({"error": "GITHUB_TOKEN não definido"}), 500

    try:
        response = requests.get(url, headers=headers)

        if response.status_code != 200:
            return jsonify({
                "error": f"Erro ao buscar commits da branch '{branch}' no repositório '{repo}'",
                "status": response.status_code,
                "details": response.json()
            }), response.status_code

    except Exception as e:
        return jsonify({
            "error": "Erro na requisição ao GitHub",
            "exception": str(e)
        }), 500

    data = response.json()
    commits = []

    for item in data:
        msg = item["commit"]["message"]
        title, description = (msg.split("\n\n", 1) + [""])[:2]
        commits.append({
            "title": title.strip(),
            "description": description.strip(),
            "author": item["commit"]["author"]["name"],
            "date": item["commit"]["author"]["date"],
            "sha": item["sha"],
            "url": item["html_url"]
        })

    return jsonify({
        "repo": repo,
        "branch": branch,
        "page": page,
        "per_page": per_page,
        "count": len(commits),
        "commits": commits
    })


@commits_bp.route("/branches", methods=["GET"])
@jwt_required()
def list_branches():
    repo_key = request.args.get("repo", "backend")
    repo = ALLOWED_REPOS.get(repo_key)

    if not repo:
        return jsonify({"error": f"Repositório inválido: {repo_key}"}), 400

    url = f"https://api.github.com/repos/{repo}/branches"
    headers = {
        "Authorization": f"Bearer {os.getenv('GITHUB_TOKEN')}",
        "Accept": "application/vnd.github+json"
    }

    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return jsonify({
            "error": f"Erro ao buscar branches do repositório '{repo}'",
            "status": response.status_code,
            "details": response.json()
        }), response.status_code

    branches = [{"name": b["name"], "protected": b["protected"]} for b in response.json()]
    return jsonify({
        "repo": repo,
        "branches": branches
    })
