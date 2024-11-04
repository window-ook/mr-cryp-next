import { DescriptionTypo } from '@/defaultTheme';
import { Box } from '@mui/material';
import React from 'react';

export default function Trade() {
  return (
    <Box display="flex" justifyContent="center">
      <DescriptionTypo sx={{ mt: '2rem', fontSize: '1.5rem' }}>
        위에서 거래 메뉴를 선택해주세요
      </DescriptionTypo>
    </Box>
  );
}
