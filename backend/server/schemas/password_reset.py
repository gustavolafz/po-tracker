# server\schemas\password_reset.py

from pydantic import BaseModel, EmailStr

class PasswordResetRequestSchema(BaseModel):
    email: EmailStr

class PasswordResetExecuteSchema(BaseModel):
    token: str
    new_password: str
