import { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { globalColors } from '@/globalColors';
import { LinearProgress } from '@mui/material';
import { PriceTypo, HeadTypo } from '@/defaultTheme';

export default function Orderbook({ orderbookData }) {
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
      {orderbookData?.orderbook_units && (
        <div className="w-full h-[28.1rem] bg-white overflow-y-auto">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 z-10 bg-main">
              <tr>
                <th className="py-[0.25rem] w-1/3 text-center">
                  <HeadTypo>매도 물량</HeadTypo>
                </th>
                <th className="py-[0.25rem] w-1/3 text-center">
                  <HeadTypo>가격</HeadTypo>
                </th>
                <th className="py-[0.25rem] w-1/3 text-center">
                  <HeadTypo>매수 물량</HeadTypo>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* 매도 물량 */}
              {[...orderbookData.orderbook_units]
                .reverse()
                .map((element, index) => (
                  <tr key={`${element.ask_price}${index}`}>
                    <td className="py-1 bg-[#b6f5fa] h-[1rem] border-b-[0.063rem] border-color:rgba(224, 224, 224, 1)] border-solid">
                      <div className="relative">
                        <PriceTypo
                          fontSize={10}
                          sx={{
                            position: 'absolute',
                            right: 0,
                          }}
                        >
                          {Number(element.ask_size).toFixed(4)}
                        </PriceTypo>
                        <div
                          className={`absolute opacity-50 max-w-[100%] right-0 -top-[0.4rem] h-[0.6rem] bg-[#42b3e3]`}
                          style={{
                            width: `${(element.ask_size / askMaxSize) * 100}%`,
                          }}
                        />
                      </div>
                    </td>
                    <td className="p-1 border-b-[0.063rem] border-color:rgba(224, 224, 224, 1)] border-solid">
                      <div className="flex justify-between">
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
                      </div>
                    </td>
                    <td className="p-1 border-b-[0.063rem] border-color:rgba(224, 224, 224, 1)] border-solid" />
                  </tr>
                ))}
              {/* 매수 물량 */}
              {[...orderbookData.orderbook_units].map((element, index) => (
                <tr key={`bid_${index}`}>
                  <td className="p-1 border-b-[0.063rem] border-color:rgba(224, 224, 224, 1)] border-solid" />
                  <td className="p-1 border-b-[0.063rem] border-color:rgba(224, 224, 224, 1)] border-solid">
                    <div className="flex justify-between">
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
                    </div>
                  </td>
                  <td className="py-1 bg-[#f5bfd0] h-[1rem] border-b-[0.063rem] border-color:rgba(224, 224, 224, 1)] border-solid">
                    <div className="relative">
                      <PriceTypo
                        fontSize={10}
                        sx={{
                          position: 'absolute',
                          left: 0,
                        }}
                      >
                        {Number(element.bid_size).toFixed(4)}
                      </PriceTypo>
                      <div
                        className={`absolute opacity-50 max-w-[100%] left-0 -top-[0.5rem] h-[0.6rem] bg-[#b567b0]`}
                        style={{
                          width: `${(element.bid_size / bidMaxSize) * 100}%`,
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
