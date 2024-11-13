import { memo } from 'react';
import { Box, MenuItem, Select } from '@mui/material';
import { DescriptionTypo } from '@/defaultTheme';

/** 
  * 마켓 코드 셀렉터
@prop currentCode : 현재 마켓 코드
@prop setCurrentCode : 현재 마켓 코드 설정
@prop isLoading : 로딩 UI 구현
@prop marketCode : 전체 마켓 코드  
*/
function MarketCodeSelector({
  currentCode,
  setCurrentCode,
  isLoading,
  marketCodes,
}) {
  const handleMarketCode = e => {
    setCurrentCode(e.target.value);
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
      <DescriptionTypo fontSize={'1.5rem'}>마켓 코드</DescriptionTypo>
      <Select name="marketcode" onChange={handleMarketCode} value={currentCode}>
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
