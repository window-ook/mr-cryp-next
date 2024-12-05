import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Alert } from '@mui/material';
import axios from 'axios';
import PendingSkeleton from '../shared/PendingSkeleton';
import Articles from './Articles';

export default function ArticlesContainer() {
  const [open, setOpen] = useState(false);
  const {
    data: articles,
    error,
    isPending,
  } = useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const response = await axios.get('/api/articles', {
        params: { keyword: '코인' },
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
    <Articles
      articles={articles}
      open={open}
      handleOpen={handleOpen}
      handleClose={handleClose}
    />
  );
}
