import helpers from '../../helpers';
import steam from './steam';
import { ISteamLogin } from '../../interfaces/steam';
import { Constants } from '../../helpers/constant';

async function login(steamLogin: ISteamLogin) {
  const browser = await helpers.launchBrowser();
  try {
    const mainPage = await browser.newPage();
    await mainPage.setUserAgent(Constants.UserAgent);
    await mainPage.goto('https://www.rollbit.com');
    await mainPage.waitForSelector('.bg-green')
    await mainPage.click('.bg-green');

    const pageTarget = mainPage.target();
    const newTarget = await browser.waitForTarget(target => target.opener() === pageTarget);
    const steamLoginPage = await newTarget.page();

    await steam.login(steamLoginPage, steamLogin);
    while (!steamLoginPage.isClosed) { await helpers.sleep(50); }
    await mainPage.waitForSelector('.uppercase.relative.active')

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