import Head from 'next/head';
import styles from '../styles/AiAnalysis.module.css';

export default function AiAnalysis() {
  const marketTrends = [
    { date: '2023-01-01', trend: '上涨', confidence: '85%' },
    { date: '2023-01-02', trend: '下跌', confidence: '70%' },
    { date: '2023-01-03', trend: '震荡', confidence: '60%' },
  ];

  const riskWarnings = [
    { type: '浮亏', message: '当前浮亏超过 5%，建议减仓' },
    { type: '市场波动', message: '市场波动较大，请注意风险' },
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>AI 智能分析 - PandaQuant</title>
        <meta name="description" content="AI 智能分析与市场预测" />
      </Head>

      <header className={styles.header}>
        <h1>AI 智能分析</h1>
        <p>基于深度学习的市场趋势预测与风险提示</p>
      </header>

      <section className={styles.trends}>
        <h2>市场趋势预测</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>日期</th>
              <th>趋势</th>
              <th>信心度</th>
            </tr>
          </thead>
          <tbody>
            {marketTrends.map((trend, index) => (
              <tr key={index}>
                <td>{trend.date}</td>
                <td>{trend.trend}</td>
                <td>{trend.confidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className={styles.risks}>
        <h2>风险提示</h2>
        <ul>
          {riskWarnings.map((warning, index) => (
            <li key={index}>
              <strong>{warning.type}：</strong>
              {warning.message}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.chart}>
        <h2>市场数据可视化</h2>
        <p>（此处可集成图表库，如 Chart.js 或 ECharts）</p>
      </section>
    </div>
  );
}
