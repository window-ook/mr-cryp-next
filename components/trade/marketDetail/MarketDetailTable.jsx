import { NGTypo, PriceTypo, theme } from '@/defaultTheme';
import { globalColors } from '@/globalColors';
import { Box, Divider } from '@mui/material';

const subColumnStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  flex: '1 1 100%',
};

const boxStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  width: 200,
  '@media (max-width:1180px)': {
    width: '150px',
  },
};

const priceStyle = {
  fontWeight: 'bold',
};

const posStyle = {
  fontSize: 12,
  fontWeight: 'bold',
  marginTop: 1,
  color: globalColors.color_pos['400'],
};

const negStyle = {
  fontSize: 12,
  fontWeight: 'bold',
  marginTop: 1,
  color: globalColors.color_neg['400'],
};

const normalStyle = {
  fontSize: 12,
  fontWeight: 'bold',
  marginTop: 1,
};

const statusTextStyle = {
  fontSize: 12,
  alignSelf: 'end',
};

function SubIndicators({ label, value, valueStyle }) {
  return (
    <>
      <Box sx={boxStyle}>
        <NGTypo sx={statusTextStyle}>{label}</NGTypo>
        <PriceTypo sx={valueStyle}>{Number(value).toLocaleString()}</PriceTypo>
      </Box>
      <Divider />
    </>
  );
}

export default function MarketDetailTable({ marketCodeMap, ticker, numColor }) {
  return (
    <Box
      sx={{
        height: 100,
        border: `dashed 5px ${theme.palette.primary.main}`,
        backgroundColor: globalColors.white,
        boxSizing: 'border-box',
      }}
    >
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
            <PriceTypo variant="h5" color={numColor} sx={priceStyle}>
              {Number(ticker.trade_price).toLocaleString()}
            </PriceTypo>
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
            <PriceTypo fontSize={15} color={numColor} sx={priceStyle}>
              {Number(ticker.signed_change_rate) > 0 ? '+' : ''}
              {Number(ticker.signed_change_rate * 100).toFixed(2)}%
            </PriceTypo>
            <PriceTypo fontSize={15} color={numColor} sx={priceStyle}>
              {Number(ticker.signed_change_price) < 0
                ? '▼'
                : Number(ticker.signed_change_price) > 0
                  ? '▲'
                  : ''}
              {Number(ticker.change_price).toLocaleString()}
            </PriceTypo>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            marginRight: 2,
            '@media (max-width:500px)': {
              display: 'none',
            },
          }}
        >
          <Box sx={{ subColumnStyle }}>
            <SubIndicators
              label="고가"
              value={ticker.high_price}
              valueStyle={posStyle}
            />
            <SubIndicators
              label="저가"
              value={ticker.low_price}
              valueStyle={negStyle}
            />
          </Box>
          <Box sx={{ subColumnStyle }}>
            <SubIndicators
              label="52주 신고가"
              value={ticker.highest_52_week_price}
              valueStyle={posStyle}
            />
            <SubIndicators
              label="52주 신저가"
              value={ticker.lowest_52_week_price}
              valueStyle={negStyle}
            />
          </Box>
          <Box sx={{ subColumnStyle }}>
            <SubIndicators
              label="거래량(24시간)"
              value={ticker.acc_trade_volume_24h}
              valueStyle={normalStyle}
            />
            <SubIndicators
              label="거래대금(24시간)"
              value={Math.round(ticker.acc_trade_price_24h)}
              valueStyle={normalStyle}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
