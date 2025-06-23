# server\services\password_reset.py

from sqlalchemy.orm import Session
from server.services.users import UserService
from server.core.security import hash_password
from server.core.mailer import send_password_reset_email
import secrets

class PasswordResetService:
    def __init__(self):
        self.user_service = UserService()

    def request_password_reset(self, db: Session, email: str) -> bool:
        user = self.user_service.get_user_by_email(db, email)
        if not user:
            print(f"[Reset] E-mail não encontrado: {email}")
            return False

        new_password = self._generate_temp_password()
        user.password = hash_password(new_password)

        db.add(user)
        db.commit()

        send_password_reset_email(user.UserEmail, new_password)
        print(f"[Reset] Nova senha enviada para {email}")
        return True

    def _generate_temp_password(self, length: int = 12) -> str:
        return secrets.token_urlsafe(length)[:length]
