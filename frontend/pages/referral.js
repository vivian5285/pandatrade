import Head from 'next/head';
import styles from '../styles/Referral.module.css';

export default function Referral() {
  const referralLink = "https://pandatrade.com/register?ref=12345";

  const handleWithdrawCommission = () => {
    console.log('提现佣金功能调用');
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>推广系统 - PandaQuant</title>
        <meta name="description" content="邀请好友获取佣金" />
      </Head>

      <header className={styles.header}>
        <h1>推广系统</h1>
        <p>邀请好友加入熊猫量化，赚取佣金</p>
      </header>

      <section className={styles.referral}>
        <h2>邀请链接</h2>
        <p>分享以下链接邀请好友：</p>
        <input
          type="text"
          value={referralLink}
          readOnly
          className={styles.linkInput}
        />
        <button
          onClick={() => navigator.clipboard.writeText(referralLink)}
          className={styles.copyButton}
        >
          复制链接
        </button>
      </section>

      <section className={styles.qrCode}>
        <h2>邀请二维码</h2>
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
            referralLink
          )}&size=150x150`}
          alt="邀请二维码"
        />
      </section>

      <section className={styles.commission}>
        <h2>推广收益</h2>
        <p>累计佣金：$500</p>
        <p>未领取佣金：$200</p>
        <button
          onClick={handleWithdrawCommission}
          className={styles.withdrawButton}
        >
          提现佣金
        </button>
      </section>

      <section className={styles.rankings}>
        <h2>邀请排行榜</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>排名</th>
              <th>用户</th>
              <th>邀请人数</th>
              <th>累计佣金</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>User123</td>
              <td>50</td>
              <td>$1000</td>
            </tr>
            <tr>
              <td>2</td>
              <td>User456</td>
              <td>30</td>
              <td>$600</td>
            </tr>
            <tr>
              <td>3</td>
              <td>User789</td>
              <td>20</td>
              <td>$400</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
