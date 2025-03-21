import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Invite.module.css';

export default function Invite() {
  const [userId, setUserId] = useState('');
  const [inviteLink, setInviteLink] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const generateInviteLink = async () => {
    try {
      const response = await axios.post(`${process.env.API_BASE_URL}/invite/generate-link`, { user_id: userId });
      setInviteLink(response.data.invite_link);
      setQrCodeUrl(`${process.env.API_BASE_URL}/invite/generate-qr/${userId}`);
    } catch (error) {
      alert('生成邀请链接失败');
    }
  };

  return (
    <div className={styles.container}>
      <h1>邀请好友</h1>
      <p>输入您的用户 ID，生成专属邀请链接和二维码</p>

      <input
        type="text"
        placeholder="输入用户 ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className={styles.input}
      />
      <button onClick={generateInviteLink} className={styles.button}>
        生成邀请链接
      </button>

      {inviteLink && (
        <div className={styles.result}>
          <h2>邀请链接</h2>
          <p>{inviteLink}</p>
          <button
            onClick={() => navigator.clipboard.writeText(inviteLink)}
            className={styles.copyButton}
          >
            复制链接
          </button>

          <h2>邀请二维码</h2>
          <img src={qrCodeUrl} alt="邀请二维码" className={styles.qrCode} />
          <a href={qrCodeUrl} download={`invite_qr_${userId}.png`} className={styles.downloadButton}>
            下载二维码
          </a>
        </div>
      )}
    </div>
  );
}
