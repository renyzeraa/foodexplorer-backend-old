module.exports = {
  apps: [
    {
      name: 'foodexplorer_back-end',
      script: './src/app.js',
      instances: 'max',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
}
