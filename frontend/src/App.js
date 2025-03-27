import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import BacktestForm from './components/BacktestForm';
import BacktestResults from './components/BacktestResults';

function App() {
    return (
        <Router>
            <div>
                <h1>量化分析平台</h1>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/backtest" component={BacktestForm} />
                    <Route path="/results" component={BacktestResults} />
                </Switch>
            </div>
        </Router>
    );
}

export default App; 