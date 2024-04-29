import { atom } from "recoil";

export const isDarkAtom = atom({
  key: 'isDark',
  default: true,
});

export const usdtInput = atom({
  key: 'usdtInput',
  default: '',
});

export const krwInput = atom({
  key: 'krwInput',
  default: '',
});

export const btcInput = atom({
  key: 'btcInput',
  default: '',
});

export const usdkrwAtom = atom({
  key: 'usdkrw',
  default: 0,
});

export const btckrwAtom = atom({
  key: 'btckrw',
  default: 0,
});

export const btcusdtAtom = atom({
  key: 'btcusdt',
  default: 0,
});

export const keyCryptoAtom = atom({
  key: 'keyCrypto',
  default: 'BTC',
});

export const stableTokenAtom = atom({
  key: 'stableToken',
  default: 'USDT',
});

export const baseExchangeAtom = atom({
  key: 'baseExchange',
  default: 'Upbit',
});

export const quoteExchangeAtom = atom({
  key: 'quoteExchange',
  default: 'Binance',
});