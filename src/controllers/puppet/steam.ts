import puppeteer = require('puppeteer');
import helpers from '../../helpers';
import { ISteamLogin } from '../../interfaces/steam';
import { Constants } from '../../helpers/constant';

async function login(page: puppeteer.Page, steamLogin: ISteamLogin) {
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

export default {
  login
}