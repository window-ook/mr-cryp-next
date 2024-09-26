import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  DescriptionTypo,
  NGTypo,
  PriceTypo,
  StyledTableCell,
} from '@/defaultTheme';
import { globalColors } from '@/globalColors';

export default function TradeTable({ tradeData }) {
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
}
