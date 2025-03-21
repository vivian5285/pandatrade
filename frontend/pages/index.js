import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>PandaQuant - 熊猫量化</title>
        <meta name="description" content="智能量化交易平台" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1>熊猫量化（PandaQuant）</h1>
        <p>智能交易 · API 托管 · 多种策略</p>
        <button className={styles.joinButton}>立即加入</button>
      </header>

      <section className={styles.marketData}>
        <h2>实时市场数据</h2>
        <div className={styles.ticker}>
          <span>Binance</span>
          <span>OKX</span>
          <span>Gate.io</span>
          <span>Bitget</span>
        </div>
      </section>

      <section className={styles.features}>
        <h2>我们的优势</h2>
        <ul>
          <li>智能交易策略</li>
          <li>API 托管，资金安全</li>
          <li>多种策略选择</li>
        </ul>
      </section>

      <section className={styles.calculator}>
        <h2>收益计算器</h2>
        <p>输入您的资金，查看预期收益</p>
        <input type="number" placeholder="投资金额 (USDT)" />
        <button>计算收益</button>
      </section>

      <footer className={styles.footer}>
        <p>© 2023 熊猫量化 PandaQuant</p>
      </footer>
    </div>
  );
}
