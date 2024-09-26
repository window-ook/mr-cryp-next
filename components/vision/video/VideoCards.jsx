import VideoCard from './VideoCard';
import { SubTitle, DescriptionTypo, NGTypo } from '@/defaultTheme';
import { Grid, Box } from '@mui/material';

export default function VideoCards({ videos, theme }) {
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
                <VideoCard
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
    </Box>
  );
}
