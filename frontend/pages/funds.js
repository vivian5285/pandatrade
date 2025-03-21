import Head from 'next/head';
import styles from '../styles/Funds.module.css';

export default function Funds() {
  const handleDeposit = () => {
    console.log('充值功能调用');
  };

  const handleWithdraw = () => {
    console.log('提现功能调用');
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>资金管理 - PandaQuant</title>
        <meta name="description" content="管理您的资金" />
      </Head>

      <header className={styles.header}>
        <h1>资金管理</h1>
        <p>管理您的 USDT 资金，支持充值和提现</p>
      </header>

      <section className={styles.actions}>
        <button className={styles.actionButton} onClick={handleDeposit}>充值</button>
        <button className={styles.actionButton} onClick={handleWithdraw}>提现</button>
      </section>
    </div>
  );
}
