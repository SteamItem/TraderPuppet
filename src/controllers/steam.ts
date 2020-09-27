import puppeteer = require('puppeteer');
import { ISteamLogin } from '../interfaces';
import { Constants } from '../helpers/constant';

async function login(page: puppeteer.Page, steamLogin: ISteamLogin) {
  await page.setUserAgent(Constants.UserAgent);
  await page.goto('https://store.steampowered.com/login');
  await page.waitForSelector('#login_btn_signin');

  await page.type('#input_username', steamLogin.username);
  await page.type('#input_password', steamLogin.password);
  await page.keyboard.press('Enter');

  await page.waitForSelector('#twofactorcode_entry', { visible: true })
  await page.type('#twofactorcode_entry', steamLogin.twoFactorCode);
  await page.keyboard.press('Enter');
  await page.waitForNavigation();
}

async function selectUser(page: puppeteer.Page) {
  await page.setUserAgent(Constants.UserAgent);
  await page.waitForSelector('#imageLogin');
  await page.click('#imageLogin');
}

export default {
  login,
  selectUser
}