export = {
  NODE_ENV: process.env.NODE_ENV || "development",
  SAVE_SCREENSHOT: process.env.SAVE_SCREENSHOT === 'true' || false,
  HEADLESS: process.env.HEADLESS === 'true' || false,
}
