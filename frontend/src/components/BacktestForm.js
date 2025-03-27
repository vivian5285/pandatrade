import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function BacktestForm() {
    const [strategy, setStrategy] = useState('');
    const [data, setData] = useState({});
    const [params, setParams] = useState({});
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/backtest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ strategy, data, params }),
        });
        const result = await response.json();
        // 将结果存储在本地状态或上下文中
        history.push('/results', { result });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={strategy}
                onChange={(e) => setStrategy(e.target.value)}
                placeholder="策略名称"
            />
            <textarea
                value={JSON.stringify(data)}
                onChange={(e) => setData(JSON.parse(e.target.value))}
                placeholder="历史数据（JSON格式）"
            />
            <textarea
                value={JSON.stringify(params)}
                onChange={(e) => setParams(JSON.parse(e.target.value))}
                placeholder="策略参数（JSON格式）"
            />
            <button type="submit">回测</button>
        </form>
    );
}

export default BacktestForm; 