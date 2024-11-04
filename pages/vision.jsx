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

export async function getServerSideProps() {
  let videos = [];
  let articles = [];

  try {
    const videoResponse = await axios.get(
      'https://www.googleapis.com/youtube/v3/search',
      {
        params: {
          part: 'snippet',
          maxResults: 12,
          type: 'video',
          q: '코인 추천',
          key: process.env.NEXT_PUBLIC_YOUTUBE_DATA_API_KEY,
        },
      },
    );

    videos = videoResponse.data.items.map(item => ({
      ...item,
      id: item.id.videoId,
    }));
  } catch (error) {
    console.log('유튜브 API 에러:', error);
  }

  try {
    const articleResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/naver`,
      {
        params: { keyword: '비트코인' },
      },
    );
    articles = articleResponse.data;
  } catch (error) {
    console.error('네이버 API 에러:', error);
  }

  return {
    props: {
      initialVideos: videos,
      initialArticles: articles,
    },
  };
}

export default function Vision({ initialVideos, initialArticles }) {
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
                <Videos initialVideos={initialVideos} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Articles initialArticles={initialArticles} />
              </Grid>
            </Grid>
          </ContentsBox>
        </Grid>
      </Grid>
    </VisionBox>
  );
}
