from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from strategy_manager import StrategyManager
from exchange_manager import ExchangeManager
from risk_manager import RiskManager

router = APIRouter(prefix="/strategies", tags=["strategies"])

# 示例配置
EXCHANGE_NAME = "binance"
API_KEY = "你的API_KEY"
API_SECRET = "你的API_SECRET"
RISK_CONFIG = {
    "max_drawdown": 20,
    "max_position_size": 1,
    "max_fee_percent": 0.1
}

# 依赖项
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/start")
def start_strategy(strategy_config: dict):
    try:
        exchange_manager = ExchangeManager(EXCHANGE_NAME, API_KEY, API_SECRET)
        risk_manager = RiskManager(**RISK_CONFIG)
        strategy_manager = StrategyManager(exchange_manager.exchange, strategy_config)

        # 检查风控
        balance = exchange_manager.fetch_balance()['total']['USDT']
        initial_balance = 10000  # 假设初始资金
        drawdown_exceeded, drawdown = risk_manager.check_drawdown(balance, initial_balance)
        if drawdown_exceeded:
            raise HTTPException(status_code=400, detail=f"最大回撤已超过限制 ({drawdown}%)")

        # 启动策略
        strategy_manager.run()
        return {"message": "策略已启动"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/stop")
def stop_strategy():
    # 停止策略逻辑（需要实现策略停止功能）
    return {"message": "策略已停止"}

@router.get("/status")
def get_strategy_status():
    # 查询策略运行状态
    return {"status": "运行中"}
