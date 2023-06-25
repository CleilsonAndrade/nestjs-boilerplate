module.exports = {
  apps: [
    {
      name: 'nestjs-boilerplate',
      script: './dist/main.js',
      instances: 'max',
      exec_mode: 'cluster',
    },
  ],
};
