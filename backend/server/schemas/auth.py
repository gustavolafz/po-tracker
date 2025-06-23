# server/schemas/auth.py
# Schemas Pydantic para autenticação e gerenciamento de usuários.

from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Optional, Literal
from datetime import date


# --- Schema para Criação de Usuário ---
class UserCreateSchema(BaseModel):
    UserName: str = Field(..., min_length=1, max_length=255)
    UserEmail: EmailStr
    password: str = Field(..., min_length=1, max_length=45)

    UserRole: Optional[str] = Field(default="Analista", max_length=100)
    UserStatus: Optional[str] = Field(default="Inativo", max_length=20)
    UserComments: Optional[str] = Field(default=None, max_length=255)

    class Config:
        json_schema_extra = {
            "example": {
                "UserName": "João da Silva",
                "UserEmail": "joao@exemplo.com",
                "password": "senhaSegura123",
                "UserRole": "Analista",       # opcional
                "UserStatus": "Ativo",       # opcional
                "UserComments": "Novo usuário do sistema"  # opcional
            }
        }


# --- Schema para Login ---
from pydantic import BaseModel, EmailStr, Field

class UserLoginSchema(BaseModel):
    UserEmail: EmailStr = Field(..., alias="UserEmail")
    password: str

    class Config:
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "UserEmail": "usuario@exemplo.com",
                "password": "senhaSegura123"
            }
        }

# --- Schema para Atualização de Usuário ---
class UserUpdateSchema(BaseModel):
    UserName: Optional[str] = Field(None, min_length=1, max_length=255)
    UserEmail: Optional[EmailStr] = None
    UserRole: Optional[str] = Field(None, max_length=100)
    UserStatus: Optional[str] = Field(None, max_length=20)
    UserComments: Optional[str] = Field(None, max_length=255)

    class Config:
        json_schema_extra = {
            "example": {
                "UserName": "Nome Atualizado",
                "UserEmail": "novo_email@exemplo.com",
                "UserRole": "Analista Senior",
                "UserStatus": "Inativo",
                "UserComments": "Usuário atualizado via API"
            }
        }


# --- Schema para Resposta de Usuário ---
class UserResponseSchema(BaseModel):
    UserID: int
    UserName: str
    UserEmail: Optional[EmailStr]
    UserRole: str
    UserStatus: str
    UserComments: Optional[str]

    model_config = ConfigDict(from_attributes=True)
