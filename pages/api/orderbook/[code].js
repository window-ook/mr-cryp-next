import Upbit from '@/lib/upbit';

export default async function handler(req, res) {
  const { code } = req.query;

  const upbit = new Upbit();

  if (!code) {
    res.status(400).json({ error: '마켓 코드가 필요합니다.' });
    return;
  }

  try {
    const response = await upbit.orderbook(code);
    const data = await response.data;
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: '실시간 거래 내역을 가져오는 데에 실패했습니다.' });
  }
}
