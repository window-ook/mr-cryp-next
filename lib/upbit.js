import axios from 'axios';

/** 
 * 업비트 REST API > QUOTATION API
  @function marketCodes : 거래 가능한 전체 마켓 코드
  @function currentPrice : 해당 마켓 코드 현재가 정보
  @function orderbook : 해당 마켓 코드 실시간 오더북
  @function tradeHistory : 해당 마켓 코드 실시간 거래 내역
  @function candleMinutes : 분봉 (unit, ticker, count)
  @function candleDays : 일봉
  @function candleSpeicificDay : 특정 시간의 일봉
  @function candleWeeks : 주봉 
  @function candleMonths : 월봉
 */
export default class Upbit {
  constructor() {
    this.getData = axios.create({
      baseURL: 'https://api.upbit.com/v1',
      headers: { accept: 'application/json' },
    });
  }

  async marketCodes() {
    try {
      const response = await this.getData.get('/market/all');
      return response;
    } catch (error) {
      console.log('거래 가능 마켓 코드 다운로드 중 에러 : ', error);
    }
  }

  async currentPrice(ticker) {
    try {
      const response = await this.getData.get(`/ticker?markets=${ticker}`);
      return response;
    } catch (error) {
      console.log('실시간 가격 다운로드 중 에러 : ', error);
      throw error;
    }
  }

  async tradeHistory(ticker) {
    try {
      const response = await this.getData.get(
        `/trades/ticks?market=${ticker}`,
        {
          params: {
            count: 30,
          },
        },
      );
      return response;
    } catch (error) {
      console.log('실시간 체결 내역 다운로드 중 에러 : ', error);
      throw error;
    }
  }

  async orderbook(code) {
    try {
      const response = await this.getData.get(
        `/orderbook?markets=${code}&level=0`,
      );
      return response;
    } catch (error) {
      console.log('실시간 오더북 다운로드 중 에러 : ', error);
      throw error;
    }
  }

  async candleMinutes(unit, ticker, count) {
    try {
      const response = await this.getData.get(
        `/candles/minutes/${unit}?market=${ticker}`,
        {
          params: {
            count: count,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log('분봉 다운로드 중 에러 : ', error);
      throw error;
    }
  }

  async candleDays(ticker, count) {
    try {
      const response = await this.getData.get(
        `/candles/days?market=${ticker}`,
        {
          params: {
            count: count,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log('일봉 다운로드 중 에러 : ', error);
      throw error;
    }
  }

  async candleSpeicificDay(ticker, count, to) {
    try {
      const response = await this.getData.get(
        `/candles/days?market=${ticker}`,
        {
          params: {
            count: count,
            to: to,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log('일봉 다운로드 중 에러 : ', error);
      throw error;
    }
  }

  async candleWeeks(ticker, count) {
    try {
      const response = await this.getData.get(
        `/candles/weeks?market=${ticker}`,
        {
          params: {
            count: count,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log('주봉 다운로드 중 에러 : ', error);
      throw error;
    }
  }

  async candleMonths(ticker, count) {
    try {
      const response = await this.getData.get(
        `/candles/months?market=${ticker}`,
        {
          params: {
            count: count,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log('월봉 다운로드 중 에러 : ', error);
      throw error;
    }
  }
}
