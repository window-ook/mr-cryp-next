import { theme, NGTypo } from '@/defaultTheme';
import { globalColors } from '@/globalColors';
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function HoldingRatio({ percentage }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <NGTypo>보유비중</NGTypo>
      <NGTypo fontWeight={'bold'}>{percentage.toFixed(2)}%</NGTypo>
    </Box>
  );
}

function HoldingAmount({ balance, currency, price }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <NGTypo>보유수량(평가금액)</NGTypo>
      <NGTypo fontWeight={'bold'}>
        {balance && currency ? `${balance} ${currency}` : null}
      </NGTypo>
      <NGTypo fontWeight={'bold'}>
        {parseFloat(parseFloat(price) * balance).toLocaleString()} KRW
      </NGTypo>
    </Box>
  );
}

/** 계좌 현황 상세 리스트
  @prop balance : 계좌 데이터
 */
export default function AccountDetail({ balance }) {
  const totalBalance = balance.reduce(
    (sum, item) => sum + parseFloat(item.balance) * item.avg_buy_price,
    0,
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {balance &&
        balance.map((item, index) => {
          if (index === 0) {
            return (
              <Accordion
                key={item.currency}
                sx={{
                  width: '60%',
                  '&:hover': { backgroundColor: globalColors.white_retro },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <NGTypo fontWeight={'bold'}>원화</NGTypo>
                    <NGTypo
                      fontWeight={'bold'}
                      color={theme.palette.primary.main}
                    >
                      {item.currency}
                    </NGTypo>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-around',
                    }}
                  >
                    <HoldingRatio
                      percentage={
                        (parseFloat(item.balance) / totalBalance) * 100
                      }
                    />
                    <HoldingAmount
                      balance={item.balance}
                      price={item.avg_buy_price}
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          } else {
            return (
              <Accordion
                key={item.currency}
                sx={{
                  width: '60%',
                  '&:hover': { backgroundColor: globalColors.white_retro },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Box>
                    {item.currency === 'ETH' && (
                      <NGTypo fontWeight={'bold'}>이더리움</NGTypo>
                    )}
                    {item.currency === 'XRP' && (
                      <NGTypo fontWeight={'bold'}>리플</NGTypo>
                    )}
                    <NGTypo
                      fontWeight={'bold'}
                      color={theme.palette.primary.light}
                    >
                      {item.currency}
                    </NGTypo>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-around',
                    }}
                  >
                    <HoldingRatio
                      percentage={
                        ((parseFloat(item.avg_buy_price) * item.balance) /
                          totalBalance) *
                        100
                      }
                    />
                    <HoldingAmount
                      balance={item.balance}
                      currency={item.currency}
                      price={item.avg_buy_price}
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          }
        })}
    </Box>
  );
}
