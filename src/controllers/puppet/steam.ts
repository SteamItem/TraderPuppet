import puppeteer = require('puppeteer');
import { ISteamLogin } from '../../interfaces/steam';
import { Constants } from '../../helpers/constant';
import helpers from '../../helpers';

async function login(page: puppeteer.Page, steamLogin: ISteamLogin) {
  await page.setUserAgent(Constants.UserAgent);

  await page.waitForSelector("#steamAccountName");
  await page.waitForSelector("#steamPassword");
  await page.type('#steamAccountName', steamLogin.username);
  await page.type('#steamPassword', steamLogin.password);
  await page.keyboard.press('Enter');

  await page.waitForSelector("#twofactorcode_entry");
  await page.type('#twofactorcode_entry', steamLogin.twoFactorCode);
  await page.keyboard.press('Enter');
}

async function login2(page: puppeteer.Page, steamLogin: ISteamLogin) {
  await page.setUserAgent(Constants.UserAgent);
  await page.goto('https://store.steampowered.com/login');

  await page.waitForSelector("#input_username");
  await page.waitForSelector("#input_password");
  await page.type('#input_username', steamLogin.username);
  await page.type('#input_password', steamLogin.password);
  await page.keyboard.press('Enter');

  await page.waitForSelector("#twofactorcode_entry");
  await page.type('#twofactorcode_entry', steamLogin.twoFactorCode);
  await page.keyboard.press('Enter');
  await page.waitForNavigation({ waitUntil: 'networkidle0' });
}

async function login3(steamLogin: ISteamLogin) {
  const browser = await helpers.launchBrowser();
  try {
    const mainPage = await browser.newPage();
    await login2(mainPage, steamLogin);
  } catch (e) {
    console.error(e);
    throw e;
  } finally {
    await browser.close();
  }
}

export default {
  login,
  login2,
  login3
}