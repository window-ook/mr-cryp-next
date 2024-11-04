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
import { styled } from '@mui/system';
import { globalColors } from '@/globalColors';

const HeadTypo = styled(DescriptionTypo)(() => ({
  fontSize: '1.25rem',
  '@media (max-width:900px)': {
    fontSize: '0.688rem',
  },
}));

const StyledTableContainer = styled(TableContainer)(() => ({
  maxWidth: '62.5rem',
  height: '25rem',
  overflow: 'auto',
  backgroundColor: globalColors.white,
}));

export default function TradeTable({ tradeData }) {
  const timestampToTime = timestamp => {
    const time = new Date(timestamp);
    const timeStr = time.toLocaleTimeString();
    return timeStr;
  };

  return (
    <StyledTableContainer>
      {tradeData && (
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">
                <HeadTypo>체결 시간</HeadTypo>
              </StyledTableCell>
              <StyledTableCell align="center">
                <HeadTypo>체결 가격</HeadTypo>
              </StyledTableCell>
              <StyledTableCell align="center">
                <HeadTypo>체결량</HeadTypo>
              </StyledTableCell>
              <StyledTableCell align="center">
                <HeadTypo>체결금액</HeadTypo>
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
    </StyledTableContainer>
  );
}
