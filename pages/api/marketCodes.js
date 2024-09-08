import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://api.upbit.com/v1/market/all');
    const marketCodes = response.data;
    res.status(200).json({ marketCodes });
  } catch (error) {
    res.status(500).json({ error: '마켓 코드를 가져오는 데에 실패했습니다' });
  }
}
