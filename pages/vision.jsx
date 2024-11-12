import { DescriptionTypo, SubTitle, theme } from '@/defaultTheme';
import { Grid } from '@mui/material';
import { Box, styled } from '@mui/system';
import axios from 'axios';
import Information from '@/components/vision/Information';
import Videos from '@/components/vision/video/Videos';
import Articles from '@/components/vision/articles/Articles';

const VisionBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '2rem',
  marginBottom: '8rem',
}));

const ContentsBox = styled(Box)(() => ({
  width: '100%',
  borderRadius: '1rem',
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  border: `0.25rem solid ${theme.palette.primary.main}`,
  padding: '1rem',
}));

// export async function getServerSideProps() {
//   try {
//     const [videoResponse, articleResponse] = await Promise.all([
//       axios.get('https://www.googleapis.com/youtube/v3/search', {
//         params: {
//           part: 'snippet',
//           maxResults: 12,
//           type: 'video',
//           q: '코인',
//           key: process.env.NEXT_PUBLIC_YOUTUBE_DATA_API_KEY,
//         },
//       }),
//       axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/naver`, {
//         params: { keyword: '코인' },
//       }),
//     ]);

//     const videos = videoResponse.data.items.map(item => ({
//       ...item,
//       id: item.id.videoId,
//     }));
//     const articles = articleResponse.data;

//     return {
//       props: {
//         initialVideos: videos,
//         initialArticles: articles,
//       },
//     };
//   } catch (error) {
//     console.error('API 호출 에러:', error);

//     return {
//       props: {
//         initialVideos: [],
//         initialArticles: [],
//       },
//     };
//   }
// }

export default function Vision() {
  return (
    <VisionBox>
      <Grid container spacing={2} width="80%">
        <Grid item xs={12} md={12}>
          <Box sx={{ pl: 3 }}>
            <SubTitle
              sx={{
                mb: '0.5rem',
                [theme.breakpoints.down('md')]: {
                  mb: '1rem',
                },
              }}
            >
              가상자산 관련 정보
            </SubTitle>
            <DescriptionTypo>
              코인에 대한 정보와 거래 서비스 이용 방법을 확인하세요 😊
            </DescriptionTypo>
          </Box>
          <Information />
        </Grid>
        <Grid item xs={12}>
          <ContentsBox sx={{ boxShadow: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Videos />
              </Grid>
              <Grid item xs={12} md={6}>
                <Articles />
              </Grid>
            </Grid>
          </ContentsBox>
        </Grid>
      </Grid>
    </VisionBox>
  );
}
