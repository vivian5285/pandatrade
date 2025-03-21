# PandaQuant - 熊猫量化

## 项目简介
PandaQuant 是一个智能量化交易平台，支持现货和合约量化交易，提供多种策略选择（网格交易、R-Breaker、剥头皮交易等）。平台支持用户托管 USDT 或绑定交易所 API，提供收益透明、易用的量化交易体验。

## 功能概览

### 用户端功能
- **主页（Landing Page）**：
  - 平台介绍、实时市场数据、收益计算器。
- **仪表盘（Dashboard）**：
  - 用户资产总览、累计收益、策略运行状态。
- **量化策略选择**：
  - 支持现货和合约策略选择，提供策略详情和一键启动功能。
- **交易所 API 绑定**：
  - 支持 Binance / OKX / Gate.io / Bitget 的 API 绑定。
- **邀请系统**：
  - 每个用户拥有唯一的邀请链接和二维码，支持下载邀请海报。

### 管理员后台功能
- **仪表盘**：
  - 总用户数、活跃用户数、累计交易金额、累计收益等核心数据展示。
- **用户管理**：
  - 查看用户信息、API 绑定状态、账户状态，支持封禁/解封用户。
- **交易数据管理**：
  - 查看订单记录、策略执行情况、盈利统计。
- **推广系统管理**：
  - 查看邀请关系、佣金结算数据、推广排行榜。
- **提现审核**：
  - 查看提现申请，支持手动审核（批准/拒绝）。
- **权限管理**：
  - 支持管理员角色分配（超级管理员 / 普通管理员）。
- **系统监控**：
  - API 健康状态、数据库状态、系统日志。

## 技术栈
- **后端**：
  - FastAPI（Python）
  - MySQL（数据库）
  - Redis（缓存）
  - Alembic（数据库迁移）
- **前端**：
  - Next.js（React 框架）
  - Ant Design（UI 组件库）
- **部署**：
  - Nginx（反向代理）
  - Uvicorn（ASGI 服务器）

## 安装与运行

### 环境要求
- Python 3.9+
- Node.js 16+
- MySQL 8.0+
- Redis 6.0+
- Nginx

### 后端安装
1. 克隆项目：
   ```bash
   git clone https://github.com/your-repo/pandatrade.git
   cd pandatrade/backend
   ```

2. 安装依赖：
   ```bash
   pip install -r requirements.txt
   ```

3. 配置数据库：
   - 修改 `backend/database.py` 中的 `SQLALCHEMY_DATABASE_URL` 为您的 MySQL 配置。

4. 运行数据库迁移：
   ```bash
   alembic upgrade head
   ```

5. 启动后端服务：
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

### 前端安装
1. 进入前端目录：
   ```bash
   cd ../frontend
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 配置后端 API 地址：
   - 修改 `frontend/next.config.js` 中的 `API_BASE_URL` 为后端服务地址。

4. 启动前端服务：
   ```bash
   npm run dev
   ```

### 部署
1. 配置 Nginx：
   - 将 `pandatrade.space` 和 `admin.pandatrade.space` 配置为前端和后端的反向代理。
   - 示例配置文件见 `/etc/nginx/sites-available/pandatrade`。

2. 构建前端应用：
   ```bash
   npm run build
   ```

3. 启动服务：
   - 使用 `supervisord` 或 `systemd` 管理后端服务。
   - 使用 Nginx 提供 HTTPS 支持。

## API 文档
后端 API 文档可通过以下地址访问：
- 用户端 API 文档：`https://pandatrade.space/docs`
- 管理员后台 API 文档：`https://admin.pandatrade.space/docs`

## 项目结构
```
pandatrade/
├── backend/
│   ├── alembic/               # 数据库迁移
│   ├── routers/               # 路由模块
│   │   ├── user.py            # 用户相关路由
│   │   ├── admin_dashboard.py # 管理员后台路由
│   │   ├── withdrawals.py     # 提现审核路由
│   ├── models.py              # 数据库模型
│   ├── database.py            # 数据库配置
│   ├── main.py                # 后端主入口
│   ├── dependencies.py        # 权限验证依赖
├── frontend/
│   ├── pages/                 # 前端页面
│   │   ├── index.js           # 主页
│   │   ├── dashboard.js       # 用户仪表盘
│   │   ├── admin-dashboard.js # 管理员仪表盘
│   │   ├── withdrawals.js     # 提现审核页面
│   ├── styles/                # 样式文件
│   ├── next.config.js         # 前端配置
├── README.md                  # 项目文档
```

## 贡献指南
欢迎贡献代码！请提交 Pull Request 或 Issue。

## 许可证
本项目的许可证信息请参考 `LICENSE` 文件。