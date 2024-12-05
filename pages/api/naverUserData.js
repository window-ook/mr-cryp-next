import axios from 'axios';

export default async function handler(req, res) {
  const { token } = req.body;

  try {
    const response = await axios.get('https://openapi.naver.com/v1/nid/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data;
    const id = data.response.id;
    const imgUrl = data.response.profile_image;
    const nickname = data.response.nickname;

    res.status(200).json({ id, imgUrl, nickname });
  } catch (error) {
    res.status(500).json({ error: '유저 데이터 에러' });
  }
}
