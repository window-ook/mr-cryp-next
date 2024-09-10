export default async function handler(req, res) {
  const { codes } = req.query;

  if (!codes) {
    return res.status(400).json({ error: '마켓 코드들이 필요합니다' });
  }

  try {
    const response = await fetch(
      `https://api.upbit.com/v1/ticker?markets=${codes}`,
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: '실시간 현재가 정보를 가져오는 데에 실패했습니다.' });
  }
}
