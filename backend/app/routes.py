from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from .models import Strategy
from app.database import db, document_to_dict, connect_to_db
from bson import ObjectId

router = APIRouter()

class BacktestRequest(BaseModel):
    strategy: str
    data: dict  # 历史数据
    params: dict  # 策略参数

@router.post("/backtest")
def backtest(request: BacktestRequest):
    # 这里实现回测逻辑
    # 假设我们简单返回请求的数据作为结果
    result = {
        "status": "success",
        "strategy": request.strategy,
        "data": request.data,
        "params": request.params,
        "backtest_result": "回测结果示例"  # 这里可以替换为实际的回测结果
    }
    return result

@router.post("/strategies/", response_model=Strategy)
async def create_strategy(strategy: Strategy):
    strategy_dict = strategy.dict()
    result = await db.strategies.insert_one(strategy_dict)
    strategy_dict['_id'] = str(result.inserted_id)
    return strategy_dict

@router.get("/strategies/{strategy_id}", response_model=Strategy)
async def read_strategy(strategy_id: str):
    strategy = await db.strategies.find_one({"_id": ObjectId(strategy_id)})
    if strategy is None:
        raise HTTPException(status_code=404, detail="Strategy not found")
    return document_to_dict(strategy)

@router.put("/strategies/{strategy_id}", response_model=Strategy)
async def update_strategy(strategy_id: str, strategy: Strategy):
    await db.strategies.update_one({"_id": ObjectId(strategy_id)}, {"$set": strategy.dict()})
    updated_strategy = await db.strategies.find_one({"_id": ObjectId(strategy_id)})
    return document_to_dict(updated_strategy)

@router.delete("/strategies/{strategy_id}")
async def delete_strategy(strategy_id: str):
    result = await db.strategies.delete_one({"_id": ObjectId(strategy_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Strategy not found")
    return {"detail": "Strategy deleted"}

@router.get("/strategies")
async def get_strategies():
    # 使用数据库连接的代码
    return {"message": "List of strategies"} 