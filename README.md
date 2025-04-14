
## Description

一个使用nestjs编写的图片上传解析服务

对应前端：https://github.com/D2073620106/img_info_app

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



