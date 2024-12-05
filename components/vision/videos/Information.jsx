import { memo } from 'react';
import Grid from '@mui/material/Grid';
import VideoCard from './VideoCard';

const Information = () => {
  const information = [
    {
      id: 1,
      src: 'https://i.ytimg.com/vi/5dkaMkcTgNA/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCw1WcevgGL6lkZ4EKoPjauynWmmAhttps://www.youtube.com/embed/5dkaMkcTgNA',
      title: '초등학생도 이해하는 비트코인 원리',
      linkUrl: `https://youtube.com/watch?v=5dkaMkcTgNA`,
    },
    {
      id: 2,
      src: 'https://i.ytimg.com/vi/V7moeujHDGY/hqdefault.jpg',
      title: '업비트 사용법',
      linkUrl: `https://youtube.com/watch?v=V7moeujHDGY`,
    },
    {
      id: 3,
      src: 'https://i.ytimg.com/vi/KSsA92e0GK8/hqdefault.jpg',
      title: '코인 차트 보는법',
      linkUrl: `https://youtube.com/watch?v=KSsA92e0GK8`,
    },
  ];

  return (
    <Grid container spacing={2} sx={{ py: 2, px: 3 }}>
      {information.map(item => (
        <Grid key={item.id} item xs={12} sm={4}>
          <VideoCard
            width={480}
            height={300}
            src={item.src}
            title={item.title}
            linkUrl={item.linkUrl}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default memo(Information);
