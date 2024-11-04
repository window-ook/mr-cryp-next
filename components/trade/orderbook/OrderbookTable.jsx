import { useState, useCallback, useEffect, memo } from 'react';
import { useSelector } from 'react-redux';
import { globalColors } from '@/globalColors';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
} from '@mui/material';
import { styled } from '@mui/system';
import { StyledTableCell, PriceTypo, DescriptionTypo } from '@/defaultTheme';

const HeadCell = styled(StyledTableCell)(() => ({
  padding: '0.7rem',
  width: '33%',
  textAlign: 'center',
}));

const HeadBox = styled(Box)(() => ({
  height: '0.75rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const HeadTypo = styled(DescriptionTypo)(() => ({
  fontSize: '0.75rem',
}));

const AmountBar = styled(Box)(() => ({
  height: '0.938rem',
  position: 'absolute',
  maxWidth: '100%',
  opacity: 0.5,
}));

const OrderbookTable = memo(function OrderbookTable({ orderbookData }) {
  const rate = useSelector(state => state.chart.rate);
  const prevPrice = useSelector(state => state.chart.prevPrice);
  const [numColor, setNumColor] = useState(
    rate === 0
      ? 'black'
      : rate > 0
        ? globalColors.color_pos['400']
        : globalColors.color_neg['400'],
  );
  const [bidMaxSize, setBidMaxSize] = useState(0);
  const [askMaxSize, setAskMaxSize] = useState(0);

  const getMaxSize = useCallback(data => {
    if (!data || !data.orderbook_units) {
      return [0, 0];
    }
    const askSizes = data.orderbook_units.map(unit => unit.ask_size);
    const bidSizes = data.orderbook_units.map(unit => unit.bid_size);
    return [Math.max(...askSizes), Math.max(...bidSizes)];
  }, []);

  useEffect(() => {
    setNumColor(
      rate === 0
        ? 'black'
        : rate > 0
          ? globalColors.color_pos['400']
          : globalColors.color_neg['400'],
    );
  }, [rate]);

  useEffect(() => {
    const [maxAskSize, maxBidSize] = getMaxSize(orderbookData);
    setAskMaxSize(maxAskSize);
    setBidMaxSize(maxBidSize);
  }, [getMaxSize, orderbookData]);

  if (!orderbookData) {
    return <LinearProgress color="primary" />;
  }

  return (
    <>
      {orderbookData.orderbook_units && (
        <TableContainer
          sx={{
            height: 400,
            margin: 0,
            padding: 0,
            backgroundColor: globalColors.white,
          }}
        >
          <Table display="flex" stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <HeadCell>
                  <HeadBox>
                    <HeadTypo>매도 물량</HeadTypo>
                  </HeadBox>
                </HeadCell>
                <HeadCell>
                  <HeadBox>
                    <HeadTypo>가격</HeadTypo>
                  </HeadBox>
                </HeadCell>
                <HeadCell>
                  <HeadBox>
                    <HeadTypo>매수 물량</HeadTypo>
                  </HeadBox>
                </HeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* 매도 물량 */}
              {[...orderbookData.orderbook_units]
                .reverse()
                .map((element, index) => (
                  <TableRow key={`${element.ask_price}${index}`}>
                    <TableCell
                      sx={{ backgroundColor: globalColors.color_ask['200'] }}
                      align="right"
                    >
                      <Box
                        sx={{
                          position: 'relative',
                          height: '0.9rem',
                        }}
                      >
                        <PriceTypo
                          fontSize={10}
                          sx={{
                            position: 'absolute',
                            right: 0,
                          }}
                        >
                          {Number(element.ask_size).toFixed(4)}
                        </PriceTypo>
                        <AmountBar
                          sx={{
                            backgroundColor: globalColors.color_ask['500'],
                            width: `${(element.ask_size / askMaxSize) * 100}%`,
                            right: 0,
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell sx={{ padding: 1 }} align="center">
                      <Box display="flex" justifyContent={'space-between'}>
                        <PriceTypo
                          color={numColor}
                          fontSize={12}
                          fontWeight={'bold'}
                        >
                          {Number(element.ask_price).toLocaleString()}
                        </PriceTypo>
                        <PriceTypo fontSize={12} color={numColor}>
                          {Number(rate) > 0 ? '+' : ''}
                          {prevPrice &&
                            Number(
                              ((element.ask_price - prevPrice) / prevPrice) *
                                100,
                            ).toFixed(2)}
                          {prevPrice && '%'}
                        </PriceTypo>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ padding: 1 }}></TableCell>
                  </TableRow>
                ))}
              {/* 매수 물량 */}
              {[...orderbookData.orderbook_units].map((element, index) => (
                <TableRow key={`bid_${index}`}>
                  <TableCell sx={{ padding: 1 }}></TableCell>
                  <TableCell sx={{ padding: 1 }} align="center">
                    <Box display="flex" justifyContent={'space-between'}>
                      <PriceTypo
                        color={numColor}
                        fontSize={12}
                        fontWeight={'bold'}
                      >
                        {Number(element.bid_price).toLocaleString()}
                      </PriceTypo>
                      <PriceTypo fontSize={12} color={numColor}>
                        {Number(rate) > 0 ? '+' : ''}
                        {prevPrice &&
                          Number(
                            ((element.bid_price - prevPrice) / prevPrice) * 100,
                          ).toFixed(2)}
                        {prevPrice && '%'}
                      </PriceTypo>
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: globalColors.color_bid['200'] }}
                    align="left"
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        height: '0.938rem',
                      }}
                    >
                      <PriceTypo
                        fontSize={10}
                        sx={{
                          position: 'absolute',
                          left: 0,
                        }}
                      >
                        {Number(element.bid_size).toFixed(4)}
                      </PriceTypo>
                      <AmountBar
                        sx={{
                          width: `${(element.bid_size / bidMaxSize) * 100}%`,
                          backgroundColor: globalColors.color_bid['500'],
                        }}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
});

export default OrderbookTable;
