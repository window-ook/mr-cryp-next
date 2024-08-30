import { memo } from 'react';
import { Box, MenuItem, Select } from '@mui/material';
import { DescriptionTypo } from '@/defaultTheme';

/** 마켓 코드 셀렉터
@prop curMarketCode
@prop setCurMarketCode
@prop isLoading
@prop marketCode  */
function MarketCodeSelector({
  curMarketCode,
  setCurMarketCode,
  isLoading,
  marketCodes,
}) {
  const handleMarket = evt => {
    setCurMarketCode(evt.target.value);
  };

  if (isLoading) {
    <DescriptionTypo>마켓 코드 불러오는 중...</DescriptionTypo>;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
    >
      <DescriptionTypo sx={{ mb: 1 }}>마켓 코드</DescriptionTypo>
      <Select name="marketcode" onChange={handleMarket} value={curMarketCode}>
        {marketCodes
          ? marketCodes.map(code => (
              <MenuItem
                key={`${code.market}_${code.english_name}`}
                value={code.market}
              >
                {code.market}
              </MenuItem>
            ))
          : null}
      </Select>
    </Box>
  );
}
export default memo(MarketCodeSelector);
