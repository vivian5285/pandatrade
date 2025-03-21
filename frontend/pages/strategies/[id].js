import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../../styles/StrategyDetails.module.css';

export default function StrategyDetails() {
  const router = useRouter();
  const { id } = router.query;

  const strategyDetails = {
    1: {
      name: '趋势追踪策略',
      description: '根据市场趋势（均线、MACD、RSI）进行买卖。',
      backtest: '年化收益率：30%，最大回撤：10%',
    },
    2: {
      name: '智能网格策略',
      description: '设置网格区间，低买高卖，适合震荡行情。',
      backtest: '年化收益率：25%，最大回撤：8%',
    },
    3: {
      name: '聪明钱策略',
      description: '追踪大资金（鲸鱼地址、机构地址）动向。',
      backtest: '年化收益率：40%，最大回撤：12%',
    },
  };

  const strategy = strategyDetails[id];

  if (!strategy) {
    return <p>加载中...</p>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{strategy.name} - PandaQuant</title>
        <meta name="description" content={strategy.description} />
      </Head>

      <header className={styles.header}>
        <h1>{strategy.name}</h1>
        <p>{strategy.description}</p>
      </header>

      <section className={styles.details}>
        <h2>回测数据</h2>
        <p>{strategy.backtest}</p>
        <button className={styles.startButton}>一键启动策略</button>
      </section>
    </div>
  );
}
