import { memo } from 'react';
import Grid from '@mui/material/Grid';
import IframeUI from './IframeUI';

const Information = () => {
  const information = [
    {
      id: 1,
      src: 'https://www.youtube.com/embed/5dkaMkcTgNA',
      title: '초등학생도 이해하는 비트코인 원리',
    },
    {
      id: 2,
      src: 'https://www.youtube.com/embed/V7moeujHDGY',
      title: '업비트 사용법',
    },
    {
      id: 3,
      src: 'https://www.youtube.com/embed/KSsA92e0GK8',
      title: '코인 차트 보는법',
    },
  ];

  return (
    <Grid container spacing={2} sx={{ py: 2, px: 3 }}>
      {information.map(item => (
        <Grid key={item.id} item xs={12} sm={4}>
          <IframeUI src={item.src} height={315} title={item.title} />
        </Grid>
      ))}
    </Grid>
  );
};

export default memo(Information);
