import Upbit from '@/lib/upbit';

export default async function handler(req, res) {
  const { type, ticker, count, unit, to } = req.query;

  const upbit = new Upbit();

  try {
    let data;
    switch (type) {
      case '1min':
      case '5min':
        if (!unit) {
          res.status(400).json({ error: 'unit(몇 분)을 입력하세요.' });
          return;
        }
        data = await upbit.candleMinutes(unit, ticker, count);
        break;
      case 'days':
        data = await upbit.candleDays(ticker, count);
        break;
      case 'day':
        data = await upbit.candleSpeicificDay(ticker, count, to);
        break;
      case 'weeks':
        data = await upbit.candleWeeks(ticker, count);
        break;
      case 'months':
        data = await upbit.candleMonths(ticker, count);
        break;
      default:
        res.status(400).json({ error: '유효하지 않은 타입입니다.' });
        return;
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: '캔들 데이터 요청 실패' });
  }
}
