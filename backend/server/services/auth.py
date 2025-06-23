from jose import jwt, JWTError
from sqlalchemy.orm import Session
from datetime import datetime, timedelta, timezone
from server.core.config import Config
from server.core.security import verify_password
from server.services.users import UserService

class AuthService:
    def __init__(self):
        self.ACCESS_TOKEN_EXPIRE_DAYS = 7
        self.SECRET_KEY = Config.JWT_SECRET_KEY
        self.user_service = UserService()

    def login(self, db: Session, user_data: dict):
        user = self.user_service.get_user_by_email(db, user_data["UserEmail"])
        if not user:
            raise ValueError("Usuário não encontrado")

        if not verify_password(user_data["password"], user.password):
            raise ValueError("Senha inválida")

        token_data = {
            "sub": str(user.UserID),
            "role": user.UserRole
        }

        token = self._create_token(
            data=token_data,
            expires_delta=timedelta(days=self.ACCESS_TOKEN_EXPIRE_DAYS),
        )

        expires_at = datetime.now(timezone.utc) + timedelta(days=self.ACCESS_TOKEN_EXPIRE_DAYS)

        return {
            "user": {
                "id": user.UserID,
                "email": user.UserEmail,
                "name": user.UserName,
                "role": user.UserRole.lower(),
            },
            "token": {
                "access_token": token,
                "token_type": "bearer",
                "expires_at": expires_at.isoformat()
            }
        }

    def logout(self, user_id: int):
        return {"message": "Logout efetuado com sucesso"}

    def _create_token(self, data: dict, expires_delta: timedelta):
        to_encode = data.copy()
        expire = datetime.now(timezone.utc) + expires_delta
        to_encode.update({"exp": expire})
        return jwt.encode(to_encode, self.SECRET_KEY, algorithm="HS256")

    def verify_token(self, token: str):
        try:
            payload = jwt.decode(token, self.SECRET_KEY, algorithms=["HS256"])
            user_id = payload.get("sub")
            if user_id is None:
                raise ValueError("Token inválido ou payload incorreto")
            return True
        except JWTError as e:
            raise ValueError(f"Token inválido: {e}")
