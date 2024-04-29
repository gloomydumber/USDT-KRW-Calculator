export interface FinalResult {
  btckrw?: number,
  btcusdt?: number,
  usdkrw?: number,
}

export interface ErrorMessage extends FinalResult {
  error?: any; // eslint-disable-line
  message: string;
}

export type UpbitResponse = InnerUpbitResponse[];

interface InnerUpbitResponse {
  market: string;
  trade_date: string;
  trade_time: string;
  trade_date_kst: string;
  trade_time_kst: string;
  trade_timestamp: number;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  prev_closing_price: number;
  change: string;
  change_price: number;
  change_rate: number;
  signed_change_price: number;
  signed_change_rate: number;
  trade_volume: number;
  acc_trade_price: number;
  acc_trade_price_24h: number;
  acc_trade_volume: number;
  acc_trade_volume_24h: number;
  highest_52_week_price: number;
  highest_52_week_date: string;
  lowest_52_week_price: number;
  lowest_52_week_date: string;
  timestamp: number;
}

export interface BinanceResponse {
  symbol: string;
  price: string;
}

export type ExchangeRateResponse = InnerExchangeRateResponse[];

interface InnerExchangeRateResponse {
  code: string;
  currencyCode: string;
  currencyName: string;
  country: string;
  name: string;
  date: string;
  time: string;
  recurrenceCount: number;
  basePrice: number;
  openingPrice: number;
  highPrice: number;
  lowPrice: number;
  change: string;
  changePrice: number;
  cashBuyingPrice: number;
  cashSellingPrice: number;
  ttBuyingPrice: number;
  ttSellingPrice: number;
  tcBuyingPrice: number | null;
  fcSellingPrice: number | null;
  exchangeCommission: number;
  usDollarRate: number;
  high52wPrice: number;
  high52wDate: string;
  low52wPrice: number;
  low52wDate: string;
  currencyUnit: number;
  provider: string;
  timestamp: number;
  id: number;
  createdAt: string;
  modifiedAt: string;
  signedChangePrice: number;
  signedChangeRate: number;
  changeRate: number;
}