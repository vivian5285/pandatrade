from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import User
from pydantic import BaseModel

router = APIRouter(prefix="/admin", tags=["admin"])

# 依赖项
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 用户数据模型
class UserData(BaseModel):
    id: int
    email: str
    is_active: int
    created_at: str

# 获取所有用户数据
@router.get("/users", response_model=list[UserData])
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users

# 获取单个用户详细信息
@router.get("/users/{user_id}", response_model=UserData)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="用户不存在")
    return user

# 获取交易数据（示例）
@router.get("/transactions")
def get_transactions():
    # 示例：返回假数据
    return [
        {"id": 1, "user_id": 1, "symbol": "BTC/USDT", "amount": 0.1, "profit": 50},
        {"id": 2, "user_id": 2, "symbol": "ETH/USDT", "amount": 1, "profit": 100},
    ]

# 获取推广信息（示例）
@router.get("/referrals")
def get_referrals():
    # 示例：返回假数据
    return [
        {"user_id": 1, "referrals": 5, "commission": 200},
        {"user_id": 2, "referrals": 3, "commission": 120},
    ]
