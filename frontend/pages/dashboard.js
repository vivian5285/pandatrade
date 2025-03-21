import Head from 'next/head';
import styles from '../styles/Dashboard.module.css';

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <Head>
        <title>仪表盘 - PandaQuant</title>
        <meta name="description" content="用户仪表盘" />
      </Head>

      <header className={styles.header}>
        <h1>仪表盘</h1>
        <p>欢迎回来，查看您的量化交易数据</p>
      </header>

      <section className={styles.overview}>
        <h2>资产总览</h2>
        <div className={styles.card}>
          <p>USDT 余额</p>
          <h3>$10,000</h3>
        </div>
        <div className={styles.card}>
          <p>累计收益</p>
          <h3>$1,200</h3>
        </div>
      </section>

      <section className={styles.strategy}>
        <h2>策略运行状态</h2>
        <div className={styles.card}>
          <p>当前策略</p>
          <h3>趋势追踪策略</h3>
        </div>
        <div className={styles.card}>
          <p>策略收益</p>
          <h3>$800</h3>
        </div>
      </section>
    </div>
  );
}
