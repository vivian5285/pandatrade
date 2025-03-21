import ccxt
import pandas as pd
import logging

class RBreaker:
    def __init__(self, exchange, symbol, timeframe):
        self.exchange = exchange
        self.symbol = symbol
        self.timeframe = timeframe
        self.logger = self.setup_logger()

    def setup_logger(self):
        logger = logging.getLogger("RBreaker")
        handler = logging.FileHandler("r_breaker.log")
        formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
        handler.setFormatter(formatter)
        logger.addHandler(handler)
        logger.setLevel(logging.INFO)
        return logger

    def get_r_breaker_levels(self):
        bars = self.exchange.fetch_ohlcv(self.symbol, self.timeframe, limit=2)
        df = pd.DataFrame(bars, columns=['timestamp', 'open', 'high', 'low', 'close', 'volume'])
        prev_high = df.iloc[-2]['high']
        prev_low = df.iloc[-2]['low']
        prev_close = df.iloc[-2]['close']

        pivot = (prev_high + prev_low + prev_close) / 3
        range_value = prev_high - prev_low
        resistance_1 = pivot + range_value
        resistance_2 = pivot + 0.618 * range_value
        support_1 = pivot - range_value
        support_2 = pivot - 0.618 * range_value

        self.logger.info(f"R-Breaker Levels: R1={resistance_1}, R2={resistance_2}, S1={support_1}, S2={support_2}")
        return resistance_1, resistance_2, support_1, support_2

    def trade(self):
        resistance_1, resistance_2, support_1, support_2 = self.get_r_breaker_levels()
        current_price = self.exchange.fetch_ticker(self.symbol)['last']

        if current_price > resistance_1:
            self.logger.info("突破阻力位，做多")
            self.exchange.create_market_buy_order(self.symbol, 0.01)
        elif current_price < support_1:
            self.logger.info("跌破支撑位，做空")
            self.exchange.create_market_sell_order(self.symbol, 0.01)
