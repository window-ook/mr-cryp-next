import { memo } from 'react';
import {
  DescriptionTypo,
  NGTypo,
  PriceTypo,
  TableContainer,
  theme,
} from '@/defaultTheme';
import { Box, Paper, LinearProgress } from '@mui/material';
import MarketCodeSelector from '@/components/trade/MarketCodeSelector';

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
            <NGTypo>총 매도 물량 : {orderbookData.total_ask_size}</NGTypo>
            <NGTypo>총 매수 물량 : {orderbookData.total_bid_size}</NGTypo>
          </Box>
          <table className="alone-table">
            <thead className="alone-thead">
              <tr>
                <th className="alone-table-th">
                  <DescriptionTypo>매도 물량</DescriptionTypo>
                </th>
                <th className="alone-table-th">
                  <DescriptionTypo>가격</DescriptionTypo>
                </th>
                <th className="alone-table-th">
                  <DescriptionTypo>매수 물량</DescriptionTypo>
                </th>
              </tr>
            </thead>
            <tbody>
              {[...orderbookData.orderbook_units]
                .reverse()
                .map((element, index) => (
                  <tr key={`${element.ask_price}${index}`}>
                    <td className="alone-table-td ask-volume">
                      <PriceTypo fontSize={12}>
                        {Number(element.ask_size)}
                      </PriceTypo>
                    </td>
                    <td className="alone-table-td td-center">
                      <PriceTypo fontSize={12}>
                        {Number(element.ask_price).toLocaleString()}
                      </PriceTypo>
                    </td>
                    <td className="alone-table-td">-</td>
                  </tr>
                ))}
              {[...orderbookData.orderbook_units].map((element, index) => (
                <tr key={`${element.bid_price}${index}`}>
                  <td className="alone-table-td">-</td>
                  <td className="alone-table-td">
                    <PriceTypo fontSize={12}>
                      {Number(element.bid_price).toLocaleString()}
                    </PriceTypo>
                  </td>
                  <td className="alone-table-td bid-volume">
                    <PriceTypo fontSize={12}>{element.bid_size}</PriceTypo>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      ) : (
        <LinearProgress color="primary" />
      )}
    </Box>
  );
}
export default memo(OrderTableAlone);
