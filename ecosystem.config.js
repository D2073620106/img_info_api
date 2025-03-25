const path = require('path');
module.exports = {
  apps: [
    {
      name: 'img_info_parse', // 应用名称
      script: 'dist/main.js', // 入口文件路径
      instances: '2', // 根据CPU核心数启动最大实例数
      autorestart: true, // 自动重启
      watch: false, // 禁用文件监视
      max_memory_restart: '1G', // 内存超过1G自动重启
      node_args: '-r dotenv/config',
      env_file: path.resolve(__dirname, '.env'),
      env: {
        NODE_ENV: 'production',
        DOTENV_CONFIG_PATH: path.resolve(__dirname, '.env')
      },
      // env: {
      //   NODE_ENV: 'production',
      //   PORT: 3000, // 你的应用端口
      //   // 其他环境变量...
      // },
      // env_production: {
      //   NODE_ENV: 'production',
      //   PORT: 3000,
      //   // 生产环境特定变量...
      // },
      // 日志配置
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      time: true, // 日志中显示时间
    },
  ],
};
