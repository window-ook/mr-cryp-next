const WebSocket = require('ws');
const cors = require('cors');
const express = require('express');
const expressWs = require('express-ws');

const app = express();
expressWs(app);
const PORT = 3001;
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,POST',
};
app.use(cors(corsOptions));

// 실시간 오더북
app.ws('/api/orderbook/:code', (ws, req) => {
  const { code } = req.params;
  console.log(`전달된 마켓 코드 (오더북): ${code}`);

  if (!code) {
    ws.send(JSON.stringify({ error: '마켓 코드가 필요합니다.' }));
    ws.close();
    return;
  }

  const wsOrderbook = new WebSocket('wss://api.upbit.com/websocket/v1');

  wsOrderbook.on('open', () => {
    wsOrderbook.send(
      JSON.stringify([
        { ticket: 'test' },
        { type: 'orderbook', codes: [code] },
        {
          format: 'DEFAULT',
        },
      ]),
    );
  });

  wsOrderbook.on('message', data => {
    const orderbookData = JSON.parse(data);
    ws.send(JSON.stringify(orderbookData));
  });

  wsOrderbook.on('error', error => {
    ws.send(JSON.stringify({ error: '웹소켓 데이터 다운로드 실패', error }));
    ws.close();
  });
});

// 실시간 거래 내역
app.ws('/api/trade/:code', (ws, req) => {
  const { code } = req.params;
  console.log(`전달된 마켓 코드 (거래 내역): ${code}`);

  if (!code) {
    ws.send(JSON.stringify({ error: '마켓 코드가 필요합니다.' }));
    ws.close();
    return;
  }

  const wsTrade = new WebSocket('wss://api.upbit.com/websocket/v1');

  wsTrade.on('open', () => {
    wsTrade.send(
      JSON.stringify([
        { ticket: 'test' },
        { type: 'trade', codes: [code] },
        {
          format: 'DEFAULT',
        },
      ]),
    );
  });

  wsTrade.on('message', data => {
    const tradeData = JSON.parse(data);
    ws.send(JSON.stringify(tradeData));
  });

  wsTrade.on('error', error => {
    ws.send(JSON.stringify({ error: '웹소켓 데이터 다운로드 실패', error }));
    ws.close();
  });
});

// 실시간 현재가 정보(마켓 리스트)
app.ws('/api/tickers', (ws, req) => {
  const { codes } = req.query;
  console.log(`전달된 마켓 코드 (마켓 리스트): ${codes}`);

  if (!codes || codes.length === 0) {
    ws.send(JSON.stringify({ error: '마켓 코드가 필요합니다.' }));
    ws.close();
    return;
  }

  const codeArray = codes.split(',');
  const wsTicker = new WebSocket('wss://api.upbit.com/websocket/v1');

  wsTicker.on('open', () => {
    wsTicker.send(
      JSON.stringify([
        { ticket: 'test' },
        { type: 'ticker', codes: codeArray },
      ]),
    );
  });

  wsTicker.on('message', data => {
    const tradeData = JSON.parse(data);
    ws.send(JSON.stringify(tradeData));
  });

  wsTicker.on('error', error => {
    ws.send(JSON.stringify({ error: '웹소켓 데이터 다운로드 실패', error }));
    ws.close();
  });
});

// 실시간 현재가 정보(마켓 디테일)
app.ws('/api/ticker/:code', (ws, req) => {
  const { code } = req.params;
  console.log(`전달된 마켓 코드 (마켓 디테일): ${code}`);

  if (!code) {
    ws.send(JSON.stringify({ error: '마켓 코드가 필요합니다.' }));
    ws.close();
    return;
  }

  const wsTicker = new WebSocket('wss://api.upbit.com/websocket/v1');

  wsTicker.on('open', () => {
    wsTicker.send(
      JSON.stringify([
        { ticket: 'test' },
        { type: 'ticker', codes: [code] },
        {
          format: 'DEFAULT',
        },
      ]),
    );
  });

  wsTicker.on('message', data => {
    const tradeData = JSON.parse(data);
    ws.send(JSON.stringify(tradeData));
  });

  wsTicker.on('error', error => {
    ws.send(JSON.stringify({ error: '웹소켓 데이터 다운로드 실패', error }));
    ws.close();
  });
});

// 서버 실행 환경
app.listen(PORT, () => {
  console.log(`${PORT} 포트에서 서버를 실행 중입니다.`);
});
