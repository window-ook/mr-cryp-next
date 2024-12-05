import Upbit from '@/lib/upbit';

export default async function handler(req, res) {
  const { codes } = req.query;

  const upbit = new Upbit();

  if (!codes) {
    return res.status(400).json({ error: '마켓 코드들이 필요합니다' });
  }

  try {
    const response = await upbit.currentPrice(codes);
    const data = await response.data;
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: '실시간 현재가 정보를 가져오는 데에 실패했습니다.' });
  }
}
