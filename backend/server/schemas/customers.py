# server\schemas\customers.py

from pydantic import BaseModel, Field
from typing import Optional

class CustomerCreateSchema(BaseModel):
    CustomerName: str = Field(..., min_length=1, max_length=255)
    CustomerComments: Optional[str] = Field(None, max_length=255)

class CustomerUpdateNameSchema(BaseModel):
    CustomerName: str = Field(..., min_length=1, max_length=255)

class CustomerUpdateCommentsSchema(BaseModel):
    CustomerComments: Optional[str] = Field(None, max_length=255)
