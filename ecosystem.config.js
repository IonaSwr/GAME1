module.exports = {
    apps : [{
      name   : "GAME1",
      script : "./server/start.js",      
      out_file:"~/GAME1A.log",
      error_file:"~/GAME1A.log",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }]
  }