import helpers from '../helpers';
import steam from './steam';
import { ISteamLogin, IDuelbitsResponse } from '../interfaces';
import { Constants } from '../helpers/constant';

async function login(steamLogin: ISteamLogin): Promise<IDuelbitsResponse> {
  const browser = await helpers.launchBrowser();
  try {
    const steamPage = await browser.newPage();
    await steam.login(steamPage, steamLogin);

    const mainPage = await browser.newPage();
    await mainPage.setUserAgent(Constants.UserAgent);
    await mainPage.goto('https://www.duelbits.com');
    await mainPage.waitForSelector('#auth-button')
    await mainPage.click('#auth-button');
    await mainPage.waitForSelector('.auth-button.steam');
    await mainPage.click('.auth-button.steam');

    const pageTarget = mainPage.target();
    const newTarget = await browser.waitForTarget(target => target.opener() === pageTarget);
    const steamUserSelectPage = await newTarget.page();

    await steam.selectUser(steamUserSelectPage);
    while (!steamUserSelectPage.isClosed) { await helpers.sleep(50); }
    await mainPage.waitForSelector('#auth-button', { hidden: true });

    await helpers.sleep(2000);

    const localStorageData = await mainPage.evaluate(() => {
      return JSON.parse(JSON.parse(localStorage.getItem(localStorage.key(0))).auth);
    });

    return localStorageData;
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