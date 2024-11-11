import React from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { DescriptionTypo, NGTypo } from '@/defaultTheme';

export default function NotFound() {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <DescriptionTypo>제작되지 않은 페이지입니다.</DescriptionTypo>
      <button onClick={() => router.back()}>
        <NGTypo>돌아가기</NGTypo>
      </button>
    </Box>
  );
}
