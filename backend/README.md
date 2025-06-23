# 🛠️ Backend Campeões

> API backend para rastreamento e análise de ordens de compra (POs), integrando autenticação, comentários, análise via IA e integração com front React.

---

## ✅ Funcionalidades Desenvolvidas

- 🔐 **Autenticação JWT** segura e modular (login, registro, recuperação de senha).
- 🧩 **Organização por Blueprints** para modularização dos endpoints.
- 📦 **Deploy via Docker + Railway**, pronto para produção.
- 🗃️ **SQLAlchemy** como ORM para persistência robusta.
- 🧠 **Interpretação automática de comentários** com IA.
- 📊 **Endpoints RESTful** para Users, Customers, Orders e Commits.
- 🧪 **Testes automatizados com Pytest**.

---

## 🧱 Estrutura de Pastas

```bash
├── app.py                          # Inicialização da aplicação Flask
├── Dockerfile                      # Containerização com Gunicorn
├── .env / .env.example             # Variáveis de ambiente
├── requirements.txt                # Dependências do projeto
├── README.md                       # Este arquivo

├── server/
│   ├── api/
│   │   └── endpoints/              # Rotas organizadas por módulo
│   ├── core/                       # Configs globais, segurança, handlers
│   ├── db/                         # Conexão e modelo de dados (SQLAlchemy)
│   ├── models/                     # Estrutura das entidades
│   ├── schemas/                    # Schemas de entrada e saída (Pydantic)
│   ├── services/                   # Lógica de negócio
│   └── utils/                      # Funções auxiliares e parsing
```

---

## 🧠 Arquitetura da Aplicação

```bash
+-------------------+
|    Frontend (Vite |
|     + React App)  |
+-------------------+
          |
          v
+-------------------+
|    Flask + JWT    |
+-------------------+
          |
          v
+-------------------+       +----------------------+
|    API Endpoints  |<----->|     Services Layer   |
+-------------------+       +----------------------+
          |                         |
          v                         v
+-------------------+       +----------------------+
| External Services |       |   PostgreSQL / MySQL |
|  (ex: IA, GitHub) |       | via SQLAlchemy ORM   |
+-------------------+       +----------------------+
```

---

## 🐳 Deploy com Docker + Railway

### 📦 Dockerfile

> O projeto já está preparado para deploy com Gunicorn:

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY . .
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 5000
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:5000"]
```

### 🚀 Railway

- Conecte seu repositório forkado
- Railway detecta o Dockerfile
- Adicione variáveis do `.env` no painel
- URL pública gerada automaticamente

---

## 🚀 Tecnologias Utilizadas

| Categoria        | Tecnologias                                                  |
|------------------|--------------------------------------------------------------|
| 🔙 Backend       | Flask · SQLAlchemy · Pydantic · Python-Jose · Flask-JWT      |
| 🧪 Testes        | Pytest                                                       |
| 📄 API Docs      | Flask-Restful + JSON Models                                  |
| 🔧 Utilidades    | Dotenv · Requests · Gunicorn · CORS                          |
| 📦 Deploy        | Docker · Railway                                             |

---

## 📌 Variáveis de Ambiente (.env)

```env
JWT_SECRET_KEY=...
DATABASE_URL=...
CLIENT_ID=...
CLIENT_SECRET=...
```

---

## ✨ Contribuições

Pull requests são bem-vindos! Este projeto é parte de uma sprint colaborativa com foco em rastreabilidade e automação de compras.
