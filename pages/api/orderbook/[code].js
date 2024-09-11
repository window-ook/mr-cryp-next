import WebSocket from 'ws';

export default function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    res.status(400).json({ error: '마켓 코드가 필요합니다.' });
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
    res.status(200).json(orderbookData);
  });

  wsOrderbook.on('error', error => {
    res.status(500).json({ error: '웹소켓 데이터 다운로드 실패', error });
  });
}
