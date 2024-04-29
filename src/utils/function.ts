import { fromEvent, Observable, merge, forkJoin } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { handleAjax, handleUpbitResponse, handleBinanceResponse } from './operator';
import { UPBIT_BTCKRW_API, BINANCE_BTCUSDT_API } from '../constants/api';

/**
 * Creates an observable that emits events from multiple event types on a given element.
 * @param element The DOM element to listen to.
 * @param eventTypes An array of event types to listen for.
 * @returns An Observable that emits events of the specified types from the given element.
 */
export function fromMultipleEvents(element: HTMLElement, eventTypes: string[]): Observable<Event> {
  // 'keyup', 'paste', 'propertychange', 'click', 'change'
  const eventStreams = eventTypes.map(eventType => fromEvent(element, eventType));
  return merge(...eventStreams);
}

/**
 * Ajax call to api endpoints for calculating exchange rate and then trim the responses.
 * @returns Customized FinalResult or ErrorMessage
 */
export function ajaxCalls() {
  return forkJoin(
    [
      ajax({
        url: UPBIT_BTCKRW_API,
        // url: 'http://localhost:3123',
        crossDomain: true,
        createXHR: () => new XMLHttpRequest(),
      }).pipe(
        handleAjax(),
        handleUpbitResponse(),
      ),
      ajax({
        url: BINANCE_BTCUSDT_API,
        // url: 'http://localhost:3123',
        crossDomain: true,
        createXHR: () => new XMLHttpRequest(),
      }).pipe(
        handleAjax(),
        handleBinanceResponse(),
      ),
      // ajax({
      //   url: EXCHANGE_RATE_API,
      //   // url: 'http://localhost:3123',
      //   crossDomain: true,
      //   createXHR: () => new XMLHttpRequest(),
      // }).pipe(
      //   handleAjax(),
      //   handleExchangeRateResponse(),
      // ),
    ]
  );
}