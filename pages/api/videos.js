import axios from 'axios';

export default async function handler(req, res) {
  const { keyword } = req.query;

  try {
    const response = await axios.get(
      'https://www.googleapis.com/youtube/v3/search',
      {
        params: {
          part: 'snippet',
          maxResults: 12,
          type: 'video',
          q: keyword,
          key: process.env.NEXT_GOOGLE_API_KEY,
        },
      },
    );

    const items = response.data.items.map(item => ({
      ...item,
      id: item.id.videoId,
    }));
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: '네이버 API 호출 실패' });
  }
}
