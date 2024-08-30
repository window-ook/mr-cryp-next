import { Box } from '@mui/material';
import { DescriptionTypo, NGTypo } from '@/defaultTheme';
import React from 'react';
import Link from 'next/link';

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
      <DescriptionTypo>제작되지 않은 페이지입니다</DescriptionTypo>
      <Link to={-1}>
        <NGTypo>이전 페이지</NGTypo>
      </Link>
    </Box>
  );
}
