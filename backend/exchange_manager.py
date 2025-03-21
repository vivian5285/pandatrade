import ccxt

class ExchangeManager:
    def __init__(self, exchange_name, api_key, api_secret):
        self.exchange = self.setup_exchange(exchange_name, api_key, api_secret)

    def setup_exchange(self, exchange_name, api_key, api_secret):
        exchange_class = getattr(ccxt, exchange_name)
        return exchange_class({
            'apiKey': api_key,
            'secret': api_secret,
            'enableRateLimit': True,
        })

    def fetch_balance(self):
        return self.exchange.fetch_balance()

    def create_order(self, symbol, order_type, side, amount, price=None):
        if order_type == 'limit':
            if side == 'buy':
                return self.exchange.create_limit_buy_order(symbol, amount, price)
            elif side == 'sell':
                return self.exchange.create_limit_sell_order(symbol, amount, price)
        elif order_type == 'market':
            if side == 'buy':
                return self.exchange.create_market_buy_order(symbol, amount)
            elif side == 'sell':
                return self.exchange.create_market_sell_order(symbol, amount)
        else:
            raise ValueError(f"Unsupported order type: {order_type}")

    def fetch_order_book(self, symbol):
        return self.exchange.fetch_order_book(symbol)

    def fetch_ticker(self, symbol):
        return self.exchange.fetch_ticker(symbol)
