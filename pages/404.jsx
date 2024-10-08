import React from 'react';
import Link from 'next/link';
import { Box } from '@mui/material';
import { DescriptionTypo, NGTypo } from '@/defaultTheme';

export default function NotFound() {
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
      <Link href={-1}>
        <NGTypo>돌아가기</NGTypo>
      </Link>
    </Box>
  );
}
