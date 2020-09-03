import helpers from '../../helpers';
import steam from './steam';
import { ISteamLogin } from '../../interfaces/steam';
import { Constants } from '../../helpers/constant';

async function login(steamLogin: ISteamLogin) {
  const browser = await helpers.launchBrowser();
  try {
    const steamPage = await browser.newPage();
    await steam.login(steamPage, steamLogin);

    const mainPage = await browser.newPage();
    await mainPage.setUserAgent(Constants.UserAgent);
    await mainPage.goto('https://csgoempire.gg');
    await mainPage.waitForSelector('.user-action')
    await mainPage.click('.user-action');

    // TODO: handle
    await helpers.sleep(2000);

    var postPages = await browser.pages();
    var steamUserSelectPage = postPages[postPages.length - 1];

    await steam.selectUser(steamUserSelectPage);

    // TODO: handle
    await helpers.sleep(5000);

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