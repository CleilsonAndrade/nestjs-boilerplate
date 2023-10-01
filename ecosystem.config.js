module.exports = {
  apps: [
    {
      name: 'nestjs-boilerplate',
      script: './dist/main.js',
      instances: 1,
      exec_mode: 'cluster',
    },
  ],
};
