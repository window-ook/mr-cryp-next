import { memo } from 'react';
import {
  TableContainer,
  DescriptionTypo,
  theme,
  HeadTypo,
} from '@/defaultTheme';
import { Box, LinearProgress } from '@mui/material';
import MarketCodeSelector from '@/components/trade/MarketCodeSelector';

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
          <table className="alone-table">
            <thead className="alone-thead">
              <tr>
                <th className="alone-table-th">
                  <HeadTypo>코인</HeadTypo>
                </th>
                <th className="alone-table-th">
                  <HeadTypo>체결 ID</HeadTypo>
                </th>
                <th className="alone-table-th">
                  <HeadTypo>체결 시간(UTC)</HeadTypo>
                </th>
                <th className="alone-table-th">
                  <HeadTypo>ASK/BID</HeadTypo>
                </th>
                <th className="alone-table-th">
                  <HeadTypo>체결 가격</HeadTypo>
                </th>
              </tr>
            </thead>
            <tbody>
              {tradeData.map((element, index) => (
                <tr key={`${index}${element.trade_time}`}>
                  <td className="alone-table-td center">{element.market}</td>
                  <td className="alone-table-td center">
                    {Number(element.sequential_id)}
                  </td>
                  <td className="alone-table-td center">
                    {element.trade_date_utc} {element.trade_time_utc}
                  </td>
                  <td className="alone-table-td center">{element.ask_bid}</td>
                  <td className="alone-table-td center">
                    {Number(element.prev_closing_price).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <LinearProgress color="primary" />
        )}
      </TableContainer>
    </Box>
  );
}

export default memo(TradeTableAlone);
