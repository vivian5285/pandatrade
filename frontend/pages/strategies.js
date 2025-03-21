import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Strategies.module.css';

export default function Strategies() {
  const [strategyConfig, setStrategyConfig] = useState({
    type: 'grid_trading',
    symbol: 'BTC/USDT',
    grid_size: 100,
    num_grids: 10,
    base_price: 60000,
    position_size: 0.01,
  });

  const startStrategy = async () => {
    try {
      const response = await axios.post('/api/strategies/start', strategyConfig);
      alert(response.data.message);
    } catch (error) {
      alert(`启动失败: ${error.response.data.detail}`);
    }
  };

  return (
    <div className={styles.container}>
      <h1>量化策略选择</h1>
      <form className={styles.form}>
        <label>策略类型</label>
        <select
          value={strategyConfig.type}
          onChange={(e) => setStrategyConfig({ ...strategyConfig, type: e.target.value })}
        >
          <option value="grid_trading">网格交易</option>
          <option value="r_breaker">R-Breaker</option>
          <option value="scalping">剥头皮交易</option>
        </select>

        <label>交易对</label>
        <input
          type="text"
          value={strategyConfig.symbol}
          onChange={(e) => setStrategyConfig({ ...strategyConfig, symbol: e.target.value })}
        />

        <label>网格大小</label>
        <input
          type="number"
          value={strategyConfig.grid_size}
          onChange={(e) => setStrategyConfig({ ...strategyConfig, grid_size: parseFloat(e.target.value) })}
        />

        <label>网格数量</label>
        <input
          type="number"
          value={strategyConfig.num_grids}
          onChange={(e) => setStrategyConfig({ ...strategyConfig, num_grids: parseInt(e.target.value) })}
        />

        <label>基准价格</label>
        <input
          type="number"
          value={strategyConfig.base_price}
          onChange={(e) => setStrategyConfig({ ...strategyConfig, base_price: parseFloat(e.target.value) })}
        />

        <label>每格交易数量</label>
        <input
          type="number"
          value={strategyConfig.position_size}
          onChange={(e) => setStrategyConfig({ ...strategyConfig, position_size: parseFloat(e.target.value) })}
        />

        <button type="button" onClick={startStrategy}>
          启动策略
        </button>
      </form>
    </div>
  );
}
