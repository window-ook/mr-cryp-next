import { theme, DescriptionTypo, NGTypo, SubTitle } from '@/defaultTheme';
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
} from '@mui/material';
import { styled } from '@mui/system';
import ArticleIcon from '@mui/icons-material/Article';
import LinkIcon from '@mui/icons-material/Link';
import IosShareIcon from '@mui/icons-material/IosShare';

const ArticledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  border: '0.5rem solid',
  borderColor: theme.palette.primary.dark,
  backgroundColor: globalColors.white,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  justifyContent: 'space-between',
  transform: 'translateY(1.25rem)',
}));

export default function Articles({ articles, open, handleOpen, handleClose }) {
  return (
    <div>
      <SubTitle>TODAY NEWS</SubTitle>
      <DescriptionTypo>오늘은 어떤 뉴스가 올라왔을까요?</DescriptionTypo>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {articles.map(article => {
          const title = article.title
            .replace(/<b>|<\/b>/g, '')
            .replace(/&quot;/g, '')
            .slice(0, 20);
          const description = article.description
            .replace(/<b>|<\/b>/g, '')
            .replace(/&quot;/g, '');

          return (
            <Grid item xs={12} sm={6} key={article.link}>
              <ArticledCard key={article.link} sx={{ boxShadow: 2 }}>
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
                    maxHeight: '6.25rem',
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
                      onClick={() =>
                        window.open(article.originallink, '_blank')
                      }
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
                </CardActions>
              </ArticledCard>
            </Grid>
          );
        })}
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" variant="filled">
          링크가 클립보드에 복사되었습니다
        </Alert>
      </Snackbar>
    </div>
  );
}
