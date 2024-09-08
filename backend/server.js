const express = require('express');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,POST',
};

app.use(cors(corsOptions));

app.get('/api/orderbook/:code', (req, res) => {
  const { code } = req.params;
  console.log(`전달된 마켓 코드: ${code}`);

  if (!code) {
    return res.status(400).json({ error: '마켓 코드가 필요합니다' });
  }

  const ws = new WebSocket('wss://api.upbit.com/websocket/v1');

  ws.on('open', () => {
    ws.send(
      JSON.stringify([
        { ticket: 'test' },
        { type: 'orderbook', codes: [code] },
      ]),
    );
  });

  ws.on('message', data => {
    const orderbookData = JSON.parse(data);
    res.status(200).json(orderbookData);
    ws.close();
  });

  ws.on('error', error => {
    res.status(500).json({ error: '웹소켓 데이터를 다운로드하지 못했습니다.' });
  });

  ws.on('close', () => {
    console.log('웹소켓 연결이 닫혔습니다.');
  });
});

app.listen(PORT, () => {
  console.log(`실행 중인 서버의 포트: ${PORT}`);
});
