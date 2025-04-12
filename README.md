
## Description

一个使用nestjs编写的图片上传解析服务

## 启动

```bash
$ pnpm install
```

## 运行 编译

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## 测试

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## 数据库操作
```bash
# 进入目录
cd src
# 运行以下命令生成客户端：
npx prisma generate
# 运行以下命令同步数据库：
npx prisma migrate dev --name init
```


## nginx 配置
```bash
# 创建新的配置文件：
sudo nano /etc/nginx/sites-available/your-domain.com

# 添加以下内容：
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000; # 假设 NestJS 运行在 3000 端口
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}


# 服务器备份nginx配置
server {
    server_name img-info-api.dmmone.top;

    # 限制整个server的上传大小为10MB
    client_max_body_size 10m;
   
    location / {
        proxy_pass http://localhost:3000; # 假设 NestJS 运行在 3000 端口
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/img-info-api.dmmone.top/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/img-info-api.dmmone.top/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
    if ($host = img-info-api.dmmone.top) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;
    server_name img-info-api.dmmone.top;
    return 404; # managed by Certbot


}

#启用配置：
sudo ln -s /etc/nginx/sites-available/your-domain.com /etc/nginx/sites-enabled
sudo nginx -t # 测试配置
sudo systemctl restart nginx

#配置 HTTPS（可选但推荐）
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

#证书会自动续订，你可以验证自动续订：
sudo certbot renew --dry-run

#防火墙配置
# 允许 SSH
sudo ufw allow OpenSSH

# 允许 HTTP 和 HTTPS
sudo ufw allow 'Nginx Full'

# 启用防火墙
sudo ufw enable
```

