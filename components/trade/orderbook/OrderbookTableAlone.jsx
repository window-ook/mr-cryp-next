import { memo } from 'react';
import {
  AloneTableCell,
  DescriptionTypo,
  NGTypo,
  PriceTypo,
  TableContainer,
  theme,
} from '@/defaultTheme';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  LinearProgress,
} from '@mui/material';
import { SubTitle } from '@/defaultTheme';
import { globalColors } from '@/globalColors';
import { styled } from '@mui/system';
import MarketCodeSelector from '@/components/trade/MarketCodeSelector';

const AskTableCell = styled(TableCell)(() => ({
  paddingLeft: '3rem',
}));

const BidTableCell = styled(TableCell)(() => ({
  paddingRight: '3rem',
}));

function OrderTableAlone({
  orderbookData,
  isConnected,
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
        실시간 오더북
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
      {orderbookData && isConnected ? (
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: 500,
            marginTop: '1rem',
          }}
        >
          <Box
            sx={{
              paddingLeft: 1,
              paddingTop: 1,
              paddingBottom: 1,
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <NGTypo>마켓 티커 </NGTypo>
              <NGTypo fontWeight={'bold'}>
                {' '}
                : {orderbookData.targetMarketCode}
              </NGTypo>
            </Box>
            <NGTypo>총 매도 물량 : {orderbookData.total_ask_size}</NGTypo>
            <NGTypo>총 매수 물량 : {orderbookData.total_bid_size}</NGTypo>
          </Box>
          <Table display="flex">
            <TableHead>
              <TableRow>
                <AloneTableCell align="center">
                  <DescriptionTypo>매도 물량</DescriptionTypo>
                </AloneTableCell>
                <AloneTableCell align="center">
                  <DescriptionTypo>가격</DescriptionTypo>
                </AloneTableCell>
                <AloneTableCell align="center">
                  <DescriptionTypo>매수 물량</DescriptionTypo>
                </AloneTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...orderbookData.orderbook_units]
                .reverse()
                .map((element, index) => (
                  <TableRow key={`${element.ask_price}${index}`}>
                    <AskTableCell
                      sx={{ backgroundColor: globalColors.color_ask['200'] }}
                    >
                      <PriceTypo fontSize={12} align="right">
                        {Number(element.ask_size)}
                      </PriceTypo>
                    </AskTableCell>
                    <AskTableCell>
                      <PriceTypo align="center" fontSize={12}>
                        {Number(element.ask_price).toLocaleString()}
                      </PriceTypo>
                    </AskTableCell>
                    <AskTableCell>-</AskTableCell>
                  </TableRow>
                ))}
              {[...orderbookData.orderbook_units].map((element, index) => (
                <TableRow key={`${element.bid_price}${index}`}>
                  <BidTableCell sx={{ textAlign: 'right' }}>-</BidTableCell>
                  <BidTableCell>
                    <PriceTypo align="center" fontSize={12}>
                      {Number(element.bid_price).toLocaleString()}
                    </PriceTypo>
                  </BidTableCell>
                  <BidTableCell
                    sx={{ backgroundColor: globalColors.color_bid['200'] }}
                  >
                    <PriceTypo fontSize={12}>{element.bid_size}</PriceTypo>
                  </BidTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <LinearProgress color="primary" />
      )}
    </Box>
  );
}
export default memo(OrderTableAlone);
