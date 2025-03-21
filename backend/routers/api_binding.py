from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/api-binding", tags=["api-binding"])

class APIBindingRequest(BaseModel):
    exchange_name: str
    api_key: str
    api_secret: str

@router.post("/bind")
def bind_api(request: APIBindingRequest):
    try:
        # 验证 API 是否有效
        exchange_class = getattr(ccxt, request.exchange_name)
        exchange = exchange_class({
            'apiKey': request.api_key,
            'secret': request.api_secret,
            'enableRateLimit': True,
        })
        balance = exchange.fetch_balance()
        return {"message": "API 绑定成功", "balance": balance}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"API 绑定失败: {str(e)}")
