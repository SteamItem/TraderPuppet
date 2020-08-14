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
    await mainPage.goto('https://www.rollbit.com');
    await mainPage.waitForSelector('.bg-green')
    if (config.SAVE_SCREENSHOT) { await mainPage.screenshot({ fullPage: true, path: 'rollbitOpen.jpg' }); }
    await mainPage.click('.bg-green');

    // TODO: handle
    await helpers.sleep(2000);

    var postPages = await browser.pages();
    var steamLoginPage = postPages[postPages.length - 1];
    await steamLoginPage.waitForSelector('#imageLogin');
    steamLoginPage.setUserAgent(Constants.UserAgent);
    if (config.SAVE_SCREENSHOT) { await mainPage.screenshot({ fullPage: true, path: 'rollbitSteam.jpg' }); }

    await steam.login(steamLoginPage, steamLogin);

    if (config.SAVE_SCREENSHOT) { await mainPage.screenshot({ fullPage: true, path: 'rollbitLogin.jpg' }); }
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