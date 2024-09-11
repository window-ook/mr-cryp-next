import axios from 'axios';

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    res.status(400).json({ error: '마켓 코드가 필요합니다.' });
    return;
  }

  try {
    const response = await axios.get(
      `https://api.upbit.com/v1/trades/ticks?market=${code}&count=100`,
    );
    const data = await response.data;
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: '실시간 거래 내역을 가져오는 데에 실패했습니다.' });
  }
}
