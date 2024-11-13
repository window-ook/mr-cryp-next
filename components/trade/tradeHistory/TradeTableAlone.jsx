import { memo } from 'react';
import {
  AloneTableCell,
  DescriptionTypo,
  PriceTypo,
  SubTitle,
  TableContainer,
  theme,
} from '@/defaultTheme';
import { styled } from '@mui/system';
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  Box,
  LinearProgress,
} from '@mui/material';
import MarketCodeSelector from '@/components/trade/MarketCodeSelector';

const HeadTypo = styled(DescriptionTypo)(() => ({
  fontSize: '1.25rem',
  '@media (max-width:900px)': {
    fontSize: '0.688rem',
  },
}));

function TradeTableAlone({
  isConnected,
  tradeData,
  currentCode,
  setCurrentCode,
  isLoading,
  marketCodes,
}) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={1}
      sx={{
        mb: '2rem',
        mt: '2rem',
        [theme.breakpoints.down('md')]: {
          mb: '5rem',
        },
      }}
    >
      <SubTitle
        sx={{
          [theme.breakpoints.down('md')]: {
            mb: '1rem',
          },
        }}
      >
        실시간 거래내역
      </SubTitle>
      <MarketCodeSelector
        currentCode={currentCode}
        setCurrentCode={setCurrentCode}
        isLoading={isLoading}
        marketCodes={marketCodes}
      />
      <Box display="flex" alignItems="center" gap={4}>
        <DescriptionTypo>
          연결 상태 : {isConnected ? '🟢' : '🔴'}
        </DescriptionTypo>
      </Box>
      <TableContainer>
        {tradeData && isConnected ? (
          <Table>
            <TableHead>
              <TableRow>
                <AloneTableCell align="center">
                  <HeadTypo>코인</HeadTypo>
                </AloneTableCell>
                <AloneTableCell align="center">
                  <HeadTypo>체결 ID</HeadTypo>
                </AloneTableCell>
                <AloneTableCell align="center">
                  <HeadTypo>체결 시간</HeadTypo>
                </AloneTableCell>
                <AloneTableCell align="center">
                  <HeadTypo>ASK/BID</HeadTypo>
                </AloneTableCell>
                <AloneTableCell align="center">
                  <HeadTypo>체결 가격</HeadTypo>
                </AloneTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tradeData.slice().map((element, index) => (
                <TableRow key={`${index}${element.trade_time}`}>
                  <AloneTableCell align="center">
                    {element.market}
                  </AloneTableCell>
                  <AloneTableCell align="center">
                    {Number(element.sequential_id)}
                  </AloneTableCell>
                  <AloneTableCell align="center">
                    {element.trade_date_utc} {element.trade_time_utc}
                  </AloneTableCell>
                  <AloneTableCell align="center">
                    {element.ask_bid}
                  </AloneTableCell>
                  <AloneTableCell align="center">
                    <PriceTypo fontSize={11}>
                      {Number(element.prev_closing_price).toLocaleString()}
                    </PriceTypo>
                  </AloneTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <LinearProgress color="primary" />
        )}
      </TableContainer>
    </Box>
  );
}

export default memo(TradeTableAlone);
