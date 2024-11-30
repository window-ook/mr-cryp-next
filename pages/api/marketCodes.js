import Upbit from '@/lib/upbit';

export default async function handler(req, res) {
  const upbit = new Upbit();

  try {
    const response = await upbit.marketCodes();
    const marketCodes = response.data;
    res.status(200).json({ marketCodes });
  } catch (error) {
    res.status(500).json({ error: '마켓 코드를 가져오는 데에 실패했습니다' });
  }
}
