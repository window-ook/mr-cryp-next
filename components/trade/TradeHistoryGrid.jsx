import { memo, useEffect, useState } from 'react';
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

const TradeTable = memo(function TradeTable({ tradeData }) {
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
            {tradeData
              .slice()
              .reverse()
              .map(data => (
                <TableRow key={`${data.sequential_id}-${data.trade_timestamp}`}>
                  <TableCell align="center">
                    <NGTypo fontSize={12}>
                      {timestampToTime(data.trade_timestamp)}
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
});

function TradeHistoryGrid({ tradeData }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (tradeData) {
      setIsLoading(false);
    }
  }, [tradeData]);

  if (isLoading) {
    return <LinearProgress color="primary" />;
  }

  return <TradeTable />;
}

export default memo(TradeHistoryGrid);
