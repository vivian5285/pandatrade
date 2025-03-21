import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Withdrawals.module.css';

export default function Withdrawals() {
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    axios.get('/withdrawals').then((response) => setWithdrawals(response.data));
  }, []);

  const handleApprove = async (id) => {
    await axios.post(`/withdrawals/${id}/approve`);
    alert('提现申请已批准');
    setWithdrawals(withdrawals.filter((w) => w.id !== id));
  };

  const handleReject = async (id) => {
    await axios.post(`/withdrawals/${id}/reject`);
    alert('提现申请已拒绝');
    setWithdrawals(withdrawals.filter((w) => w.id !== id));
  };

  return (
    <div className={styles.container}>
      <h1>提现审核</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>用户ID</th>
            <th>金额</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {withdrawals.map((w) => (
            <tr key={w.id}>
              <td>{w.id}</td>
              <td>{w.user_id}</td>
              <td>${w.amount}</td>
              <td>{w.status}</td>
              <td>
                {w.status === 'pending' && (
                  <>
                    <button onClick={() => handleApprove(w.id)}>批准</button>
                    <button onClick={() => handleReject(w.id)}>拒绝</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
