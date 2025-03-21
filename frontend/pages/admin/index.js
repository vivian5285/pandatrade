import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/Admin.module.css';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [referrals, setReferrals] = useState([]);

  useEffect(() => {
    // 获取用户数据
    axios.get('/admin/users').then((response) => setUsers(response.data));
    // 获取交易数据
    axios.get('/admin/transactions').then((response) => setTransactions(response.data));
    // 获取推广信息
    axios.get('/admin/referrals').then((response) => setReferrals(response.data));
  }, []);

  return (
    <div className={styles.container}>
      <h1>管理员后台</h1>

      <section>
        <h2>用户数据</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>邮箱</th>
              <th>状态</th>
              <th>注册时间</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.is_active ? '活跃' : '禁用'}</td>
                <td>{user.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>交易数据</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>用户ID</th>
              <th>交易对</th>
              <th>数量</th>
              <th>收益</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td>{tx.id}</td>
                <td>{tx.user_id}</td>
                <td>{tx.symbol}</td>
                <td>{tx.amount}</td>
                <td>{tx.profit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>推广信息</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>用户ID</th>
              <th>邀请人数</th>
              <th>佣金</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((ref) => (
              <tr key={ref.user_id}>
                <td>{ref.user_id}</td>
                <td>{ref.referrals}</td>
                <td>{ref.commission}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
