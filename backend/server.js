const express = require('express');
const WebSocket = require('ws');
const cors = require('cors');
const expressWs = require('express-ws');

const app = express();
expressWs(app);
const PORT = process.env.PORT || 3001;
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

  const upbitWs = new WebSocket('wss://api.upbit.com/websocket/v1');

  upbitWs.on('open', () => {
    upbitWs.send(
      JSON.stringify([
        { ticket: 'test' },
        { type: 'orderbook', codes: [code] },
      ]),
    );
  });

  upbitWs.on('message', data => {
    const orderbookData = JSON.parse(data);
    ws.send(JSON.stringify(orderbookData));
  });

  upbitWs.on('error', error => {
    ws.send(JSON.stringify({ error: '웹소켓 데이터 다운로드 실패' }));
    ws.close();
  });
});

// 실시간 체결 내역
app.ws('/api/trade/:code', (ws, req) => {
  const { code } = req.params;
  console.log(`전달된 마켓 코드 (체결 정보): ${code}`);

  if (!code) {
    ws.send(JSON.stringify({ error: '마켓 코드가 필요합니다.' }));
    ws.close();
    return;
  }

  const upbitWs = new WebSocket('wss://api.upbit.com/websocket/v1');

  upbitWs.on('open', () => {
    upbitWs.send(
      JSON.stringify([{ ticket: 'test' }, { type: 'trade', codes: [code] }]),
    );
  });

  upbitWs.on('message', data => {
    const tradeData = JSON.parse(data);
    ws.send(JSON.stringify(tradeData));
  });

  upbitWs.on('error', error => {
    ws.send(JSON.stringify({ error: '웹소켓 데이터 다운로드 실패' }));
    ws.close();
  });
});

// 서버 실행 환경
app.listen(PORT, () => {
  console.log(`${PORT} 포트에서 서버를 실행 중입니다.`);
});
