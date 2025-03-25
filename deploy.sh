#!/bin/bash

# 拉取最新代码
git pull origin master

# 安装依赖
pnpm install

# 构建项目
pnpm run build

# 使用PM2重启应用
pm2 restart ecosystem.config.js --env production

# 保存PM2状态
pm2 save
