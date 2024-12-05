import { DescriptionTypo, SubTitle, theme } from '@/defaultTheme';
import { Grid } from '@mui/material';
import { Box, styled } from '@mui/system';
import Information from '@/components/vision/videos/Information';
import VideosContainer from '@/components/vision/videos/VideosContainer';
import ArticlesContainer from '@/components/vision/articles/ArticlesContainer';

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
                <VideosContainer />
              </Grid>
              <Grid item xs={12} md={6}>
                <ArticlesContainer />
              </Grid>
            </Grid>
          </ContentsBox>
        </Grid>
      </Grid>
    </VisionBox>
  );
}
