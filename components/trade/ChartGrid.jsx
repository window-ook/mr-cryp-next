import axios from 'axios';
import indicators from 'highcharts/indicators/indicators';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { globalColors } from '@/globalColors';
import { Box } from '@mui/material';

indicators(Highcharts);
Highcharts.setOptions({
  lang: {
    thousandsSep: ',',
    rangeSelectorZoom: '',
  },
  time: {
    useUTC: false,
  },
});

const initialOptions = {
  chart: {
    width: 900,
    height: 400,
    zooming: {
      mouseWheel: false,
    },
  },
  lang: {
    thousandsSep: ',',
  },
  accessibility: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  navigator: {
    enabled: false,
  },
  yAxis: [
    {
      // y축 레이블
      labels: {
        align: 'right',
        x: -3,
        // 값 표기 형식
        formatter: function () {
          return Highcharts.numberFormat(Number(this.value), 0, '', ',');
        },
      },
      height: '80%',
      lineWidth: 2,
      // 마우스 포인터 위치를 나타내는 크로스헤어
      crosshair: {
        snap: false,
      },
    },
    {
      // 볼륨 레이블
      labels: {
        align: 'right',
        x: -3,
      },
      top: '80%',
      height: '20%',
      offset: 0,
      lineWidth: 2,
    },
  ],
  plotOptions: {
    candlestick: {
      color: globalColors.color_neg['400'],
      upColor: globalColors.color_pos['400'],
    },
    sma: {
      linkedTo: 'upbit',
      lineWidth: 0.8,
      zIndex: 1,
      marker: {
        enabled: false,
      },
      enableMouseTracking: false,
    },
  },
  tooltip: {
    tooltip: {
      formatter: function () {
        const { point } = this;
        const color =
          point.close > point.open
            ? globalColors.color_pos
            : globalColors.color_neg;
        return `
          <span style="color:${color}">●</span> <b>${point.series.name}</b><br/>
          시간: ${Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', point.x)}<br/>
          시가: ${point.open}<br/>
          고가: ${point.high}<br/>
          저가: ${point.low}<br/>
          종가: ${point.close}<br/>
        `;
      },
    },
    style: {
      fontSize: '10px',
    },
    backgroundColor: globalColors.tooltip_bgColor,
    borderWidth: 0,
    shadow: false,
  },
};

/**
  실시간 차트
  @returns candles : 캔들 데이터로 차트 시각화
 */
export default function ChartGrid() {
  const [options, setOptions] = useState(initialOptions);
  const [candles, setCandles] = useState([]);
  const code = useSelector(state => state.chart.code);
  const fetchCandles = useCallback(
    async type => {
      let fetchedCandles;
      try {
        const response = await axios.get('/api/candles', {
          params: {
            type,
            unit: type.replace('min', ''),
            ticker: code,
            count: 200,
          },
        });
        fetchedCandles = response.data;
      } catch (error) {
        console.error('캔들 다운로드 중 에러 발생 :', error);
        return;
      }
      setCandles(fetchedCandles);
    },
    [code],
  );

  useEffect(() => {
    fetchCandles('1min');
  }, [fetchCandles]);

  const rangeSelector = useMemo(
    () => ({
      allButtonsEnabled: true,
      inputEnabled: false,
      buttons: [
        {
          text: '1분봉',
          events: {
            click: () => fetchCandles('1min'),
          },
        },
        {
          text: '5분봉',
          events: {
            click: () => fetchCandles('5min'),
          },
        },
        {
          text: '일봉',
          events: {
            click: () => fetchCandles('days'),
          },
        },
        {
          text: '주봉',
          events: {
            click: () => fetchCandles('weeks'),
          },
        },
        {
          text: '월봉',
          events: {
            click: () => fetchCandles('months'),
          },
        },
      ],
    }),
    [fetchCandles],
  );

  useEffect(() => {
    if (candles.length > 0) {
      candles.sort((a, b) => a.timestamp - b.timestamp);
      const ohlc = candles.map(candle => [
        candle.timestamp,
        candle.opening_price,
        candle.high_price,
        candle.low_price,
        candle.trade_price,
      ]);
      const minTimestamp = ohlc[0][0];
      const maxTimestamp = ohlc[ohlc.length - 1][0];
      const volume = candles.map(candle => ({
        x: candle.timestamp,
        y: candle.candle_acc_trade_volume,
        color:
          candle.opening_price <= candle.trade_price
            ? globalColors.skyblue['200']
            : globalColors.hotpink['200'],
      }));

      setOptions(prevOptions => ({
        ...prevOptions,
        xAxis: {
          min: minTimestamp,
          max: maxTimestamp,
        },
        rangeSelector,
        series: [
          {
            type: 'candlestick',
            name: code,
            id: 'upbit',
            data: ohlc,
          },
          {
            type: 'sma',
            params: {
              period: 15,
            },
            color: globalColors.sma_15,
          },
          {
            type: 'sma',
            params: {
              period: 50,
            },
            color: globalColors.sma_50,
          },
          {
            type: 'column',
            name: '누적 거래량',
            data: volume,
            yAxis: 1,
          },
        ],
      }));
    }
  }, [candles, code, fetchCandles, rangeSelector]);

  return (
    <Box>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={options}
      />
    </Box>
  );
}
