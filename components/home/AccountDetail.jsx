import { theme, NGTypo } from '@/defaultTheme';
import { globalColors } from '@/globalColors';
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import HoldingRatio from './HoldingRatio';
import HoldingAmount from './HoldingAmount';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
