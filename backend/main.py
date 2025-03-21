import sys
import os

# 手动添加 PYTHONPATH
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import user
from routers import admin
from strategy_engine import StrategyEngine
from api_manager import APIManager
from risk_manager import RiskManager
from exchange_manager import ExchangeManager
from strategy_manager import StrategyManager
from dotenv import load_dotenv

# 加载 .env 文件
load_dotenv()

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Hello, Railway!"}
# 配置 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://pandatrade.space"],  # 更新为前端域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册路由
app.include_router(user.router)
app.include_router(admin.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to PandaQuant API"}

def main():
    # 示例配置
    exchange_name = "binance"
    api_key = os.getenv("API_KEY")  # 从 .env 文件加载 API Key
    api_secret = os.getenv("API_SECRET")  # 从 .env 文件加载 API Secret
    strategy_config = {
        "type": "grid_trading",
        "symbol": "BTC/USDT",
        "grid_size": 100,
        "num_grids": 10,
        "base_price": 60000,
        "position_size": 0.01
    }
    risk_config = {
        "max_drawdown": 20,  # 最大回撤 20%
        "max_position_size": 1,  # 最大仓位 1 BTC
        "max_fee_percent": 0.1  # 最大手续费 0.1%
    }

    # 初始化模块
    exchange_manager = ExchangeManager(exchange_name, api_key, api_secret)
    risk_manager = RiskManager(**risk_config)
    strategy_manager = StrategyManager(exchange_manager.exchange, strategy_config)

    # 检查风控
    balance = exchange_manager.fetch_balance()['total']['USDT']
    initial_balance = 10000  # 假设初始资金
    drawdown_exceeded, drawdown = risk_manager.check_drawdown(balance, initial_balance)
    if drawdown_exceeded:
        print(f"警告：最大回撤已超过限制 ({drawdown}%)，停止策略运行")
        return

    # 运行策略
    strategy_manager.run()

if __name__ == "__main__":
    main()
