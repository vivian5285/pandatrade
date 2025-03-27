# 使用官方 Python 镜像作为基础镜像
FROM python:3.9-slim

# 设置工作目录
WORKDIR /backend

# 设置环境变量
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    TZ=Asia/Shanghai

# 安装系统依赖
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# 复制依赖文件（当前目录的 requirements.txt）
COPY ./requirements.txt /backend/requirements.txt

# 安装 Python 依赖
RUN pip install --no-cache-dir -r requirements.txt

# 复制应用代码（当前目录的 app 文件夹到容器的 /backend/app）
COPY ./app /backend/app
COPY ./alembic.ini /backend/alembic.ini
COPY ./alembic /backend/alembic

# 暴露端口
EXPOSE 8000

# 启动命令（注意工作目录是 /backend）
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"] 