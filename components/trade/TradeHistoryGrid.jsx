import axios from 'axios';
import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  LinearProgress,
} from '@mui/material';
import {
  DescriptionTypo,
  NGTypo,
  PriceTypo,
  StyledTableCell,
} from '@/defaultTheme';
import { globalColors } from '@/globalColors';

const TradeTable = function TradeTable({ tradeData }) {
  const timestampToTime = timestamp => {
    const time = new Date(timestamp);
    const timeStr = time.toLocaleTimeString();
    return timeStr;
  };

  return (
    <TableContainer
      sx={{
        maxWidth: 1000,
        height: 400,
        overflow: 'auto',
        backgroundColor: globalColors.white,
      }}
    >
      {tradeData && (
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">
                <DescriptionTypo fontSize={12}>체결 시간</DescriptionTypo>
              </StyledTableCell>
              <StyledTableCell align="center">
                <DescriptionTypo fontSize={12}>체결 가격</DescriptionTypo>
              </StyledTableCell>
              <StyledTableCell align="center">
                <DescriptionTypo fontSize={12}>체결량</DescriptionTypo>
              </StyledTableCell>
              <StyledTableCell align="center">
                <DescriptionTypo fontSize={12}>체결금액</DescriptionTypo>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tradeData.slice().map(data => (
              <TableRow key={data.sequential_id * Math.random()}>
                <TableCell align="center">
                  <NGTypo fontSize={12}>
                    {timestampToTime(data.timestamp)}
                  </NGTypo>
                </TableCell>
                <TableCell align="center">
                  <NGTypo fontSize={12}>
                    {Number(data.trade_price).toLocaleString()}원
                  </NGTypo>
                </TableCell>
                <TableCell align="center">
                  <PriceTypo
                    fontSize={12}
                    color={
                      data.ask_bid === 'ASK'
                        ? globalColors.color_pos['400']
                        : globalColors.color_neg['400']
                    }
                  >
                    {data.trade_volume}
                  </PriceTypo>
                </TableCell>
                <TableCell align="center">
                  <PriceTypo
                    fontSize={12}
                    color={
                      data.ask_bid === 'ASK'
                        ? globalColors.color_pos['400']
                        : globalColors.color_neg['400']
                    }
                  >
                    {Math.round(
                      data.trade_volume * data.trade_price,
                    ).toLocaleString()}
                    원
                  </PriceTypo>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

/** 
 * 실시간 거래 내역
  @description tradeData : 거래 내역 데이터
  @description code : 리스트에서 선택한 마켓 코드
*/
function TradeHistoryGrid() {
  const [isLoading, setIsLoading] = useState(true);
  const [tradeData, setTradeData] = useState([]);
  const code = useSelector(state => state.chart.code);

  useEffect(() => {
    if (code) {
      setTradeData([]);

      const fetchTradeData = async () => {
        try {
          const response = await axios.get(`/api/trade/${code}`);
          const data = response.data;

          setTradeData(prevTradeData => {
            const newData = data.filter(
              item =>
                !prevTradeData.some(
                  prevItem => prevItem.sequential_id === item.sequential_id,
                ),
            );
            return [...prevTradeData, ...newData];
          });
        } catch (error) {
          console.error('실시간 거래 내역 데이터 다운로드 에러: ', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchTradeData();
      const interval = setInterval(fetchTradeData, 3000);
      return () => clearInterval(interval);
    }
  }, [code]);

  if (isLoading) {
    return <LinearProgress color="primary" />;
  }

  return <TradeTable tradeData={tradeData} />;
}

export default memo(TradeHistoryGrid);
