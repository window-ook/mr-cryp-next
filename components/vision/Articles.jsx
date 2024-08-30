import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DescriptionTypo, NGTypo, SubTitle } from '@/defaultTheme';
import { theme } from '@/defaultTheme';
import { globalColors } from '@/globalColors';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Grid,
  Snackbar,
  Alert,
  Tooltip,
  LinearProgress,
} from '@mui/material';
import axios from 'axios';
import ArticleIcon from '@mui/icons-material/Article';
import LinkIcon from '@mui/icons-material/Link';
import IosShareIcon from '@mui/icons-material/IosShare';

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  transform: 'translateY(12px)',
  backgroundColor: globalColors.vanilla['200'],
};

export default function Articles({ initialArticles }) {
  const [open, setOpen] = useState(false);
  const {
    data: articles = initialArticles,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const response = await axios.get('/api/naver', {
        params: { keyword: '비트코인' },
      });
      return response.data;
    },
    staleTime: 1000 * 60 * 10,
  });

  if (isFetching) {
    return <LinearProgress color="primary" />;
  }

  if (error) {
    return (
      <Alert severity="error">
        네이버 기사 다운로드 중 에러가 발생했습니다.
      </Alert>
    );
  }

  const handleOpen = async link => {
    try {
      await navigator.clipboard.writeText(link);
      setOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = reason => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <SubTitle>TODAY NEWS</SubTitle>
      <DescriptionTypo>오늘은 어떤 뉴스가 올라왔을까요?</DescriptionTypo>
      <Grid container spacing={2}>
        {articles.map(article => {
          const title = article.title
            .replace(/<b>|<\/b>/g, '')
            .replace(/&quot;/g, '');
          const description = article.description
            .replace(/<b>|<\/b>/g, '')
            .replace(/&quot;/g, '');
          return (
            <Grid item xs={12} sm={6} key={article.link}>
              <Card key={article.link} sx={cardStyle}>
                <CardHeader
                  avatar={<ArticleIcon sx={{ fontSize: 30 }} />}
                  title={
                    <NGTypo fontWeight={'bold'} fontSize={20}>
                      {title}
                    </NGTypo>
                  }
                />
                <CardContent
                  sx={{
                    maxHeight: '100px',
                    overflow: 'flow',
                    flexGrow: 1,
                  }}
                >
                  <NGTypo>{`${description.substring(0, 30)}...`}</NGTypo>
                </CardContent>
                <CardActions
                  sx={{
                    width: '100%',
                    alignSelf: 'flex-end',
                    pt: 0,
                  }}
                >
                  <Tooltip title="기사로 이동">
                    <IconButton
                      aria-label="move"
                      onClick={() => window.open(article.link, '_blank')}
                    >
                      <IosShareIcon
                        sx={{ color: theme.palette.primary.dark }}
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="링크 복사">
                    <IconButton
                      aria-label="share"
                      onClick={() => handleOpen(article.link)}
                    >
                      <LinkIcon sx={{ color: globalColors.skyblue['500'] }} />
                    </IconButton>
                  </Tooltip>
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="success"
                      variant="filled"
                    >
                      링크가 클립보드에 복사되었습니다
                    </Alert>
                  </Snackbar>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
