import { EnumSite } from '../helpers/enum';
import { ISteamLogin } from '../interfaces/steam';
import rollbitPuppet from './puppet/rollbit'
import empirePuppet from './puppet/empire'
import { Cookie } from 'puppeteer';

async function login(id: EnumSite, steamLogin: ISteamLogin) {
  var cookies: Cookie[];
  switch (id) {
    case EnumSite.CsGoEmpire:
      cookies = await empirePuppet.login(steamLogin);
      break;
    case EnumSite.Rollbit:
      cookies = await rollbitPuppet.login(steamLogin);
      break;
    default: throw new Error("Unknown site");
  }
  return cookies;
}

export = {
  login
}