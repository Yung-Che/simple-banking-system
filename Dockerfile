# 使用 Node.js 16 的官方鏡像作為基礎鏡像
FROM node:16

# 設定工作目錄為 /app
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝專案 npm 包
RUN npm install

# 專案文件複製到工作目錄
COPY . .

# 編譯 TypeScript 程式碼
RUN npm run build

# 3000 端口
EXPOSE 3000

# 定義容器啟動時執行的命令
CMD [ "node", "dist/app.js" ]
