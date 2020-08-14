import puppeteer = require('puppeteer');
import helpers from '../../helpers';
import steam from './steam';
import { ISteamLogin } from '../../interfaces/steam';
import { Constants } from '../../helpers/constant';
import config = require('../../config');

async function login(steamLogin: ISteamLogin) {
  const browser = await puppeteer.launch({
    args: Constants.LaunchOptions
  });
  try {
    const mainPage = await browser.newPage();
    mainPage.setUserAgent(Constants.UserAgent);
    await mainPage.goto('https://csgoempire.gg');
    await mainPage.waitForSelector('.user-action')
    if (config.SAVE_SCREENSHOT) { await mainPage.screenshot({ fullPage: true, path: 'empireOpen.jpg' }); }
    await mainPage.click('.user-action');

    // TODO: handle
    await helpers.sleep(2000);

    var postPages = await browser.pages();
    var steamLoginPage = postPages[postPages.length - 1];
    await steamLoginPage.waitForSelector('#imageLogin');
    steamLoginPage.setUserAgent(Constants.UserAgent);
    if (config.SAVE_SCREENSHOT) { await mainPage.screenshot({ fullPage: true, path: 'empireSteam.jpg' }); }

    await steam.login(steamLoginPage, steamLogin);

    if (config.SAVE_SCREENSHOT) { await mainPage.screenshot({ fullPage: true, path: 'empireLogin.jpg' }); }
    const cookies = await mainPage.cookies();

    return cookies;
  } catch (e) {
    console.error(e);
    throw e;
  } finally {
    await browser.close();
  }
}

export default {
  login
}