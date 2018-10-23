module.exports = {
  apps: [
    {
      name: 'trocapp',
      script: 'index.js',
      interpreter_args: '--inspect',
      env: {
        COMMON_VARIABLE: 'true',
        NODE_ENV: 'development',
        NODE_PATH: '.:./config',
        REACT_APP_APP_NAME: 'trocapp',
      },
      env_production: {
        PORT: process.env.PORT || 3001,
        NODE_ENV: 'production',
      },
    },
  ],
};
