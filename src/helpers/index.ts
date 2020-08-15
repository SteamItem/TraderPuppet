import config = require("../config");
import puppeteer = require('puppeteer');
import { Constants } from "./constant";

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function screenshot(page: puppeteer.Page, fileName: string) {
  if (config.SAVE_SCREENSHOT) {
    await page.screenshot({
      fullPage: true,
      path: fileName
    });
  }
}

async function launchBrowser() {
  const browser = await puppeteer.launch({
    args: Constants.LaunchOptions,
    headless: config.HEADLESS
  });
  return browser
}

export default {
  sleep,
  screenshot,
  launchBrowser
}