FROM node:14

WORKDIR /app

COPY ./src /app/src
COPY ./public /app/public
COPY package.json /app

# 安装依赖
RUN npm install

# 暴露端口
EXPOSE 3000

# 启动 React 应用
CMD ["npm", "start"] 