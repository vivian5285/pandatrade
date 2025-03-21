import Head from 'next/head';
import styles from '../styles/ApiBinding.module.css';

export default function ApiBinding() {
  const handleBindApi = (e) => {
    e.preventDefault();
    const apiKey = e.target.apiKey.value;
    const apiSecret = e.target.apiSecret.value;

    console.log('绑定 API:', { apiKey, apiSecret });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>API 绑定 - PandaQuant</title>
        <meta name="description" content="绑定交易所 API" />
      </Head>

      <header className={styles.header}>
        <h1>交易所 API 绑定</h1>
        <p>绑定您的交易所 API，开始智能交易</p>
      </header>

      <form className={styles.form} onSubmit={handleBindApi}>
        <label htmlFor="apiKey">API Key</label>
        <input type="text" id="apiKey" name="apiKey" required />

        <label htmlFor="apiSecret">API Secret</label>
        <input type="password" id="apiSecret" name="apiSecret" required />

        <button type="submit" className={styles.submitButton}>绑定 API</button>
      </form>
    </div>
  );
}
