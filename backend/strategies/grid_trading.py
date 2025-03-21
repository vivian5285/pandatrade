import ccxt
import logging
import time

class GridTrading:
    def __init__(self, exchange, symbol, grid_size, num_grids, base_price, position_size):
        self.exchange = exchange
        self.symbol = symbol
        self.grid_size = grid_size
        self.num_grids = num_grids
        self.base_price = base_price
        self.position_size = position_size
        self.grid_prices = [base_price + i * grid_size for i in range(-num_grids // 2, num_grids // 2 + 1)]
        self.logger = self.setup_logger()

    def setup_logger(self):
        logger = logging.getLogger("GridTrading")
        handler = logging.FileHandler("grid_trading.log")
        formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
        handler.setFormatter(formatter)
        logger.addHandler(handler)
        logger.setLevel(logging.INFO)
        return logger

    def place_orders(self):
        for price in self.grid_prices:
            try:
                # 挂买单
                self.exchange.create_limit_buy_order(self.symbol, self.position_size, price)
                # 挂卖单
                self.exchange.create_limit_sell_order(self.symbol, self.position_size, price + self.grid_size)
                self.logger.info(f"挂单成功: 买入 {price}, 卖出 {price + self.grid_size}")
            except Exception as e:
                self.logger.error(f"挂单失败: {e}")

    def run(self):
        while True:
            try:
                self.place_orders()
                self.logger.info("网格订单已挂单")
                time.sleep(60)  # 每分钟检查一次
            except Exception as e:
                self.logger.error(f"运行错误: {e}")
