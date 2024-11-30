import { useQuery } from '@tanstack/react-query';
import { Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import PendingSkeleton from '../shared/PendingSkeleton';
import VideoCards from './VideoCards';

export default function VideosContainer() {
  const theme = useTheme();
  const {
    isPending,
    data: videos,
    error,
  } = useQuery({
    queryKey: ['videos'],
    queryFn: async () => {
      const response = await axios.get('/api/videos', {
        params: { keyword: '코인 추천' },
      });
      console.log(response.data);
      return response.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  if (isPending) return <PendingSkeleton />;

  if (error) {
    return (
      <Alert severity="error">
        유튜브 영상 다운로드 중 에러가 발생했습니다.
      </Alert>
    );
  }

  return <VideoCards videos={videos} theme={theme} />;
}
