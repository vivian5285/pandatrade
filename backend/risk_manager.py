class RiskManager:
    def __init__(self, max_drawdown, max_position_size, max_fee_percent):
        self.max_drawdown = max_drawdown
        self.max_position_size = max_position_size
        self.max_fee_percent = max_fee_percent

    def check_drawdown(self, current_balance, initial_balance):
        drawdown = (initial_balance - current_balance) / initial_balance * 100
        if drawdown > self.max_drawdown:
            return True, drawdown
        return False, drawdown

    def check_position_size(self, position_size):
        if position_size > self.max_position_size:
            return True
        return False

    def check_fees(self, fee_percent):
        if fee_percent > self.max_fee_percent:
            return True
        return False
