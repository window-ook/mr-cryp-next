import { memo, useEffect, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
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
import { StyledTableCell, PriceTypo, DescriptionTypo } from '@/defaultTheme';
import { globalColors } from '@/globalColors';

const boxStyle = {
  height: '11px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const cellStyle = {
  padding: 0.7,
  width: '33%',
  align: 'center',
};

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
                <StyledTableCell sx={cellStyle}>
                  <Box sx={boxStyle}>
                    <DescriptionTypo fontSize={12}>매도 물량</DescriptionTypo>
                  </Box>
                </StyledTableCell>
                <StyledTableCell sx={cellStyle}>
                  <Box sx={boxStyle}>
                    <DescriptionTypo fontSize={12}>가격</DescriptionTypo>
                  </Box>
                </StyledTableCell>
                <StyledTableCell sx={cellStyle}>
                  <Box sx={boxStyle}>
                    <DescriptionTypo fontSize={12}>매수 물량</DescriptionTypo>
                  </Box>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* 매도 물량 */}
              {[...orderbookData.orderbook_units]
                .reverse()
                .map((element, index) => (
                  <TableRow key={`ask_${index}`}>
                    <TableCell
                      sx={{ backgroundColor: globalColors.color_ask['200'] }}
                      align="right"
                    >
                      <Box
                        sx={{
                          position: 'relative',
                          height: '15px',
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
                        <Box
                          sx={{
                            position: 'absolute',
                            right: 0,
                            height: '15px',
                            width: `${(element.ask_size / askMaxSize) * 100}%`,
                            maxWidth: '100%',
                            backgroundColor: globalColors.color_ask['500'],
                            opacity: 0.5,
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
                        height: '15px',
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
                      <Box
                        sx={{
                          position: 'absolute',
                          left: 0,
                          height: '15px',
                          width: `${(element.bid_size / bidMaxSize) * 100}%`,
                          maxWidth: '100%',
                          backgroundColor: globalColors.color_bid['500'],
                          opacity: 0.5,
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

function OrderbookGrid({ orderbookData }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (orderbookData) setIsLoading(false);
  }, [orderbookData]);

  if (isLoading) {
    return <LinearProgress color="primary" />;
  }

  return <OrderbookTable orderbookData={orderbookData} />;
}
export default memo(OrderbookGrid);
