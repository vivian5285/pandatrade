from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from dependencies import get_current_admin_user, get_db
from models import Withdrawal

router = APIRouter(prefix="/withdrawals", tags=["withdrawals"])

# 获取所有提现申请
@router.get("/")
def get_withdrawals(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user),
):
    withdrawals = db.query(Withdrawal).all()
    return withdrawals

# 审核提现申请
@router.post("/{withdrawal_id}/approve")
def approve_withdrawal(
    withdrawal_id: int,
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user),
):
    withdrawal = db.query(Withdrawal).filter(Withdrawal.id == withdrawal_id).first()
    if not withdrawal:
        raise HTTPException(status_code=404, detail="提现申请不存在")
    withdrawal.status = "approved"
    db.commit()
    return {"message": "提现申请已批准"}

@router.post("/{withdrawal_id}/reject")
def reject_withdrawal(
    withdrawal_id: int,
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user),
):
    withdrawal = db.query(Withdrawal).filter(Withdrawal.id == withdrawal_id).first()
    if not withdrawal:
        raise HTTPException(status_code=404, detail="提现申请不存在")
    withdrawal.status = "rejected"
    db.commit()
    return {"message": "提现申请已拒绝"}
