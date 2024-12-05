import { theme, NGTypo } from '@/defaultTheme';
import { globalColors } from '@/globalColors';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import HoldingRatio from './HoldingRatio';
import HoldingAmount from './HoldingAmount';

export default function AccountDetailTable({ balance }) {
  const totalBalance = balance.reduce(
    (sum, item) => sum + parseFloat(item.balance) * item.avg_buy_price,
    0,
  );

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: '100%',
        height: '100%',
        margin: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                padding: '1rem',
              }}
            >
              <NGTypo fontWeight={'bold'}>자산</NGTypo>
            </TableCell>
            <TableCell align="left">
              <NGTypo fontWeight={'bold'}>통화</NGTypo>
            </TableCell>
            <TableCell align="center">
              <NGTypo fontWeight={'bold'}>보유 비율</NGTypo>
            </TableCell>
            <TableCell align="left">
              <NGTypo fontWeight={'bold'}>보유 금액</NGTypo>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {balance &&
            balance.map((item, index) => (
              <TableRow
                key={item.currency}
                sx={{
                  '&:hover': { backgroundColor: globalColors.white_retro },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    padding: '0.5rem',
                  }}
                >
                  {index === 0 ? (
                    <NGTypo fontWeight={'bold'}>원화</NGTypo>
                  ) : item.currency === 'ETH' ? (
                    <NGTypo fontWeight={'bold'}>이더리움</NGTypo>
                  ) : (
                    <NGTypo fontWeight={'bold'}>리플</NGTypo>
                  )}
                </TableCell>
                <TableCell align="left">
                  <NGTypo
                    fontWeight={'bold'}
                    color={theme.palette.primary.main}
                  >
                    {item.currency}
                  </NGTypo>
                </TableCell>
                <TableCell align="center">
                  <HoldingRatio
                    percentage={
                      index === 0
                        ? (parseFloat(item.balance) / totalBalance) * 100
                        : ((parseFloat(item.avg_buy_price) * item.balance) /
                            totalBalance) *
                          100
                    }
                  />
                </TableCell>
                <TableCell align="left">
                  <HoldingAmount
                    balance={item.balance}
                    price={item.avg_buy_price}
                  />
                </TableCell>
              </TableRow>
            ))}
          <TableRow>
            <TableCell
              component="th"
              scope="row"
              sx={{
                padding: '0.5rem',
              }}
            >
              <NGTypo fontWeight={'bold'}>총액</NGTypo>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell align="left">
              <NGTypo fontWeight={'bold'}>
                {parseFloat(totalBalance).toLocaleString()} {' KRW'}
              </NGTypo>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
