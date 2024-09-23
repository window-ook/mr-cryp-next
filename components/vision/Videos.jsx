import axios from 'axios';
import PendingSkeleton from './PendingSkeleton';
import IframeUI from './IframeUI';
import { useQuery } from '@tanstack/react-query';
import { SubTitle, DescriptionTypo, NGTypo } from '@/defaultTheme';
import { Grid, Box, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function VideoCardUI({ videos, theme }) {
  return (
    <Grid container spacing={2}>
      {videos.map(video => (
        <Grid item xs={12} sm={6} key={video.id}>
          <Box
            sx={{
              width: '100%',
              transform: 'translateY(20px)',
            }}
          >
            <Box sx={{ width: '100%', height: 230 }}>
              <IframeUI
                src={`https://www.youtube.com/embed/${video.id}`}
                height={'100%'}
                title={video.snippet.title}
              />
            </Box>
            <Box sx={{ pr: 2, pt: 2 }}>
              <NGTypo gutterBottom variant="body2" fontWeight={'bold'}>
                {video.snippet.title.replace(/"/g, '').replace(/'/g, '')}
              </NGTypo>
              <NGTypo
                display="block"
                variant="caption"
                fontWeight={'bold'}
                color={theme.palette.primary.main}
              >
                {video.snippet.channelTitle}
              </NGTypo>
              <NGTypo variant="caption" fontWeight={'bold'}>
                {video.snippet.publishTime.slice(0, 10)}{' '}
                {video.snippet.publishTime.slice(11, 16)}
              </NGTypo>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

function VideoCard({ initialVideos }) {
  const theme = useTheme();
  const {
    isPending,
    data: videos = initialVideos,
    error,
  } = useQuery({
    queryKey: ['videos'],
    queryFn: async () => {
      const response = await axios.get('/api/videos', {
        params: { keyword: '코인 추천' },
      });
      return response.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  if (isPending) {
    <PendingSkeleton />;
  }

  if (error) {
    return (
      <Alert severity="error">
        유튜브 영상 다운로드 중 에러가 발생했습니다.
      </Alert>
    );
  }

  return <VideoCardUI videos={videos} theme={theme} />;
}

export default function Videos({ initialVideos }) {
  return (
    <Box
      sx={{
        mb: 5,
        transform: 'translateX(-5px)',
      }}
    >
      <SubTitle>TREND 🔥</SubTitle>
      <DescriptionTypo>
        코인에 대한 실시간 트렌드를 확인해보세요!
      </DescriptionTypo>
      <VideoCard initialVideos={initialVideos} />
    </Box>
  );
}
