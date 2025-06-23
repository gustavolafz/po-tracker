# server\schemas\orders.py

from pydantic import BaseModel, Field
from typing import Optional, List, Union

class OrderCreateSchema(BaseModel):
    CustomerID: int = Field(..., ge=1, description="ID do cliente existente")
    CaseNumber: str = Field(..., max_length=100, min_length=1)
    OrderStatus: Optional[str] = Field(None, max_length=100)
    OrderComments: Optional[str] = Field(None, max_length=255)
    OrderFase: Optional[List[Union[str, None]]] = Field(
        default=None,
        description="Lista com as fases do pedido (ex: ['OPD PO OWNER', None])"
    )

    model_config = {
        "json_schema_extra": {
            "example": {
                "CustomerID": 26,
                "CaseNumber": "CAS-123456-ABCDEF",
                "OrderStatus": "Resolvido",
                "OrderComments": "Criado via API",
                "OrderFase": ["OPD PO OWNER", None]
            }
        }
    }

class OrderCreateResponseSchema(BaseModel):
    message: str
    order_id: int

    model_config = {
        "json_schema_extra": {
            "example": {
                "message": "Pedido criado com sucesso",
                "order_id": 123
            }
        }
    }

class OrderUpdateSchema(BaseModel):
    OrderComments: Optional[str] = Field(None, max_length=255)
    OrderStatus: Optional[str] = Field(None, max_length=100)
    CaseNumber: Optional[str] = Field(None, max_length=100)
    CustomerID: Optional[int] = Field(None, ge=1)
    OrderFase: Optional[List[Union[str, None]]] = Field(
        default=None,
        description="Lista com as fases do pedido (ex: ['OPD PO OWNER', None])"
    )

    model_config = {
        "json_schema_extra": {
            "example": {
                "OrderComments": "Comentário atualizado",
                "OrderStatus": "Resolvido",
                "CaseNumber": "CAS-0001",
                "CustomerID": 12,
                "OrderFase": ["OPD PO OWNER", None]
            }
        }
    }
