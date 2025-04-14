const path = require('path');

module.exports = {
  apps: [
    {
      name: 'img_info_parse',
      script: 'dist/main.js',
      instances: 2, // 先改为单实例排查问题
      // exec_mode: 'fork', // 明确使用 fork 模式
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      // 关键配置：强制加载 .env 文件
      // node_args: '-r dotenv/config', // 预加载 dotenv
      env: {
        NODE_ENV: 'production',
        DOTENV_CONFIG_PATH: path.resolve(__dirname, '.env'), // 显式指定路径
        PORT: 3001 // 显式覆盖端口
      },
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      time: true
    }
  ]
};
