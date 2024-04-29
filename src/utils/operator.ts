import { Observable } from "rxjs";
import { of, retry, map, catchError } from "rxjs";
import { AjaxResponse } from "rxjs/ajax";
import type { UpbitResponse, BinanceResponse, ExchangeRateResponse, FinalResult, ErrorMessage } from "../constants/interface";

/**
 * ajax 요청 실패 시 2회 retry해보고, 성공하면 response field만 pluck해 줌, 실패 시에는 ErrorMessage 발행
 * @type { function(Observable<AjaxResponse<T>>): Observable<T | UpbitResponse | ErrorMessage> }
 */
export function handleAjax<T>(): (source: Observable<AjaxResponse<T>>) => Observable<T | UpbitResponse | ErrorMessage> {
  return (source: Observable<AjaxResponse<T>>) => source.pipe(
    retry({ count: 2, delay: 500 }),
    map((_: AjaxResponse<T>) => _.response),
    catchError((error) => {
      // console.error(error);
      return of(
        {
          error,
          message: error.message,
        });
    })
  );
}

/**
 * Upbit Response에서 필요한 정보 pluck
 * @type { function(Observable<T | UpbitResponse | ErrorMessage>): Observable<FinalResult | ErrorMessage> }
 */
export function handleUpbitResponse<T>(): (soruce: Observable<T | UpbitResponse | ErrorMessage>) => Observable<FinalResult | ErrorMessage> {
  return (source: Observable<T | UpbitResponse | ErrorMessage>) => source.pipe(
    map((_) => {
      if (Array.isArray(_) && _[0].trade_price) {
        return { btckrw : _[0].trade_price };
      } else {
        // isErrorOccured Atom 활성화
        return { ..._, btckrw: 1000 };
      }
    })
  );
}

/**
 * Binance Response에서 필요한 정보 pluck
 * @type { function(Observable<T | BinanceResponse | ErrorMessage>): Observable<FinalResult | ErrorMessage> }
 */
export function handleBinanceResponse<T>(): (soruce: Observable<T | BinanceResponse | ErrorMessage>) => Observable<FinalResult | ErrorMessage> {
  return (source: Observable<T | BinanceResponse | ErrorMessage>) => source.pipe(
    map((_) => {
      if ((_ as BinanceResponse).price !== undefined) {
        return { btcusdt: Number((_ as BinanceResponse).price) };
      } else {
        // isErrorOccured Atom 활성화
        return { ..._, btcusdt: 300 };
      }
    })
  );
}

/**
 * Exchange-Rate Response에서 필요한 정보 pluck
 * @type { function(Observable<T | ExchangeRateResponse | ErrorMessage>): Observable<FinalResult | ErrorMessage> }
 */
export function handleExchangeRateResponse<T>(): (soruce: Observable<T | ExchangeRateResponse | ErrorMessage>) => Observable<FinalResult | ErrorMessage> {
  return (source: Observable<T | ExchangeRateResponse | ErrorMessage>) => source.pipe(
    map((_) => {
      if (Array.isArray(_) && _[0].basePrice) {
        return { usdkrw: _[0].basePrice };
      } else {
        // isErrorOccured Atom 활성화
        return { ..._, usdkrw: 1200 };
      }
    })
  );
}