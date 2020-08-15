import puppeteer = require('puppeteer');
import helpers from '../../helpers';
import { ISteamLogin } from '../../interfaces/steam';
import config = require('../../config');

async function login(page: puppeteer.Page, steamLogin: ISteamLogin) {
  await page.type('#steamAccountName', steamLogin.username);
  await page.type('#steamPassword', steamLogin.password);
  if (config.SAVE_SCREENSHOT) { await page.screenshot({ fullPage: true, path: 'steamInitial.jpg' }); }
  await page.click('#imageLogin');
  await page.waitForSelector('.loginTwoFactorCodeModal', { visible: true })

  await page.type('#twofactorcode_entry', steamLogin.twoFactorCode);
  if (config.SAVE_SCREENSHOT) { await page.screenshot({ fullPage: true, path: 'steamTwoFactor.jpg' }); }
  await page.keyboard.press('Enter');

  // TODO: handle
  await helpers.sleep(5000);
}

export default {
  login
}