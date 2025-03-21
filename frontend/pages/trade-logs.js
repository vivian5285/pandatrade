import Head from 'next/head';
import styles from '../styles/TradeLogs.module.css';

export default function TradeLogs() {
  const dailyProfits = [
    { date: '2023-01-01', profit: '$50' },
    { date: '2023-01-02', profit: '$100' },
    { date: '2023-01-03', profit: '$75' },
  ];

  const tradeHistory = [
    { time: '2023-01-01 10:00', pair: 'BTC/USDT', direction: '买入', amount: '0.1', profit: '$50' },
    { time: '2023-01-02 15:00', pair: 'ETH/USDT', direction: '卖出', amount: '1', profit: '$100' },
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>交易日志 - PandaQuant</title>
        <meta name="description" content="查看交易日志和盈利情况" />
      </Head>

      <header className={styles.header}>
        <h1>交易日志</h1>
        <p>查看每日收益、历史成交记录和策略盈利曲线</p>
      </header>

      <section className={styles.dailyProfits}>
        <h2>每日收益</h2>
        <ul>
          {dailyProfits.map((entry, index) => (
            <li key={index}>
              <span>{entry.date}</span>
              <span>{entry.profit}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.tradeHistory}>
        <h2>历史成交记录</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>时间</th>
              <th>交易对</th>
              <th>方向</th>
              <th>数量</th>
              <th>收益</th>
            </tr>
          </thead>
          <tbody>
            {tradeHistory.map((trade, index) => (
              <tr key={index}>
                <td>{trade.time}</td>
                <td>{trade.pair}</td>
                <td>{trade.direction}</td>
                <td>{trade.amount}</td>
                <td>{trade.profit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className={styles.profitChart}>
        <h2>策略盈利曲线</h2>
        <p>（此处可集成图表库，如 Chart.js 或 ECharts）</p>
      </section>
    </div>
  );
}
