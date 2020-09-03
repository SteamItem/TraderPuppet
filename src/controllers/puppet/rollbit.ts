import helpers from '../../helpers';
import steam from './steam';
import { ISteamLogin } from '../../interfaces/steam';
import { Constants } from '../../helpers/constant';

async function login_old(steamLogin: ISteamLogin) {
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

    await steam.login_old(steamLoginPage, steamLogin);
    while (!steamLoginPage.isClosed) { await helpers.sleep(50); }
    await mainPage.waitForSelector('.uppercase.relative.active')

    await helpers.screenshot(mainPage, 'rollbitLogin.jpg');
    const cookies = await mainPage.cookies();
    return cookies;
  } catch (e) {
    console.error(e);
    throw e;
  } finally {
    await browser.close();
  }
}

async function login(steamLogin: ISteamLogin) {
  const browser = await helpers.launchBrowser();
  try {
    const steamPage = await browser.newPage();
    await steam.login(steamPage, steamLogin);

    const mainPage = await browser.newPage();
    await mainPage.setUserAgent(Constants.UserAgent);
    await mainPage.goto('https://www.rollbit.com');
    await mainPage.waitForSelector('.bg-green')
    await mainPage.click('.bg-green');

    const pageTarget = mainPage.target();
    const newTarget = await browser.waitForTarget(target => target.opener() === pageTarget);
    const steamUserSelectPage = await newTarget.page();

    await steam.selectUser(steamUserSelectPage);
    while (!steamUserSelectPage.isClosed) { await helpers.sleep(50); }
    await mainPage.waitForSelector('.uppercase.relative.active')

    await helpers.screenshot(mainPage, 'rollbitLogin.jpg');
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