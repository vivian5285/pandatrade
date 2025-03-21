from strategies.grid_trading import GridTrading
from strategies.r_breaker import RBreaker
from strategies.scalping import Scalping

class StrategyManager:
    def __init__(self, exchange, strategy_config):
        self.exchange = exchange
        self.strategy_config = strategy_config
        self.active_strategy = None

    def select_strategy(self):
        strategy_type = self.strategy_config['type']
        if strategy_type == 'grid_trading':
            self.active_strategy = GridTrading(
                exchange=self.exchange,
                symbol=self.strategy_config['symbol'],
                grid_size=self.strategy_config['grid_size'],
                num_grids=self.strategy_config['num_grids'],
                base_price=self.strategy_config['base_price'],
                position_size=self.strategy_config['position_size']
            )
        elif strategy_type == 'r_breaker':
            self.active_strategy = RBreaker(
                exchange=self.exchange,
                symbol=self.strategy_config['symbol'],
                timeframe=self.strategy_config['timeframe']
            )
        elif strategy_type == 'scalping':
            self.active_strategy = Scalping(
                exchange=self.exchange,
                symbol=self.strategy_config['symbol'],
                scalping_size=self.strategy_config['scalping_size'],
                profit_target=self.strategy_config['profit_target'],
                stop_loss=self.strategy_config['stop_loss']
            )
        else:
            raise ValueError(f"Unsupported strategy type: {strategy_type}")

    def run(self):
        if not self.active_strategy:
            self.select_strategy()
        self.active_strategy.run()
