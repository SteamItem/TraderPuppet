import puppeteer = require('puppeteer');
import helpers from '../../helpers';
import { ISteamLogin } from '../../interfaces/steam';
import { Constants } from '../../helpers/constant';

async function login_old(page: puppeteer.Page, steamLogin: ISteamLogin) {
  await page.setUserAgent(Constants.UserAgent);

  await page.waitForSelector('#imageLogin');
  await page.type('#steamAccountName', steamLogin.username);
  await page.type('#steamPassword', steamLogin.password);
  await helpers.screenshot(page, 'steamInitial.jpg');
  await page.click('#imageLogin');

  // await helpers.sleep(7000);
  await page.waitForSelector('.loginTwoFactorCodeModal', { visible: true })
  await page.type('#twofactorcode_entry', steamLogin.twoFactorCode);
  await helpers.screenshot(page, 'steamTwoFactor.jpg');
  await page.keyboard.press('Enter');
}

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
  login_old,
  selectUser
}