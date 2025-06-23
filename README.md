# 🧭 PO Tracker — Monorepo 

Sistema completo de rastreamento e análise de ordens de compra (POs), com **frontend moderno** (React + Vite) e **backend robusto** (Flask + SQLAlchemy).  
Este repositório adota a estrutura de **monorepo** para facilitar desenvolvimento, testes e deploy integrado.

---

## 📦 Estrutura do Repositório

```
PO-tracker/
├── frontend/           # Interface web (React + Vite)
│   ├── README.md       # Documentação específica do frontend
│   └── .env.example    # Variáveis de ambiente do Vite
├── backend/            # API REST (Flask + SQLAlchemy)
│   ├── README.md       # Documentação específica do backend
│   └── .env.example    # Configs: banco, JWT, SMTP etc.
├── .github/            # Workflows de CI/CD (GitHub Actions)
├── README.md           # Documentação principal do projeto
```

> 📚 Para mais detalhes sobre cada parte do sistema:
> - 🔗 [Leia o README do Backend](./backend/README.md)
> - 🔗 [Leia o README do Frontend](./frontend/README.md)

---

## 🚀 Stacks

| Camada       | Tecnologias Chave                                       |
|--------------|----------------------------------------------------------|
| Frontend     | React, Vite, TypeScript, Tailwind, TanStack Query       |
| Backend      | Flask, SQLAlchemy, Pydantic, Pytest, Gunicorn, Docker   |
| Auth         | JWT (Token-based authentication)                        |
| Deploy       | Vercel (frontend), Railway + Docker (backend)           |
| Testes       | Pytest (back), Vitest *(frontend - planejamento futuro)*|

---

## 🧪 Como rodar o projeto localmente

### 🔐 Variáveis de Ambiente

Copie os arquivos `.env.example` para cada subprojeto e configure as chaves:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

### 📥 Instalação

```bash
# Clone o repositório
git clone https://github.com/gustavolafz/PO-tracker.git
cd PO-tracker

# Frontend
cd frontend
npm install

# Backend
cd ../backend
pip install -r requirements.txt
```

### 🚀 Execução

```bash
# Frontend
cd frontend
npm run dev

# Backend
cd ../backend
python app.py  # ou via gunicorn
```

---

## 🧱 Convenção de Branches

| Tipo         | Prefixo            | Exemplo                          |
|--------------|--------------------|----------------------------------|
| Feature      | `feat/`            | `feat/login-flow`                |
| Bugfix       | `fix/`             | `fix/token-expiration`           |
| Refactor     | `refactor/`        | `refactor/hooks-cleanup`         |
| Frontend     | `frontend/`        | `frontend/comments-ui`           |
| Backend      | `backend/`         | `backend/comments-endpoint`      |

> Branches convergem para `dev` → integração contínua.  
> Releases estáveis são mergeadas em `main`.

---

## ⚙️ CI/CD

Workflows de GitHub Actions rodam separadamente para cada camada:

- `frontend.yml` → Lint + Build + Preview
- `backend.yml` → Lint + Pytest + Docker Build

> Apenas mudanças em cada pasta disparam seus respectivos workflows.

---

## 📄 Licença

Projeto interno para fins educacionais, desenvolvido por alunos do **Insper**.

© 2025 — Todos os direitos reservados.