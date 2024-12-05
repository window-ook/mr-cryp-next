import { memo } from 'react';
import { TableContainer, DescriptionTypo, HeadTypo } from '@/defaultTheme';
import { LinearProgress } from '@mui/material';
import MarketCodeSelector from '@/components/trade/shared/MarketCodeSelector';

function TradeHistoryTable({
  isConnected,
  tradeData,
  currentCode,
  setCurrentCode,
  isLoading,
  marketCodes,
}) {
  return (
    <div className="flex flex-col items-center gap-4 mb-5 mt-4">
      <MarketCodeSelector
        currentCode={currentCode}
        setCurrentCode={setCurrentCode}
        isLoading={isLoading}
        marketCodes={marketCodes}
      />
      <div className="flex items-center gap-4">
        <DescriptionTypo>
          연결 상태 : {isConnected ? '🟢' : '🔴'}
        </DescriptionTypo>
      </div>
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
    </div>
  );
}

export default memo(TradeHistoryTable);
