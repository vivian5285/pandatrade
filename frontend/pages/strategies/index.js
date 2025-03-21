import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Strategies.module.css';

export default function Strategies() {
  const strategies = [
    {
      id: 1,
      name: '趋势追踪策略',
      description: '根据市场趋势（均线、MACD、RSI）进行买卖。',
      recommendedCapital: '100 USDT',
    },
    {
      id: 2,
      name: '智能网格策略',
      description: '设置网格区间，低买高卖，适合震荡行情。',
      recommendedCapital: '200 USDT',
    },
    {
      id: 3,
      name: '聪明钱策略',
      description: '追踪大资金（鲸鱼地址、机构地址）动向。',
      recommendedCapital: '300 USDT',
    },
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>量化策略选择 - PandaQuant</title>
        <meta name="description" content="选择适合您的量化策略" />
      </Head>

      <header className={styles.header}>
        <h1>量化策略选择</h1>
        <p>选择适合您的量化策略，开始智能交易</p>
      </header>

      <section className={styles.strategyList}>
        {strategies.map((strategy) => (
          <div key={strategy.id} className={styles.card}>
            <h2>{strategy.name}</h2>
            <p>{strategy.description}</p>
            <p>推荐资金：{strategy.recommendedCapital}</p>
            <Link href={`/strategies/${strategy.id}`}>
              <button className={styles.detailsButton}>查看详情</button>
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}
