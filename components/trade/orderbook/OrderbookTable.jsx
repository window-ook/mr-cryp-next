import { memo } from 'react';
import {
  DescriptionTypo,
  NGTypo,
  PriceTypo,
  TableContainer,
  theme,
} from '@/defaultTheme';
import { Paper, LinearProgress } from '@mui/material';
import MarketCodeSelector from '@/components/trade/shared/MarketCodeSelector';

function OrderbookTable({
  orderbookData,
  isConnected,
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
      {orderbookData && isConnected ? (
        <TableContainer
          component={Paper}
          sx={{
            width: '31.25rem',
            [theme.breakpoints.down('sm')]: {
              width: '20rem',
            },
          }}
        >
          <div className="p-2">
            <NGTypo>총 매도 물량 : {orderbookData.total_ask_size}</NGTypo>
            <NGTypo>총 매수 물량 : {orderbookData.total_bid_size}</NGTypo>
          </div>
          <table className="alone-table w-full">
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
                      <PriceTypo fontSize={12} align={'right'}>
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
                    <PriceTypo fontSize={12} align={'left'}>
                      {element.bid_size}
                    </PriceTypo>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      ) : (
        <LinearProgress color="primary" />
      )}
    </div>
  );
}
export default memo(OrderbookTable);
