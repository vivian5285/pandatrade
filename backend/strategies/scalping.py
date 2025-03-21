import ccxt
import logging
import time

class Scalping:
    def __init__(self, exchange, symbol, scalping_size, profit_target, stop_loss):
        self.exchange = exchange
        self.symbol = symbol
        self.scalping_size = scalping_size
        self.profit_target = profit_target
        self.stop_loss = stop_loss
        self.logger = self.setup_logger()

    def setup_logger(self):
        logger = logging.getLogger("Scalping")
        handler = logging.FileHandler("scalping.log")
        formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
        handler.setFormatter(formatter)
        logger.addHandler(handler)
        logger.setLevel(logging.INFO)
        return logger

    def trade(self):
        while True:
            try:
                bid = self.exchange.fetch_order_book(self.symbol)['bids'][0][0]
                ask = self.exchange.fetch_order_book(self.symbol)['asks'][0][0]
                mid_price = (bid + ask) / 2

                buy_price = mid_price - 5
                sell_price = buy_price + self.profit_target

                buy_order = self.exchange.create_limit_buy_order(self.symbol, self.scalping_size, buy_price)
                self.logger.info(f"买入订单: {buy_order}")

                while True:
                    time.sleep(1)
                    order_status = self.exchange.fetch_order(buy_order['id'], self.symbol)
                    if order_status['status'] == 'closed':
                        self.logger.info("买入成交，挂卖单")
                        self.exchange.create_limit_sell_order(self.symbol, self.scalping_size, sell_price)
                        break

                self.logger.info("等待下一轮交易")
                time.sleep(5)

            except Exception as e:
                self.logger.error(f"错误: {e}")
                time.sleep(5)
