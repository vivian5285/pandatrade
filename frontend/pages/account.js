import Head from 'next/head';
import styles from '../styles/Account.module.css';

export default function Account() {
  const handleUpdateEmail = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    console.log('更新邮箱:', email);
  };

  const handleEnable2FA = () => {
    console.log('启用双重验证功能调用');
  };

  const handleUpdateSecurity = (e) => {
    e.preventDefault();
    const whitelist = e.target.whitelist.value;
    const limit = e.target.limit.value;
    console.log('更新提现安全设置:', { whitelist, limit });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>账户管理 - PandaQuant</title>
        <meta name="description" content="管理您的账户信息" />
      </Head>

      <header className={styles.header}>
        <h1>账户管理</h1>
        <p>管理您的账户信息和安全设置</p>
      </header>

      <section className={styles.section}>
        <h2>绑定邮箱</h2>
        <form onSubmit={handleUpdateEmail} className={styles.form}>
          <label htmlFor="email">邮箱地址</label>
          <input type="email" id="email" name="email" required />
          <button type="submit" className={styles.submitButton}>更新邮箱</button>
        </form>
      </section>

      <section className={styles.section}>
        <h2>双重验证 (2FA)</h2>
        <button onClick={handleEnable2FA} className={styles.actionButton}>
          启用双重验证
        </button>
      </section>

      <section className={styles.section}>
        <h2>提现安全设置</h2>
        <form onSubmit={handleUpdateSecurity} className={styles.form}>
          <label htmlFor="whitelist">提现白名单</label>
          <input type="text" id="whitelist" name="whitelist" placeholder="输入地址" required />

          <label htmlFor="limit">提现限额 (USDT)</label>
          <input type="number" id="limit" name="limit" placeholder="输入限额" required />

          <button type="submit" className={styles.submitButton}>更新设置</button>
        </form>
      </section>
    </div>
  );
}
