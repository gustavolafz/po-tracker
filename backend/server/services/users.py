# server\services\users.py

from sqlalchemy.orm import Session
from typing import Optional
from sqlalchemy import asc, desc
from server.models.user import User
from server.models.orders import Order
from server.core.security import hash_password
from server.schemas.auth import UserUpdateSchema

class UserService:
    def get_user_by_id(self, db: Session, user_id: int) -> Optional[User]:
        return db.query(User).filter(User.UserID == user_id).first()

    def get_user_by_email(self, db: Session, email: str) -> Optional[User]:
        return db.query(User).filter(User.UserEmail == email).first()

    def register(self, db: Session, user_data: dict):
        existing_user = self.get_user_by_email(db, user_data["UserEmail"])
        if existing_user:
            raise ValueError("Usuário com este e-mail já existe")

        hashed_password = hash_password(user_data["password"])

        new_user = User(
            UserName=user_data["UserName"],
            UserEmail=user_data["UserEmail"],
            password=hashed_password,
            UserRole=user_data.get("UserRole", "Analista"),
            UserStatus=user_data.get("UserStatus", "Inativo"),
            UserComments=user_data.get("UserComments")
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return {"user_id": new_user.UserID}

    def update_user(self, db: Session, user_id: int, update_data: UserUpdateSchema) -> User:
        user = self.get_user_by_id(db, user_id)
        if not user:
            raise ValueError(f"Usuário com ID {user_id} não encontrado.")

        update_dict = update_data.model_dump(exclude_unset=True)

        if not update_dict:
            print(f"Nenhum dado fornecido para atualizar o usuário ID {user_id}")
            return user

        if "UserEmail" in update_dict:
            new_email = update_dict["UserEmail"]
            if new_email != user.UserEmail:
                existing = self.get_user_by_email(db, new_email)
                if existing and existing.UserID != user_id:
                    raise ValueError(f"O email {new_email} já está em uso.")

        for key, value in update_dict.items():
            setattr(user, key, value)

        db.commit()
        db.refresh(user)
        return user

    def list_users(self, db: Session, filters: dict) -> dict:
        limit = filters.get("limit", 20)
        offset = filters.get("offset", 0)
        order_by = filters.get("order_by", "UserID")
        order_dir = filters.get("order_dir", "asc")
        name = filters.get("name")
        email = filters.get("email")
        role = filters.get("role")

        query = db.query(User)

        if name:
            query = query.filter(User.UserName.ilike(f'%{name}%'))
        if email:
            query = query.filter(User.UserEmail.ilike(f'%{email}%'))
        if role:
            query = query.filter(User.UserRole.ilike(f'%{role}%'))

        if hasattr(User, order_by):
            column = getattr(User, order_by)
            query = query.order_by(asc(column) if order_dir == 'asc' else desc(column))

        total = query.count()
        users = query.offset(offset).limit(limit).all()

        return {
            "total": total,
            "count": len(users),
            "users": users
        }

    #essa função lista os pedidos dos clientes 
    # def list_orders_by_customer(self, db: Session, customer_id: int):
    #     orders = db.query(Order).filter(Order.CustomerID == customer_id).all()
    #     return orders

    def list_orders_by_customer(self, db: Session, customer_id: int):
        orders = db.query(Order).filter(Order.CustomerID == customer_id).all()
        return [
            {
                "OrderID": order.OrderID,
                "CaseNumber": order.CaseNumber,
                "CreationDate": str(order.CreationDate),
                "OrderFase": order.OrderFase,
                "OrderStatus": order.OrderStatus
            }
            for order in orders
        ]

