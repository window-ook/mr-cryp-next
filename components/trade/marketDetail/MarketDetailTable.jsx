import { NGTypo, PriceTypo, theme } from '@/defaultTheme';
import { globalColors } from '@/globalColors';
import { Box, Divider } from '@mui/material';
import { styled } from '@mui/system';

const TableContainer = styled(Box)(() => ({
  height: '6.25rem',
  border: `dashed 0.313rem ${theme.palette.primary.main}`,
  backgroundColor: globalColors.white,
  boxSizing: 'border-box',
}));

const IndicatorContainer = styled(Box)(() => ({
  display: 'flex',
  gap: 2,
  marginRight: 2,
  '@media (max-width:500px)': {
    display: 'none',
  },
}));

const SubIndicatorsBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  flex: '1 1 100%',
}));

const Indicator = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '12.5rem',
  '@media (max-width:1180px)': {
    width: '9.375rem',
  },
}));

const IndicatorTypo = styled(NGTypo)(() => ({
  fontSize: '0.75rem',
  alignSelf: 'end',
}));

const StyledPriceTypo = styled(PriceTypo)(() => ({
  fontWeight: 'bold',
  fontSize: '0.938rem',
}));

const posStyle = {
  fontSize: '0.75rem',
  fontWeight: 'bold',
  marginTop: '0.063rem',
  color: globalColors.color_pos['400'],
};

const negStyle = {
  fontSize: '0.75rem',
  fontWeight: 'bold',
  marginTop: '0.063rem',
  color: globalColors.color_neg['400'],
};

const normalStyle = {
  fontSize: '0.75rem',
  fontWeight: 'bold',
  marginTop: '0.063rem',
};

function SubIndicator({ label, value, valueStyle }) {
  return (
    <>
      <Indicator>
        <IndicatorTypo>{label}</IndicatorTypo>
        <PriceTypo sx={valueStyle}>{Number(value).toLocaleString()}</PriceTypo>
      </Indicator>
      <Divider />
    </>
  );
}

export default function MarketDetailTable({ marketCodeMap, ticker, numColor }) {
  return (
    <TableContainer>
      <Box
        display="flex"
        flexWrap="wrap"
        marginLeft={0.5}
        gap={0.5}
        alignItems="flex-end"
      >
        <NGTypo fontSize={20} fontWeight={'bold'}>
          {marketCodeMap[ticker.market]}
        </NGTypo>
        <NGTypo fontSize={15} align="right">
          {ticker.market}
        </NGTypo>
      </Box>
      <Divider />
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent={'space-between'}
        paddingLeft={1}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent={'center'}
          marginTop={1}
        >
          <Box display="flex" alignItems="flex-end">
            <StyledPriceTypo color={numColor} sx={{ fontSize: '1.25rem' }}>
              {Number(ticker.trade_price).toLocaleString()}
            </StyledPriceTypo>
            <NGTypo fontWeight={'bold'} color={numColor}>
              KRW
            </NGTypo>
          </Box>
          <Box display="flex" justifyContent={'space-between'} gap={2}>
            <NGTypo
              fontSize={12}
              fontWeight="bold"
              color={globalColors.market_code}
            >
              전일대비
            </NGTypo>
            <StyledPriceTypo color={numColor}>
              {Number(ticker.signed_change_rate) > 0 ? '+' : ''}
              {Number(ticker.signed_change_rate * 100).toFixed(2)}%
            </StyledPriceTypo>
            <StyledPriceTypo color={numColor}>
              {Number(ticker.signed_change_price) < 0
                ? '▼'
                : Number(ticker.signed_change_price) > 0
                  ? '▲'
                  : ''}
              {Number(ticker.change_price).toLocaleString()}
            </StyledPriceTypo>
          </Box>
        </Box>
        <IndicatorContainer>
          <SubIndicatorsBox>
            <SubIndicator
              label="고가"
              value={ticker.high_price}
              valueStyle={posStyle}
            />
            <SubIndicator
              label="저가"
              value={ticker.low_price}
              valueStyle={negStyle}
            />
          </SubIndicatorsBox>
          <SubIndicatorsBox>
            <SubIndicator
              label="52주 신고가"
              value={ticker.highest_52_week_price}
              valueStyle={posStyle}
            />
            <SubIndicator
              label="52주 신저가"
              value={ticker.lowest_52_week_price}
              valueStyle={negStyle}
            />
          </SubIndicatorsBox>
          <SubIndicatorsBox>
            <SubIndicator
              label="거래량(24시간)"
              value={ticker.acc_trade_volume_24h}
              valueStyle={normalStyle}
            />
            <SubIndicator
              label="거래대금(24시간)"
              value={Math.round(ticker.acc_trade_price_24h)}
              valueStyle={normalStyle}
            />
          </SubIndicatorsBox>
        </IndicatorContainer>
      </Box>
    </TableContainer>
  );
}
