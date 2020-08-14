module.exports = {
  apps : [{
    name: "server",
    script: "./dist/server.js",
    time: true,
    env: {
      NODE_ENV: "production",
      SAVE_SCREENSHOT: "true"
    }
  }]
}