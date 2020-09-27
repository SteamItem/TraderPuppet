export interface ISteamLogin {
  username: string;
  password: string;
  twoFactorCode: string;
}

export interface IDuelbitsResponse {
  token: string;
  refresh: string;
  signed: boolean;
  loading: boolean;
  error?: any;
}