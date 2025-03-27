import React from 'react';
import { useLocation } from 'react-router-dom';

function BacktestResults() {
    const location = useLocation();
    const { result } = location.state || { result: null };

    return (
        <div>
            <h2>回测结果</h2>
            {result ? (
                <div>
                    <h3>策略: {result.strategy}</h3>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            ) : (
                <p>没有回测结果可显示。</p>
            )}
        </div>
    );
}

export default BacktestResults; 