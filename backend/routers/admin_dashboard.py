from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from dependencies import get_current_admin_user, get_db
from models import User
from pydantic import BaseModel

router = APIRouter(prefix="/admin-dashboard", tags=["admin-dashboard"])

# 仪表盘数据模型
class DashboardData(BaseModel):
    total_users: int
    active_users: int
    api_bound_users: int
    total_trading_volume: float
    total_profit: float
    total_withdrawals: float
    total_commissions: float

# 获取仪表盘数据（仅管理员）
@router.get("/dashboard", response_model=DashboardData)
def get_dashboard_data(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user),
):
    total_users = db.query(User).count()
    active_users = db.query(User).filter(User.is_active == 1).count()
    api_bound_users = 50  # 示例数据
    total_trading_volume = 1000000.0  # 示例数据
    total_profit = 50000.0  # 示例数据
    total_withdrawals = 20000.0  # 示例数据
    total_commissions = 10000.0  # 示例数据

    return DashboardData(
        total_users=total_users,
        active_users=active_users,
        api_bound_users=api_bound_users,
        total_trading_volume=total_trading_volume,
        total_profit=total_profit,
        total_withdrawals=total_withdrawals,
        total_commissions=total_commissions,
    )

# 获取所有用户信息
@router.get("/users")
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users

# 获取交易数据（示例）
@router.get("/transactions")
def get_transactions():
    # 示例：返回假数据
    return [
        {"id": 1, "user_id": 1, "symbol": "BTC/USDT", "amount": 0.1, "profit": 50},
        {"id": 2, "user_id": 2, "symbol": "ETH/USDT", "amount": 1, "profit": 100},
    ]

# 获取推广数据（示例）
@router.get("/referrals")
def get_referrals():
    # 示例：返回假数据
    return [
        {"user_id": 1, "referrals": 5, "commission": 200},
        {"user_id": 2, "referrals": 3, "commission": 120},
    ]
